import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../question-base';

@Component({
  selector: 'app-dropdown-question',
  templateUrl: './dropdown-question.component.html',
  styleUrls: ['./dropdown-question.component.scss']
})
export class DropdownQuestionComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() question: QuestionBase<string>;

  constructor() { }

  ngOnInit() {
  }

}
