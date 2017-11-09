import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { switchMap, catchError } from 'rxjs/operators';
import 'rxjs/add/observable/empty';

import { ApiAccess } from '../../interfaces/api-access';
import { AuthService } from '../auth.service';
import { AccessTokenService } from '../access-token.service';
import { ConfirmedPasswordFormService } from '../confirmed-password-form/confirmed-password-form.service';
import { ExceptionService } from '../../core/exception.service';
import { environment } from '../../../environments/environment';
import { PasswordResetFormQuestionsService } from './password-reset-form-questions.service';
import { ProgressService } from '../../core/progress.service';
import { PushNotificationService } from '../../core/push-notification.service';
import { QuestionControlService } from '../../shared/question-control.service';
import { routes } from '../../routes';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  providers: [PasswordResetFormQuestionsService],
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  questions: any[];
  
  hasResetLink: boolean;
  verified: boolean;

  email: string;
  token: string;
  
  emailForm: FormGroup;
  passwordForm: FormGroup

  emailFormSubscription: Subscription;
  passwordFormSubscription: Subscription;

  constructor(
    private accessToken: AccessTokenService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    public confirmedPasswordForm: ConfirmedPasswordFormService,
    private exception: ExceptionService,
    private progress: ProgressService,
    private pushNotification: PushNotificationService,
    private questionControl: QuestionControlService,
    private questionSource: PasswordResetFormQuestionsService,
    private router: Router,
  ) { }
  
  ngOnInit() {  
    this.auth.clientGrantToken().subscribe(apiAccess => this.accessToken.store('clientAccess', apiAccess));

    this.activatedRoute.paramMap.subscribe(params => this.token = params.get('token'));

    this.questions = this.questionSource.get();
  
    this.emailForm = this.questionControl.toFormGroup(this.questions);

    this.emailFormSubscription = this.emailForm.valueChanges.subscribe(data => this.questionControl.setErrorMessages(this.emailForm, this.questions));

    this.confirmedPasswordForm.buttonLabel = 'Reset Password';

    this.passwordFormSubscription = this.confirmedPasswordForm.passwordForm$.subscribe(form => {
      this.passwordForm = form;
      this.resetPassword();
    });

  }

  ngOnDestroy() {
    this.emailFormSubscription.unsubscribe();
    this.passwordFormSubscription.unsubscribe();
  }

  resetPassword() {
    if(this.emailForm.valid && this.passwordForm.valid && !this.progress.loading) {
      this.progress.start();

      this.auth.resetPassword(this.token, this.payload())
        .finally(() => this.progress.inc(0.5))
        .pipe(
          catchError(error => this.catchResetPassword(error)),
          switchMap(resp => this.loginAttempt())
        )
        .finally(() => this.progress.done())
        .subscribe(
          (apiAccess: ApiAccess) => this.accessToken.store('apiAccess', apiAccess),
          error => this.exception.handle(error),
          () => this.router.navigate([routes.home])
        )
    }
  }

  /**
   * Returns the reset password payload.
   * 
   */
  protected payload() {
    return {
      email: this.emailForm.get('email').value,
      password: this.passwordForm.get('password').value,
      password_confirmation: this.passwordForm.get('password_confirmation').value,
      token: this.token
    }
  }

  /**
   * Catch the reset password errors.
   * 
   * @param error 
   */
  protected catchResetPassword(error: HttpErrorResponse) {
    if(error.status != 422) this.exception.handle(error);
    
    this.questions.find(form => form.key == 'email').showCustomError = true;

    return Observable.empty();
  }

  /**
   * Send a login request to the server.
   * 
   */
  protected loginAttempt() {
    return this.auth.login(this.payload().email, this.payload().password).finally(() => this.progress.done());
  }
}

