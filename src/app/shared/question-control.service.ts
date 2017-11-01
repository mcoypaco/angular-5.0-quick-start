import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from './question-base';

@Injectable()
export class QuestionControlService {

  constructor() { }

  /**
   * Creates a form group instance of the QuestionBase
   * 
   * @param questions 
   */
  toFormGroup(questions: QuestionBase<any>[]) {
    let group: any = {};
    
    questions.forEach(question => {
      group[question.key] = question.validators ? new FormControl(question.value || '', question.validators)
                                              : new FormControl(question.value || '', []);
    });

    return new FormGroup(group);
  }

  /**
   * Set the appropriate error messages per form control.
   * 
   * @param form 
   * @param questions 
   */
  setErrorMessages(form: FormGroup, questions: QuestionBase<any>[]) {
    questions.forEach(question => {
      question.errorMessage = '';

      const control = form.get(question.key);

      if (control && control.dirty && !control.valid) {
        const messages = question.validationMessages;
        for (const key in control.errors) {
          question.errorMessage += messages[key] + ' ';
        }
      }
    });
  }
}
