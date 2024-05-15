import { Injectable, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserSignup, VerifyEmail } from '../../../auth/signup/signup.types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #baseUrl = environment.baseUrl
  #http = inject(HttpClient)

  signup(user: UserSignup) {
    return this.#http.post(`${this.#baseUrl}/auth/signup`, user)
  }

  verifyEmail(userToVerify: VerifyEmail) {
    return this.#http.post(`${this.#baseUrl}/auth/verify`, userToVerify)
  }
}
