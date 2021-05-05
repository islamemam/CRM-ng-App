import { TestBed } from '@angular/core/testing';

import { GetSubClientService } from './get-sub-client.service';

describe('GetSubClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetSubClientService = TestBed.get(GetSubClientService);
    expect(service).toBeTruthy();
  });
});
