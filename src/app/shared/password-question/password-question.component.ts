import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../question-base';

@Component({
  selector: 'app-password-question',
  templateUrl: './password-question.component.html',
  styleUrls: ['./password-question.component.scss']
})
export class PasswordQuestionComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() question: QuestionBase<string>;
  hidden: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
