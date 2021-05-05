import { TestBed } from '@angular/core/testing';

import { StoreTicketUsersService } from './store-ticket-users.service';

describe('StoreTicketUsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreTicketUsersService = TestBed.get(StoreTicketUsersService);
    expect(service).toBeTruthy();
  });
});
