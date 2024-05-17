import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';
import { CountdownComponent } from '../../../../shared/components/countdown/countdown.component';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../core/services/user/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, finalize, tap } from 'rxjs';
import { LoadingState } from '../../../../shared/shared.types';
import { getErrorMessage } from '../../../../core/util/util';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [NgOtpInputModule, CountdownComponent, CommonModule, LoaderComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent {
  #authService = inject(AuthService);
  #userService = inject(UserService);
  #destroyRef = inject(DestroyRef);
  #router = inject(Router)

  countDownTimer!: string | undefined;
  otp = new FormControl('', { nonNullable: true });
  protected loadingState = signal<LoadingState>({
    isLoading: false,
    error: undefined,
    successMessage: '',
  });
  resendOtp() {}

  resetTimer() {}

  verifyEmail() {
    console.log('Verifying email', this.otp.value);
    this.loadingState.update((state) => ({ ...state, isLoading: true }));
    const user = this.#userService.getUserInfo();

    if (this.otp.value.length === 6) {
      console.log('User', user);
      this.#authService
        .verifyEmail({ code: this.otp.value, email: user.email })
        .pipe(
          tap((loggedInUser) => {
            this.#userService.updateUser(loggedInUser);
            this.loadingState.update((state) => ({
              ...state,
              isLoading: false,
              successMessage: 'Verification successful',
              error: undefined,
            }));
            this.#authService.isAuthenticated()
            this.#router.navigate(['/settings'], { replaceUrl: true })
            this.countDownTimer = '00:00'

          }),
          catchError((err) => {
            this.loadingState.update((state) => ({
              ...state,
              isLoading: false,
              successMessage: '',
              error: getErrorMessage(err),
            }));
            return EMPTY;
          }),
          takeUntilDestroyed(this.#destroyRef)
        )
        .subscribe();
    }
  }
}
