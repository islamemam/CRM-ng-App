import { TestBed } from '@angular/core/testing';

import { UpdateTicketService } from './update-ticket.service';

describe('UpdateTicketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateTicketService = TestBed.get(UpdateTicketService);
    expect(service).toBeTruthy();
  });
});
