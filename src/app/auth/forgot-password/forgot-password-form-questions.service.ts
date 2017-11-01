import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { QuestionBase } from '../../shared/question-base';
import { TextboxQuestion } from '../../shared/textbox-question';

@Injectable()
export class ForgotPasswordFormQuestionsService {
  
  /**
   * Returns the questions source as a QuestonBase array
   */
  get() {
    let questions = [
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        validators: [Validators.required, Validators.email],
        validationMessages: {
          required: 'Email is required.',
          email: 'Email must be valid.',
        },
        customError: 'Invalid email given.',
      }),
    ]

    return questions;
  }

}
