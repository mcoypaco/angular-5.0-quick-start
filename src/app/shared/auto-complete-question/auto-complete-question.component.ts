import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../../shared/question-base'; 

@Component({
  selector: 'app-auto-complete-question',
  templateUrl: './auto-complete-question.component.html',
  styleUrls: ['./auto-complete-question.component.scss']
})
export class AutoCompleteQuestionComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() question: QuestionBase<string>

  constructor() { }

  ngOnInit() {
    console.log(this.question);
  }
}
