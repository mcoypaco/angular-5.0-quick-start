import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from '../question-base';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() question: QuestionBase<string>;
  hide: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
