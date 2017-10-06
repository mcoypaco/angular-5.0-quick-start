import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
    private questionControl: QuestionControlService, 
    private questionSource: LoginFormQuestionsService
  ) { }

  ngOnInit() {
    this.questions = this.questionSource.getQuestions();
    this.form = this.questionControl.toFormGroup(this.questions);
  }

  login(){
    console.log(this.form.value);
  }
}
