import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../question-base';

@Component({
  selector: 'app-radio-group-question',
  templateUrl: './radio-group-question.component.html',
  styleUrls: ['./radio-group-question.component.scss']
})
export class RadioGroupQuestionComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() question: QuestionBase<string>;
  
  constructor() { }

  ngOnInit() {
  }

}
