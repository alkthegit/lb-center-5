import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

export const enum AuthAction {
  SignUp,
  SignIn
}
@Component({
  selector: 'center5-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  title: string;
  authAction: AuthAction;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: Data) => {
      this.authAction = data.action;
      if (this.authAction === AuthAction.SignIn) {
        this.title = 'Вход';
      }
      if (this.authAction === AuthAction.SignUp) {
        this.title = 'Регистрация';
      }
    });
  }

  onSubmit(form: NgForm) {

    const { username, password } = form.value;

    if (this.authAction === AuthAction.SignUp) {
      this.authService.signup(username, password)
    }
    else if (this.authAction === AuthAction.SignIn) {
      this.authService.signin(username, password)
    }
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
