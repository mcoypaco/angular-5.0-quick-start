import { NgModule } from '@angular/core';
import { MatCardModule, MatProgressSpinnerModule, MatStepperModule } from '@angular/material';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { AuthGuard } from './auth.guard';
import { RedirectIfLoggedInGuard } from './redirect-if-logged-in.guard';
import { AuthService } from './auth.service';
import { SharedModule } from '../shared/shared.module';
import { AccessTokenService } from './access-token.service';

@NgModule({
  imports: [
    AuthRoutingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    SharedModule,
  ],
  declarations: [LoginComponent, RegisterComponent, PasswordResetComponent],
  providers: [AuthGuard, RedirectIfLoggedInGuard, AuthService, AccessTokenService]
})
export class AuthModule { }
