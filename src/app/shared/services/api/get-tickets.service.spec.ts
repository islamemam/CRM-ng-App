import { TestBed } from '@angular/core/testing';

import { GetTicketsService } from './get-tickets.service';

describe('GetTicketsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetTicketsService = TestBed.get(GetTicketsService);
    expect(service).toBeTruthy();
  });
});
