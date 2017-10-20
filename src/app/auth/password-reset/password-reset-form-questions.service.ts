import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { QuestionBase } from '../../shared/question-base';
import { SortingService } from '../../core/sorting.service';
import { TextboxQuestion } from '../../shared/textbox-question';

@Injectable()
export class PasswordResetFormQuestionsService {

  constructor(private sorting: SortingService) { }

  get() {
    let questions = [
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        validators: [Validators.required, Validators.email],
        error: 'Email is required and must be valid.',
        customError: 'Invalid email given.',
        order: 1
      }),
    ]

    return this.sorting.sortByNumericValue(questions, 'order');
  }
}
