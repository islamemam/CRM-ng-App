import { TestBed } from '@angular/core/testing';

import { DeleteTicketService } from './delete-ticket.service';

describe('DeleteTicketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteTicketService = TestBed.get(DeleteTicketService);
    expect(service).toBeTruthy();
  });
});
