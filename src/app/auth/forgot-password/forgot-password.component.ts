import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/finally';

import { AccessTokenService } from '../access-token.service';
import { AuthService } from '../auth.service';
import { ExceptionService } from '../../core/exception.service';
import { ForgotPasswordFormQuestionsService } from './forgot-password-form-questions.service';
import { environment } from '../../../environments/environment';
import { PushNotificationService } from '../../core/push-notification.service';
import { QuestionBase } from '../../shared/question-base';
import { QuestionControlService } from '../../shared/question-control.service';
import { routes } from '../../routes';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [ForgotPasswordFormQuestionsService]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  busy: boolean;
  form: FormGroup;
  formSubscription: Subscription;
  error: string;
  questions: QuestionBase<any>[];
  
  constructor(
    private accessToken: AccessTokenService,
    private auth: AuthService,
    private exception: ExceptionService,
    private questionControl: QuestionControlService,
    private questionSource : ForgotPasswordFormQuestionsService,
    private pushNotification: PushNotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.auth.clientGrantToken().subscribe(apiAccess => this.accessToken.store('clientAccess', apiAccess));

    this.questions = this.questionSource.get();
    this.form = this.questionControl.toFormGroup(this.questions);

    this.formSubscription = this.form.valueChanges.subscribe(data => this.questionControl.setErrorMessages(this.form, this.questions));
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
  }

  submit() {
    const payload = { email: this.form.get('email').value }

    if(this.form.valid && !this.busy) {
      this.busy = true;

      this.auth.forgotPassword(payload)
        .finally(() => this.busy = false)
        .subscribe(
          resp => this.pushNotification.simple('We have e-mailed your password reset link!'),
          error => {
            if(error.status != 422) return this.exception.handle(error);

            this.error = 'Email is invalid.';
          },
          () => this.router.navigate([routes.login])
        );
    }
  }
}
