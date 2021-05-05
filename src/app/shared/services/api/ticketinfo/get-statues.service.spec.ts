import { TestBed } from '@angular/core/testing';

import { GetStatuesService } from './get-statues.service';

describe('GetStatuesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetStatuesService = TestBed.get(GetStatuesService);
    expect(service).toBeTruthy();
  });
});
