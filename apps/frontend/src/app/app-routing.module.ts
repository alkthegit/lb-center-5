import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthComponent, AuthAction } from './auth/auth.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'signup', component: AuthComponent, data: { action: AuthAction.SignIn } },
  { path: 'signin', component: AuthComponent, data: { action: AuthAction.SignIn } },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
