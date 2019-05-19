import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'center5-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  isAuthenticatedSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private rouer: Router
  ) { }

  ngOnInit() {
    this.isAuthenticatedSubscription = this.authService.checkAuthenticated()
      .subscribe((authenticated: boolean) => {
        this.isAuthenticated = authenticated;
      })
  }

  ngOnDestroy() {
    this.isAuthenticatedSubscription.unsubscribe();
  }

  onSignOut() {
    this.authService.logout();
    this.rouer.navigate(['/']);
  }

}