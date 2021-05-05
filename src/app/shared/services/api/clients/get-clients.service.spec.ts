import { TestBed } from '@angular/core/testing';

import { GetClientsService } from './get-clients.service';

describe('GetClientsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetClientsService = TestBed.get(GetClientsService);
    expect(service).toBeTruthy();
  });
});
