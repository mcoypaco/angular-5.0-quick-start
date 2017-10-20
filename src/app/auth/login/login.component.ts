import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import 'rxjs/add/operator/finally';

import { AuthService } from '../auth.service';
import { AccessTokenService } from '../access-token.service';
import { ExceptionService } from '../../core/exception.service';
import { LoginFormQuestionsService } from './login-form-questions.service';
import { QuestionBase } from '../../shared/question-base';
import { QuestionControlService } from '../../shared/question-control.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginFormQuestionsService],
})
export class LoginComponent implements OnInit {
  busy: boolean;
  invalidCredentials: boolean;
  form: FormGroup;
  questions: QuestionBase<any>[];
  
  constructor(
    private auth: AuthService,
    private accessToken: AccessTokenService,
    private exception: ExceptionService,
    private questionControl: QuestionControlService, 
    private questionSource: LoginFormQuestionsService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.questions = this.questionSource.getQuestions();
    this.form = this.questionControl.toFormGroup(this.questions);
  }

  /**
   * Attempt login with user credentials
   */
  login() {
    if(this.form.valid && !this.busy) {
      this.busy = true; 
      this.invalidCredentials = false;

      this.auth.login(this.form.get('email').value, this.form.get('password').value)
        .finally(() => this.busy = false)
        .subscribe(
          apiAccess => this.accessToken.store('apiAccess', apiAccess),
          error => this.handleError(error),
          () => this.router.navigate(['/'])
        );
    }
  }

  handleError(error) {
    if(error.status != 401) return this.exception.handle(error);

    this.invalidCredentials = true;
  }
}
