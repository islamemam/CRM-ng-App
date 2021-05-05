import { TestBed } from '@angular/core/testing';

import { GetHospitalsService } from './get-hospitals.service';

describe('GetHospitalsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetHospitalsService = TestBed.get(GetHospitalsService);
    expect(service).toBeTruthy();
  });
});
