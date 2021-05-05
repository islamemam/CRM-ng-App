import { TestBed } from '@angular/core/testing';

import { GetMainReasonsService } from './get-main-reasons.service';

describe('GetMainReasonsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetMainReasonsService = TestBed.get(GetMainReasonsService);
    expect(service).toBeTruthy();
  });
});
