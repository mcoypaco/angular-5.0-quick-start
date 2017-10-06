import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

import { QuestionBase } from '../../shared/question-base';
import { TextboxQuestion } from '../../shared/textbox-question';

@Injectable()
export class LoginFormQuestionsService {

  constructor() { }

  getQuestions() {
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
      
      new TextboxQuestion({
        key: 'password',
        label: 'Password',
        type: 'password',
        required: true,
        validators: [Validators.required, Validators.minLength(8)],
        error: 'Password is required and at least 8 characters.',
        order: 2
      }),

    ];

    return questions.sort((a,b) => a.order - b.order);
  }

}
