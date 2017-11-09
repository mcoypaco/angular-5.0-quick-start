import { Component, OnInit, Input } from '@angular/core';

import { QuestionBase } from '../../shared/question-base';

@Component({
  selector: 'app-array-question',
  templateUrl: './array-question.component.html',
  styleUrls: ['./array-question.component.scss']
})
export class ArrayQuestionComponent implements OnInit {
  @Input() formArray: QuestionBase<string>;
  @Input() form;

  constructor() { }

  ngOnInit() {
  }

}
