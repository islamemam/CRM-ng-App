import { TestBed } from '@angular/core/testing';

import { GetStatusesService } from './get-statuses.service';

describe('GetStatusesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetStatusesService = TestBed.get(GetStatusesService);
    expect(service).toBeTruthy();
  });
});
