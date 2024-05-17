import { Inject, Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserSignup, VerifyEmail } from '../../../auth/signup/signup.types';
import { LoggedInUser, TokenPayload, User } from '../user/user.types';
import { ADMIN, GUEST, SERVER_CRATE_USER, USER } from '../../util/constants';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #baseUrl = environment.baseUrl;
  #http = inject(HttpClient);

  constructor(@Inject(PLATFORM_ID) private platFormId: Object) {
    effect(() => {
      console.log(this.userAuthStatus());
    })
  }

  userAuthStatus = signal<{
    authenticated: boolean;
    role: typeof ADMIN | typeof USER | typeof GUEST;
  }>({ authenticated: false, role: GUEST });

  signup(user: UserSignup) {
    return this.#http.post(`${this.#baseUrl}/auth/signup`, user);
  }

  verifyEmail(userToVerify: VerifyEmail) {
    return this.#http.post<LoggedInUser>(
      `${this.#baseUrl}/auth/verify`,
      userToVerify
    );
  }

  getUserToken() {
    if (isPlatformBrowser(this.platFormId)) {  
      const userString = localStorage.getItem(SERVER_CRATE_USER)
      if (userString) {
        const user: User = JSON.parse(
          userString
        );      
        if (user) {
          console.log('User token', user.token);
          return user.token;
        }
      }    
    }
    return null;
  }

  isAuthenticated() {
    const token = this.getUserToken();
    if (token) {
      const tokenPayload: TokenPayload = jwtDecode(token);
      console.log('Payload', tokenPayload);
      
      if (tokenPayload.role === ADMIN) {
        this.userAuthStatus.set({ authenticated: true, role: ADMIN });
      } else if (tokenPayload.role === USER) {
        this.userAuthStatus.set({ authenticated: true, role: USER });
      }
      return;
    }
    this.userAuthStatus.set({ authenticated: false, role: GUEST })
  }
}
