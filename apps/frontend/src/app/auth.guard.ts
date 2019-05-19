import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivateRoute: boolean;
  canActivateSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.canActivateSubscription = this.authService.checkAuthenticated()
      .subscribe((authenticated: boolean) => {
        this.canActivateRoute = authenticated;
      });
  };

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.canActivateRoute) {
      return true;
    }
    else {
      this.router.navigate(['signin'], {
        queryParams: {
          returnUrl: state.url
        }
      });
    }
  }
}
