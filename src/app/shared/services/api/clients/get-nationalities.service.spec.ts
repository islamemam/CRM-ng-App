import { TestBed } from '@angular/core/testing';

import { GetNationalitiesService } from './get-nationalities.service';

describe('GetNationalitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetNationalitiesService = TestBed.get(GetNationalitiesService);
    expect(service).toBeTruthy();
  });
});
