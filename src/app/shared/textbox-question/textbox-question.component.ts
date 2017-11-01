import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../question-base';

@Component({
  selector: 'app-textbox-question',
  templateUrl: './textbox-question.component.html',
  styleUrls: ['./textbox-question.component.scss']
})
export class TextboxQuestionComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() question: QuestionBase<string>;

  constructor() { }

  ngOnInit() {
  }

}
