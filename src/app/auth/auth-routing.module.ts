import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CanDeactivateGuard } from '../core/can-deactivate.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
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
    path: 'password/reset',
    component: ForgotPasswordComponent,
    canActivate: [RedirectIfLoggedInGuard],
  },
  {
    path: 'password/reset/:token',
    component: PasswordResetComponent,
    canActivate: [RedirectIfLoggedInGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [RedirectIfLoggedInGuard],
    canDeactivate: [CanDeactivateGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
