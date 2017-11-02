import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../../shared/question-base';

@Component({
  selector: 'app-slide-toggle-question',
  templateUrl: './slide-toggle-question.component.html',
  styleUrls: ['./slide-toggle-question.component.scss']
})
export class SlideToggleQuestionComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() question: QuestionBase<string>;

  constructor() { }

  ngOnInit() {
  }

}
