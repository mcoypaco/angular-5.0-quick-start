import { TestBed, inject } from '@angular/core/testing';

import { ChangePasswordFormService } from './change-password-form.service';

describe('ChangePasswordFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangePasswordFormService]
    });
  });

  it('should be created', inject([ChangePasswordFormService], (service: ChangePasswordFormService) => {
    expect(service).toBeTruthy();
  }));
});
