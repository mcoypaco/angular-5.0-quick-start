import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { PasswordQuestion } from '../../shared/password-question/password-question';
import { QuestionBase } from '../../shared/question-base';

@Injectable()
export class ChangePasswordFormService {

  constructor() { }

  get(): QuestionBase<any>[] {
    return [
      new PasswordQuestion({
        key: 'old',
        label: 'Old Password',
        type: 'password',
        required: true,
        validators: [Validators.required],
        validationMessages: {
          required: 'Old password is required.',
        },
        customError: 'Invalid Password',
        order: 1
      }),
    ];
  }
}
