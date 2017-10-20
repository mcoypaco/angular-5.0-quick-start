import { Injectable } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

import { PasswordQuestion } from '../../shared/password-question';
import { SortingService } from '../../core/sorting.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ConfirmedPasswordFormService {
  busy: boolean;
  form: FormGroup;
  buttonLabel: string;

  private passwordForm = new Subject<FormGroup>();
  passwordForm$ = this.passwordForm.asObservable();

  constructor(private sorting: SortingService) { }

  questions(): PasswordQuestion[] {
    const questions = [ 
      new PasswordQuestion({
        key: 'password',
        label: 'Password',
        required: true,
        validators: [Validators.required, Validators.minLength(8)],
        error: 'Password is required and at least 8 characters.',
        customError: `Passwords doesn't match.`,
        order: 1
      }),

      new PasswordQuestion({
        key: 'password_confirmation',
        label: 'Confirm Password',
        required: true,
        validators: [Validators.required, Validators.minLength(8)],
        error: 'Confirm password is required and at least 8 characters.',
        customError: `Passwords doesn't match.`,
        order: 2
      }),
    ];

    return this.sorting.sortByNumericValue(questions, 'order');
  }

  /**
   * 
   */
  submit() {
    this.busy = true;
    this.passwordForm.next(this.form);
  }
}
