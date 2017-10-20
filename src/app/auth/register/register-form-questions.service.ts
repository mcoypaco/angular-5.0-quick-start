import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { QuestionBase } from '../../shared/question-base';
import { SortingService } from '../../core/sorting.service';
import { TextboxQuestion } from '../../shared/textbox-question';

@Injectable()
export class RegisterFormQuestionsService {

  constructor(private sorting: SortingService) { }

  get() {
    let questions = {
      name: [
        new TextboxQuestion({
          key: 'name',
          label: 'Name',
          required: true,
          validators: [Validators.required],
          error: 'Name is required.',
        }),
      ],
      email: [
        new TextboxQuestion({
          key: 'email',
          label: 'Email',
          type: 'email',
          required: true,
          validators: [Validators.required, Validators.email],
          error: 'Email is required and must be valid.',
          customError: 'Email is already in use.'
        }),
      ],
    } 

    return questions;
  }
}
