import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthComponent, AuthAction } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { MembersComponent } from './members/members.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: 'signup', component: AuthComponent, data: { action: AuthAction.SignUp } },
  { path: 'signin', component: AuthComponent, data: { action: AuthAction.SignIn } },
  { path: 'members', component: MembersComponent, canActivate: [AuthGuard] },
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
