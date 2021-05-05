import { TestBed } from '@angular/core/testing';

import { GetExternalUnitsService } from './get-external-units.service';

describe('GetExternalUnitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetExternalUnitsService = TestBed.get(GetExternalUnitsService);
    expect(service).toBeTruthy();
  });
});
