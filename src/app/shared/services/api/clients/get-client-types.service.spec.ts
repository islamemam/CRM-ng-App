import { TestBed } from '@angular/core/testing';

import { GetClientTypesService } from './get-client-types.service';

describe('GetClientTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetClientTypesService = TestBed.get(GetClientTypesService);
    expect(service).toBeTruthy();
  });
});
