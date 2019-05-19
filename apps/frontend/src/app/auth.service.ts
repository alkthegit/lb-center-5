import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay, catchError, switchMap, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // токен текущей сессии
  private token: string;
  // private isAuthenticated = false;
  private isAuthenticated: Subject<boolean>;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.isAuthenticated = new Subject();
    console.log(`subject created`);
  }

  signin(username, password) {
    return this.httpClient.post('http://localhost:3000/auth/signin',
      {
        username,
        password
      }).pipe(
        shareReplay(),
        map((response: Response) => {
          console.log(response);
          if (response) {
            if (response["error"]) {
              console.log(`Ошибка: ${response["error"]}`);
              return false;
            }
            else {
              this.token = response["data"].authData.token;
              this.isAuthenticated.next(true);
              // this.router.navigate(['/']);
              console.log(`Вход выполнен, пользователь: ${response["data"].username}`);
              return true;
            }
          }
        })
      );
  };

  signup(username, password) {

    return this.httpClient.post('http://localhost:3000/auth/signup',
      {
        username,
        password
      }).pipe(
        shareReplay(),
        map((response: Response) => {
          console.log(response);
          if (response) {
            if (response["error"]) {
              console.log(`Ошибка: ${response["error"]}`);
              return false;
            }
            else {
              this.token = response["data"].authData.token;
              this.isAuthenticated.next(true);
              console.log(`Регистрация выполнена, пользователь: ${response["data"].username}`);
              return true;
            }
          }
        })
      );
  };

  logout() {
    this.token = '';
    this.isAuthenticated.next(false);
  }

  checkAuthenticated() {
    return this.isAuthenticated;
  }

  getToken() {
    return this.token;
  }
}
