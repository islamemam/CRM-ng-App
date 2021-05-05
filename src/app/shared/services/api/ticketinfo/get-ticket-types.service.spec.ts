import { TestBed } from '@angular/core/testing';

import { GetTicketTypesService } from './get-ticket-types.service';

describe('GetTicketTypesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetTicketTypesService = TestBed.get(GetTicketTypesService);
    expect(service).toBeTruthy();
  });
});
