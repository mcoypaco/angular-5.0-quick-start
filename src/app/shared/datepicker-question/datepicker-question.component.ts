import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../question-base';

@Component({
  selector: 'app-datepicker-question',
  templateUrl: './datepicker-question.component.html',
  styleUrls: ['./datepicker-question.component.scss']
})
export class DatepickerQuestionComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() question: QuestionBase<string>;

  constructor() { }

  ngOnInit() {
  }

}
