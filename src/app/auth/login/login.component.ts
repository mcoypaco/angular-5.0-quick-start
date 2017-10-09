import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { AccessTokenService } from '../access-token.service';
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
  form: FormGroup;
  questions: QuestionBase<any>[];
  
  constructor(
    private auth: AuthService,
    private accessToken: AccessTokenService,
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
    if(this.form.valid) {
      this.auth.login(this.form.get('email').value, this.form.get('password').value)
        .subscribe(
          apiAccess => this.accessToken.store(apiAccess),
          error => console.log(error),
          () => this.router.navigate(['/'])
        );
    }
  }
}
