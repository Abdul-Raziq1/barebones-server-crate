import { RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SignUpFormData } from './signup.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupComponent implements OnInit {
  protected signUpForm!: FormGroup<SignUpFormData>

  ngOnInit(): void {
    this.signUpForm = new FormGroup<SignUpFormData>({
      name: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true }),
      confirmPassword: new FormControl('', { nonNullable: true }),
    })
  }

  get name() {
    return this.signUpForm.get('name') as FormControl<string>
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
