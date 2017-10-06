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
    let questions: QuestionBase<any>[] = [
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        validators: [Validators.required, Validators.email],
        error: 'Email is required and must be valid.',
        order: 1
      }),
      
      new PasswordQuestion({
        key: 'password',
        label: 'Password',
        required: true,
        validators: [Validators.required, Validators.minLength(8)],
        error: 'Password is required and at least 8 characters.',
        order: 2
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

    return this.sorting.sortByValue(questions, 'order');
  }

  toggleVisibilityIcon() {

  }
}
