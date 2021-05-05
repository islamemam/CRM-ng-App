import { TestBed } from '@angular/core/testing';

import { GetClientService } from './get-client.service';

describe('GetClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetClientService = TestBed.get(GetClientService);
    expect(service).toBeTruthy();
  });
});
