import { TestBed } from '@angular/core/testing';

import { GetRolesService } from './get-roles.service';

describe('GetRolesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetRolesService = TestBed.get(GetRolesService);
    expect(service).toBeTruthy();
  });
});
