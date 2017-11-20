import { NgModule } from '@angular/core';
import { MatCardModule, MatDialogModule, MatProgressSpinnerModule, MatStepperModule } from '@angular/material';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AuthGuard } from './auth.guard';
import { RedirectIfLoggedInGuard } from './redirect-if-logged-in.guard';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';
import { AccessTokenService } from './access-token.service';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ConfirmedPasswordFormComponent } from './confirmed-password-form/confirmed-password-form.component';
import { ConfirmedPasswordFormService } from './confirmed-password-form/confirmed-password-form.service';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePasswordService } from './change-password/change-password.service';

@NgModule({
  imports: [
    AuthRoutingModule,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    SharedModule,
  ],
  declarations: [LoginComponent, RegisterComponent, PasswordResetComponent, ForgotPasswordComponent, ConfirmedPasswordFormComponent, ChangePasswordComponent],
  providers: [AuthGuard, RedirectIfLoggedInGuard, AuthService, AccessTokenService, ConfirmedPasswordFormService, ChangePasswordService],
  entryComponents: [ChangePasswordComponent]
})
export class AuthModule { }
