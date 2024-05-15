import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  model,
} from '@angular/core';
import { millisecondsToMinutesSeconds } from '../../../core/util/util';
import { CommonModule, isPlatformBrowser } from '@angular/common';

const INIT_TIME = 'server-crate-init-time';
const FIVE_MINUTES_IN_MS = 10000;
@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss',
})
export class CountdownComponent implements OnInit, OnDestroy {
  interval!: NodeJS.Timeout;
  time = model<string>('', { alias: 'countDownTimer' });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.onInit();
  }

  onInit() {
    if (isPlatformBrowser(this.platformId)) {
      const timePageWasRoutedTo = this.getInitialTime();
      this.interval = setInterval(() => {
        const countdownTimer = this.getTimeLeftSincePageWasRoutedTo(timePageWasRoutedTo.toString());
        this.time.set(countdownTimer);
        if (countdownTimer === '00:00') {
          this.onDestroy();
        }        
      }, 1000);
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
      /**
       * The time in storage won't be removed if the component was destroyed when time was 00:00
       * So check if time is in the negatives
       */
      const time = Number(JSON.parse(timeInStorage))
      if (this.timeInStorageIsValid(time)) {
        return time;
      }    
    }
    const timeNow = Date.now()
    localStorage.setItem(INIT_TIME, JSON.stringify(timeNow));
    return timeNow;
  }

  timeInStorageIsValid(timeInStorage: number) {
    return timeInStorage > (Date.now() - FIVE_MINUTES_IN_MS)
  }
  onDestroy() {
    clearInterval(this.interval);
    localStorage.removeItem(INIT_TIME);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }
}
