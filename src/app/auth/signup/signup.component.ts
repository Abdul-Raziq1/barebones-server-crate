import { Router, RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpFormData, UserSignup } from './signup.types';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { EMPTY, catchError, delay, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { LoadingState } from '../../shared/shared.types';
import { getErrorMessage } from '../../core/util/util';
import { passwordMatchesValidator } from '../../core/util/validators';
import { UserService } from '../../core/services/user/user.service';
import { LoadingService } from '../../core/services/loading/loading.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, CommonModule, RouterLink, LoaderComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  #authService = inject(AuthService)
  #destroyRef = inject(DestroyRef)
  #router = inject(Router)
  #userService = inject(UserService)
  loadingService = inject(LoadingService)

  protected signUpForm!: FormGroup<SignUpFormData>

  ngOnInit(): void {
    this.signUpForm = new FormGroup<SignUpFormData>({
      firstName: new FormControl('', { nonNullable: true, validators: Validators.required }),
      lastName: new FormControl('', { nonNullable: true, validators: Validators.required }),
      email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
      password: new FormControl('', { nonNullable: true, validators: Validators.required }),
      confirmPassword: new FormControl('', { nonNullable: true, validators: Validators.required }),
    }, { updateOn: 'blur', validators: [passwordMatchesValidator] })
  }


  registerUser() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();      
      return;
    }
    this.loadingService.setLoadingToTrue()
    const user: UserSignup = this.signUpForm.value as UserSignup
    
    this.#authService.signup(user).pipe(
      tap(() => this.loadingService.setLoadingToFalse()),
      tap(() => this.loadingService.updateSuccessMessage('OTP has been sent to your email')),
      tap(() => {
        this.#userService.updateUser({email: user.email, firstName: user.firstName, lastName: user.lastName, token: '' })
        this.#authService.updateAuthStatus()
      }),
      delay(1000),
      tap(() => this.#router.navigate(['/signup/otp'])),
      catchError((err) => {        
        this.loadingService.updateErrorMessageByError(err)
        return EMPTY
      }),
      takeUntilDestroyed(this.#destroyRef)
    ).subscribe()
  }

  get firstName() {
    return this.signUpForm.get('firstName') as FormControl<string>
  }
  get lastName() {
    return this.signUpForm.get('lastName') as FormControl<string>
  }
  get email() {
    return this.signUpForm.get('email') as FormControl<string>
  }
  get password() {
    return this.signUpForm.get('password') as FormControl<string>
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword') as FormControl<string>
  }
}
