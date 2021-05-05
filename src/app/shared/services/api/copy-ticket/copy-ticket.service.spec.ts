import { TestBed } from '@angular/core/testing';

import { CopyTicketService } from './copy-ticket.service';

describe('CopyTicketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CopyTicketService = TestBed.get(CopyTicketService);
    expect(service).toBeTruthy();
  });
});
