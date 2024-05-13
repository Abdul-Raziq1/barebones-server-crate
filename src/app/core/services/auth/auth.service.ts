import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserSignup } from '../../../auth/signup/signup.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.baseUrl
  http = inject(HttpClient)

  signup(user: UserSignup) {
    return this.http.post<{message: string}>(`${this.baseUrl}/auth/signup`, user)
  }
}
