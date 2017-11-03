import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-array-question',
  templateUrl: './array-question.component.html',
  styleUrls: ['./array-question.component.scss']
})
export class ArrayQuestionComponent implements OnInit {
  @Input() formArray: FormArray;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
