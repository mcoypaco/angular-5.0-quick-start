import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { TextboxQuestion } from '../../shared/textbox-question/textbox-question';

@Injectable()
export class RegisterFormQuestionsService {

  /**
   * Returns the questions source as a QuestonBase collection
   */
  get() {
    let questions = {
      name: [
        new TextboxQuestion({
          key: 'name',
          label: 'Name',
          required: true,
          validators: [Validators.required],
          validationMessages: {
            required: 'Name is required.'
          }
        }),
      ],
      email: [
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
          customError: 'Email is already in use.'
        }),
      ],
    } 

    return questions;
  }
}
