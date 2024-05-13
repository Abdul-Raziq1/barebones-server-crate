import { RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpFormData, UserSignup } from './signup.types';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth/auth.service';
import { EMPTY, catchError, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { LoadingState } from '../../shared/shared.types';
import { getErrorMessage } from '../../core/util/util';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, CommonModule, RouterLink, LoaderComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  private authService = inject(AuthService)
  private destroyRef = inject(DestroyRef)

  protected signUpForm!: FormGroup<SignUpFormData>
  protected loadingState = signal<LoadingState>({
    isLoading: false,
    error: undefined,
    message: ''
  })

  ngOnInit(): void {
    this.signUpForm = new FormGroup<SignUpFormData>({
      firstName: new FormControl('', { nonNullable: true, validators: Validators.required }),
      lastName: new FormControl('', { nonNullable: true, validators: Validators.required }),
      email: new FormControl('', { nonNullable: true, validators: Validators.required }),
      password: new FormControl('', { nonNullable: true, validators: Validators.required }),
      confirmPassword: new FormControl('', { nonNullable: true, validators: Validators.required }),
    })
  }


  registerUser() {
    if (this.signUpForm.invalid) return;
    this.loadingState.update(state => ({...state, isLoading: true }));
    const user: UserSignup = this.signUpForm.value as UserSignup
    
    this.authService.signup(user).pipe(
      tap((response) => {
        this.loadingState.update(state => ({...state, isLoading: false, message: response.message, error: undefined}))
      }),
      catchError((err) => {        
        this.loadingState.update(state => ({ ...state, isLoading: false, error: getErrorMessage(err), message: ''}))
        return EMPTY
      }),
      takeUntilDestroyed(this.destroyRef)
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
