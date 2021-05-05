import { TestBed } from '@angular/core/testing';

import { GetNationalIdTypesService } from './get-national-id-types.service';

describe('GetNationalIdTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetNationalIdTypesService = TestBed.get(GetNationalIdTypesService);
    expect(service).toBeTruthy();
  });
});
