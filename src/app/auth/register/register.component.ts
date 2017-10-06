import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RegisterFormQuestionsService } from './register-form-questions.service';
import { QuestionBase } from '../../shared/question-base';
import { QuestionControlService } from '../../shared/question-control.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterFormQuestionsService]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  questions: QuestionBase<any>[];

  constructor(
    private questionControl: QuestionControlService,
    private questionSource: RegisterFormQuestionsService
  ) { }

  ngOnInit() {
    this.questions = this.questionSource.get();
    this.form = this.questionControl.toFormGroup(this.questions);
  }

}
