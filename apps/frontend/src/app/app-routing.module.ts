import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'signup', component: AuthComponent, data: { action: 'signup' } },
  { path: 'signin', component: AuthComponent, data: { action: 'signin' } },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
