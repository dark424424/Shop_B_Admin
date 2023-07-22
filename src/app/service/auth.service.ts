import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { ApiService } from './api.service';
import {
  clearUserInformation,
  saveUserInformation,
} from '../store/user-store/user.store.action';
import { LoadingService } from './loading.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuthorized$ = new BehaviorSubject<boolean>(false);
  public isAdmin$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME_USER = 'long_auth';

  constructor(
    private store: Store,
    private router: Router,
    private apiService: ApiService,
    private loadingService: LoadingService,
    private errorService: ErrorService
  ) {
    this.isAuthorized$.next(!!this.token);
  }

  get token(): any {
    return sessionStorage.getItem(this.TOKEN_NAME_USER);
  }

  loginUser(payload: any) {
    return this.apiService.login(payload).pipe(
      tap((response: any) => {
        if (response.resultCode === 0) {
          this.isAuthorized$.next(true);
          this.store.dispatch(saveUserInformation({ payload: response.user }));
          sessionStorage.setItem(this.TOKEN_NAME_USER, response.accessToken);
          this.loadingService.finish();
          this.router.navigate(['/']);
        } else {
          this.loadingService.finish();
          this.errorService.start(response.message);
        }
        // response.result
        // this.isAuthorized$.next(true);
        // sessionStorage.setItem(this.TOKEN_NAME_USER, response.accessToken);
      })
    );
  }

  logout() {
    this.loadingService.start();
    setTimeout(() => {
      this.isAuthorized$.next(false);
      this.isAdmin$.next(false);
      sessionStorage.setItem(this.TOKEN_NAME_USER, '');
      this.store.dispatch(clearUserInformation());
      this.loadingService.finish();
      this.router.navigate(['/login']);
    }, 1000);
  }
}
