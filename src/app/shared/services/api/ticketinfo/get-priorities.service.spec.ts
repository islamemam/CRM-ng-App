import { TestBed } from '@angular/core/testing';

import { GetPrioritiesService } from './get-priorities.service';

describe('GetPrioritiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetPrioritiesService = TestBed.get(GetPrioritiesService);
    expect(service).toBeTruthy();
  });
});
