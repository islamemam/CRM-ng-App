import { TestBed } from '@angular/core/testing';

import { ShowClientService } from './show-client.service';

describe('ShowClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShowClientService = TestBed.get(ShowClientService);
    expect(service).toBeTruthy();
  });
});
