import { TestBed, inject } from '@angular/core/testing';

import { ConfirmedPasswordFormService } from './confirmed-password-form.service';

describe('ConfirmedPasswordFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmedPasswordFormService]
    });
  });

  it('should be created', inject([ConfirmedPasswordFormService], (service: ConfirmedPasswordFormService) => {
    expect(service).toBeTruthy();
  }));
});
