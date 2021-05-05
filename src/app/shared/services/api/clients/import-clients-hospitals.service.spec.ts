import { TestBed } from '@angular/core/testing';

import { ImportClientsHospitalsService } from './import-clients-hospitals.service';

describe('ImportClientsHospitalsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportClientsHospitalsService = TestBed.get(ImportClientsHospitalsService);
    expect(service).toBeTruthy();
  });
});
