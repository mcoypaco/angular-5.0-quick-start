import { TestBed, inject } from '@angular/core/testing';

import { RegisterFormQuestionsService } from './register-form-questions.service';

describe('RegisterFormQuestionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterFormQuestionsService]
    });
  });

  it('should be created', inject([RegisterFormQuestionsService], (service: RegisterFormQuestionsService) => {
    expect(service).toBeTruthy();
  }));
});
