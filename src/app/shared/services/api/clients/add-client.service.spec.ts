import { TestBed } from '@angular/core/testing';

import { AddClientService } from './add-client.service';

describe('AddClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddClientService = TestBed.get(AddClientService);
    expect(service).toBeTruthy();
  });
});
