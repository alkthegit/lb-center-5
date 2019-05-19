import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // токен текущей сессии
  private token: string;
  private authenticated = false;

  constructor(private httpClient: HttpClient) { }

  signin(username, password) {
    return this.httpClient.post('http://localhost:3000/auth/signin',
      {
        username,
        password
      }).pipe(
        shareReplay()
      ).subscribe(data => {
        console.log(data)
      });;
  };

  signup(username, password) {
    return this.httpClient.post('http://localhost:3000/auth/signup',
      {
        username,
        password
      }).pipe(
        shareReplay()
      ).subscribe(response => {
        this.token = response["data"].authData.token;
        console.log(`Вход выполнен: ${response["data"].authData.username}`);
      });;
  };

  logout() {
    this.token = '';
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }

  getToken() {
    return this.token;
  }
}
