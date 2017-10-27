import { TestBed, inject } from '@angular/core/testing';

import { DiscardChangesService } from './discard-changes.service';

describe('DiscardChangesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiscardChangesService]
    });
  });

  it('should be created', inject([DiscardChangesService], (service: DiscardChangesService) => {
    expect(service).toBeTruthy();
  }));
});
