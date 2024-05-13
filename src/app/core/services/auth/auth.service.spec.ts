import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { UserSignup } from '../../../auth/signup/signup.types';
import { environment } from '../../../../environments/environment';
import { of, throwError } from 'rxjs';

fdescribe('AuthService', () => {
  let authService: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  const baseUrl = environment.baseUrl
  beforeEach(() => {
    let httpClientSpyObj: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['post'])
    TestBed.configureTestingModule({
      providers: [AuthService, {provide: HttpClient, useValue: httpClientSpyObj}]
    });
    authService = TestBed.inject(AuthService)
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>
  });

  it('should return a message when successfull', (done: DoneFn) => {
    const testUser: UserSignup = {
      email: 'test@gmail.com',
      firstName: 'test',
      lastName: 'tester',
      password: 'password'
    }
    const expectedObject = { message: 'Email Verification sent'}
    httpClientSpy.post.and.returnValue(of(expectedObject))

    authService.signup(testUser).subscribe({
      next: (response) => {
        expect(response).toEqual(expectedObject)
        done()
      },
      error: done.fail
    })
  })

  it('should error when the user already exists', (done: DoneFn) => {
    const existingUser: UserSignup = {
      email: 'bot1@gmail.com',
      firstName: 'bot1',
      lastName: 'bot1',
      password: 'password'
    }

    const expectedError = new Error()
    httpClientSpy.post.and.returnValue(throwError(() => expectedError))

    authService.signup(existingUser).subscribe({
      next: () => {
        done()
      },
      error: (err) => {
        expect(err).toEqual(expectedError)
        done()
      }
    })
  })

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });
});
