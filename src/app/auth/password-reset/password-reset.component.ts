import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';

import { ApiAccess } from '../../interfaces/api-access';
import { AuthService } from '../auth.service';
import { AccessTokenService } from '../access-token.service';
import { ConfirmedPasswordFormService } from '../confirmed-password-form/confirmed-password-form.service';
import { ExceptionService } from '../../core/exception.service';
import { environment } from '../../../environments/environment';
import { PasswordResetFormQuestionsService } from './password-reset-form-questions.service';
import { PushNotificationService } from '../../core/push-notification.service';
import { QuestionControlService } from '../../shared/question-control.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  providers: [PasswordResetFormQuestionsService],
})
export class PasswordResetComponent implements OnInit {
  questions: any[];
  
  hasResetLink: boolean;
  verified: boolean;

  email: string;
  token: string;
  
  emailForm: FormGroup;
  passwordForm: FormGroup

  constructor(
    private accessToken: AccessTokenService,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    public confirmedPasswordForm: ConfirmedPasswordFormService,
    private exception: ExceptionService,
    private http: HttpClient,
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

    this.confirmedPasswordForm.buttonLabel = 'Reset Password';

    this.confirmedPasswordForm.passwordForm$.subscribe(form => {
      this.passwordForm = form;
      this.resetPassword();
    });

  }

  resetPassword() {
    if(this.emailForm.valid && this.passwordForm.valid) {
      const payload = {
        email: this.emailForm.get('email').value,
        password: this.passwordForm.get('password').value,
        password_confirmation: this.passwordForm.get('password_confirmation').value,
        token: this.token
      }

      this.http.post(`${environment.laravel.url}/api/password/reset/${this.token}`, payload, { headers: this.auth.clientHeaders()})
        .finally(() => this.confirmedPasswordForm.busy = false)
        .catch(error => {
          if(error.status != 422) this.exception.handle(error);

          this.questions.find(form => form.key == 'email').showCustomError = true;

          return Observable.empty();
        })
        .switchMap(resp => {
          return this.auth.login(payload.email, payload.password)
            .finally(() => this.confirmedPasswordForm.busy = false)
            .catch(error => {
              this.exception.handle(error);
              return Observable.empty();
            });
        })
        .subscribe((apiAccess: ApiAccess) => {
          if(apiAccess) {
            this.accessToken.store('apiAccess', apiAccess);
            this.pushNotification.simple('Password has been reset.')
            this.router.navigate(['/']);
          };
        })
    }
  }
}
