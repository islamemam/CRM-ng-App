import { TestBed } from '@angular/core/testing';

import { GetDepartmentsService } from './get-departments.service';

describe('GetDepartmentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetDepartmentsService = TestBed.get(GetDepartmentsService);
    expect(service).toBeTruthy();
  });
});
