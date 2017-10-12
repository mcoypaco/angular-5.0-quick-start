import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { QuestionBase } from '../../shared/question-base';
import { SortingService } from '../../core/sorting.service';
import { TextboxQuestion } from '../../shared/textbox-question';
import { PasswordQuestion } from '../../shared/password-question';

@Injectable()
export class RegisterFormQuestionsService {

  constructor(private sorting: SortingService) { }

  get() {
    let questions = {
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
      password: [ 
        new PasswordQuestion({
          key: 'password',
          label: 'Password',
          required: true,
          validators: [Validators.required, Validators.minLength(8)],
          error: 'Password is required and at least 8 characters.',
          order: 1
        }),
  
        new PasswordQuestion({
          key: 'password_confirmation',
          label: 'Confirm Password',
          required: true,
          validators: [Validators.required, Validators.minLength(8)],
          error: 'Confirm password is required and at least 8 characters.',
          order: 2
        }),
      ]
    } 

    questions.password = this.sorting.sortByValue(questions.password, 'order');

    return questions;
  }
}
