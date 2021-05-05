import { TestBed } from '@angular/core/testing';

import { GetSubReasonsService } from './get-sub-reasons.service';

describe('GetSubReasonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetSubReasonsService = TestBed.get(GetSubReasonsService);
    expect(service).toBeTruthy();
  });
});
