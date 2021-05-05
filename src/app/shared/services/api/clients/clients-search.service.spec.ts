import { TestBed } from '@angular/core/testing';

import { ClientsSearchService } from './clients-search.service';

describe('ClientsSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientsSearchService = TestBed.get(ClientsSearchService);
    expect(service).toBeTruthy();
  });
});
