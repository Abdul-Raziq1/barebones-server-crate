import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../shared/components/input/input.component';
import { LoginFormData } from './login.types';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  protected loginForm!: FormGroup<LoginFormData>

  ngOnInit() {
    this.loginForm = new FormGroup<LoginFormData>({
      email: new FormControl('', { nonNullable: true }),
      password: new FormControl('', { nonNullable: true })
    })
  }

  get email() {
    return this.loginForm.get('email') as FormControl<string>;
  }
  
  get password() {
    return this.loginForm.get('password') as FormControl<string>;
  }
}
