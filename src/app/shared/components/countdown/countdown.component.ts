import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  effect,
  model,
} from '@angular/core';
import { millisecondsToMinutesSeconds } from '../../../core/util/util';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Observable, interval, map, takeWhile, tap } from 'rxjs';

const INIT_TIME = 'server-crate-init-time';
const FIVE_MINUTES_IN_MS = 302000;
@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent implements OnInit, OnDestroy {
  interval!: NodeJS.Timeout;
  time = model<string | undefined>(undefined, { alias: 'countDownTimer' });
  countdownTimer$!: Observable<string>
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    effect(() => {
      if (this.time() !== undefined) {
        this.destroy()
      }
    })
  }

  ngOnInit(): void {
    this.onInit();
  }

  onInit() {
    if (isPlatformBrowser(this.platformId)) {
      const initialTime = this.getInitialTime()
      this.countdownTimer$ = interval(1000).pipe(
        takeWhile(() => {
          if (this.time() !== '00:00' && !this.time()?.startsWith('-')) {
            return true
          }
          return false
        }),
        map(() => {
          return this.getTimeLeftSincePageWasRoutedTo(initialTime.toString())
        }),
        tap((timer) => {
          if (timer === '00:00' || this.time()) {
            this.time.set(timer)
          }
        }),
      )
    }
  }

  getTimeLeftSincePageWasRoutedTo(timePageWasRoutedTo: string) {
    const timeElapsedSincePageWasRoutedTo =
      Date.now() - Number(JSON.parse(timePageWasRoutedTo));
    return millisecondsToMinutesSeconds(
      FIVE_MINUTES_IN_MS - timeElapsedSincePageWasRoutedTo
    );
  }

  getInitialTime() {
    const timeInStorage = localStorage.getItem(INIT_TIME);
    if (timeInStorage !== null) {
      const time = Number(JSON.parse(timeInStorage))
      // Don't want negative time
      if (this.timeInStorageIsValid(time)) {
        return time;
      }    
    }
    const timeNow = Date.now()
    localStorage.setItem(INIT_TIME, JSON.stringify(timeNow));
    return timeNow;
  }

  timeInStorageIsValid(timeInStorage: number) {
    const fiveMinutesAgo = Date.now() - FIVE_MINUTES_IN_MS
    return timeInStorage > fiveMinutesAgo
  }

  destroy() {
    clearInterval(this.interval);
    localStorage.removeItem(INIT_TIME);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }
}
