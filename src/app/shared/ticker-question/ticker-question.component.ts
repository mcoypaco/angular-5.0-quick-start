import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../question-base';

@Component({
  selector: 'app-ticker-question',
  templateUrl: './ticker-question.component.html',
  styleUrls: ['./ticker-question.component.scss']
})
export class TickerQuestionComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() question: QuestionBase<string>

  constructor() { }

  ngOnInit() {
  }

}
