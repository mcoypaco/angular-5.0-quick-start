import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { QuestionBase } from '../../shared/question-base';
import { TextboxQuestion } from '../../shared/textbox-question/textbox-question';
import { SortingService } from '../../core/sorting.service';

@Injectable()
export class LoginFormQuestionsService {

  constructor(private sorting: SortingService) { }

  /**
   * Returns the questions source as a QuestonBase array
   */
  get() {
    const questions: QuestionBase<any>[] = [
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        validators: [Validators.required, Validators.email],
        validationMessages: {
          required: 'Email is required.',
          email: 'Email must be valid.'
        },
        order: 1
      }),
      
      new TextboxQuestion({
        key: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        validators: [Validators.required, Validators.minLength(8)],
        validationMessages: {
          required: 'Password is required.',
          minlength: 'Password must be at least 8 characters.'
        },
        order: 2
      }),

    ];

    return this.sorting.sortByNumericValue(questions, 'order');
  }

}
