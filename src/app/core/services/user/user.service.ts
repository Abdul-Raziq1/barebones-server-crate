import { Injectable, inject, signal } from '@angular/core';
import { User, UserInfo } from './user.types';
import { SERVER_CRATE_USER } from '../../util/constants';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #baseUrl = environment.baseUrl;

  #http = inject(HttpClient)

  user = signal<User>({
    firstName: '',
    lastName: '',
    email: '',
    token: '',
  });

  constructor() {}

  getUserData() {
    return this.#http.get<UserInfo>(`${this.#baseUrl}/profile/basic-info`)
  }

  patchUser(keyToUpdate: keyof User, value: string) {
    this.user.update((user) => ({ ...user, [keyToUpdate]: value }));
  }

  updateUser(user: User) {
    this.user.set(user);
    localStorage.setItem(
      SERVER_CRATE_USER,
      JSON.stringify({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: user.token,
      })
    );
  }

  getUserInfo() {
    let user: User
    if (!this.user().email) {
      const userInStorage: User = JSON.parse(
        localStorage.getItem(SERVER_CRATE_USER) || ''
      );
      if (!userInStorage) {
        // fetch user from backend or show an error
      } else {
        user = {
          email: userInStorage.email,
          firstName: userInStorage.firstName,
          lastName: userInStorage.lastName,
          token: userInStorage.token,
        };
        this.user.set(user);
      }
    }
    return this.user();
  }
}
