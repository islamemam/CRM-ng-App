import { TestBed } from '@angular/core/testing';

import { GetTicketService } from './get-ticket.service';

describe('GetTicketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetTicketService = TestBed.get(GetTicketService);
    expect(service).toBeTruthy();
  });
});
