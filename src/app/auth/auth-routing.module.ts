import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegisterComponent } from './register/register.component';
import { RedirectIfLoggedInGuard } from './redirect-if-logged-in.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectIfLoggedInGuard],
  },
  {
    path: 'password-reset',
    component: PasswordResetComponent,
    canActivate: [RedirectIfLoggedInGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RedirectIfLoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
