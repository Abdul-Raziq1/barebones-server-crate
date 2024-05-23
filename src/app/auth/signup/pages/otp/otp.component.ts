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
import { LoadingService } from '../../../../core/services/loading/loading.service';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    NgOtpInputModule,
    CountdownComponent,
    CommonModule,
    LoaderComponent,
  ],
  providers: [LoadingService],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent {
  #authService = inject(AuthService);
  #userService = inject(UserService);
  #destroyRef = inject(DestroyRef);
  #router = inject(Router);

  countDownTimer!: string | undefined;
  otp = new FormControl('', { nonNullable: true });
  // protected loadingState = signal<LoadingState>({
  //   isLoading: false,
  //   error: undefined,
  //   successMessage: '',
  // });
  loadingService: LoadingService = inject(LoadingService);

  verifyEmail() {
    console.log('Verifying email', this.otp.value);
    this.loadingService.setLoadingToTrue();
    const user = this.#userService.getUserInfo();
    const otp = this.otp.value;
    if (otp.length === 6) {
      console.log('User', user);
      this.#authService
        .verifyEmail({ code: otp, email: user.email })
        .pipe(
          tap(() => this.loadingService.setLoadingToFalse()),
          tap((loggedInUser) => {
            this.#userService.updateUser(loggedInUser);
            this.loadingService.updateSuccessMessage('Verification successful');
            this.#authService.updateAuthStatus();
            this.countDownTimer = '00:00';
            this.#router.navigate(['/settings'], { replaceUrl: true });
          }),
          catchError((err) => {
            this.loadingService.updateErrorMessageByError(err)
            return EMPTY;
          }),
          takeUntilDestroyed(this.#destroyRef)
        )
        .subscribe();
    }
  }
}
