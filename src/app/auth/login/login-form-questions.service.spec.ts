import { TestBed, inject } from '@angular/core/testing';

import { LoginFormQuestionsService } from './login-form-questions.service';

describe('LoginFormQuestionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginFormQuestionsService]
    });
  });

  it('should be created', inject([LoginFormQuestionsService], (service: LoginFormQuestionsService) => {
    expect(service).toBeTruthy();
  }));
});
