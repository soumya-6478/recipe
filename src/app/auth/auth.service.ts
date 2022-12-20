import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpiryTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          environment.firebaseApiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      ); // post is generic methode. we should pass the response type what we will get
  }
  signin(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          environment.firebaseApiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userdata: {
      email: string;
      id: string;
      _token: string;
      _tokenExpiredate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userdata) {
      return;
    }
    const loadedUser = new User(
      userdata.email,
      userdata.id,
      userdata._token,
      new Date(userdata._tokenExpiredate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expiryDuration =
        new Date(userdata._tokenExpiredate).getTime() - new Date().getTime();
      this.autoLogout(expiryDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData'); //localstorage.claer()  clears up everything
    if (this.tokenExpiryTimer) {
      clearTimeout(this.tokenExpiryTimer);
    }
    this.tokenExpiryTimer = null;
  }

  autoLogout(expiryDuration: number) {
    console.log(expiryDuration);
    this.tokenExpiryTimer = setTimeout(() => {
      this.logout();
    }, expiryDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expireDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMsg = 'an unknown error occured!!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMsg);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'This email is already exists!!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = 'Email does not exhist';
        break;
      case 'INVALID_PASSWORD':
        errorMsg = 'please enter the correct password';
        break;
    }
    return throwError(errorMsg);
  }
}
