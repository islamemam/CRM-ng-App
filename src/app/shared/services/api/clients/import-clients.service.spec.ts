import { TestBed } from '@angular/core/testing';

import { ImportClientsService } from './import-clients.service';

describe('ImportClientsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportClientsService = TestBed.get(ImportClientsService);
    expect(service).toBeTruthy();
  });
});
