import { TestBed, inject } from '@angular/core/testing';

import { ForgotPasswordFormQuestionsService } from './forgot-password-form-questions.service';

describe('ForgotPasswordFormQuestionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgotPasswordFormQuestionsService]
    });
  });

  it('should be created', inject([ForgotPasswordFormQuestionsService], (service: ForgotPasswordFormQuestionsService) => {
    expect(service).toBeTruthy();
  }));
});
