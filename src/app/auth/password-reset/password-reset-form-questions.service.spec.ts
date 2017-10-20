import { TestBed, inject } from '@angular/core/testing';

import { PasswordResetFormQuestionsService } from './password-reset-form-questions.service';

describe('PasswordResetFormQuestionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordResetFormQuestionsService]
    });
  });

  it('should be created', inject([PasswordResetFormQuestionsService], (service: PasswordResetFormQuestionsService) => {
    expect(service).toBeTruthy();
  }));
});
