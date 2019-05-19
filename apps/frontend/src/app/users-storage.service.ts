import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersStorageService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getUsers() {
    // получаем токен от сервиса авторизации
    const token = this.auth.getToken();

    // формируем заголовок с токеном для запроса
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });

    // возвращаем observable выполнения запроса
    return this.http.get('http://localhost:3000/users', { headers })
      .pipe(
        map((response: Response) => {
          return response["data"];
        }),
        catchError(err => {
          console.log(err);
          throw err;
        })
      );
  }
}
