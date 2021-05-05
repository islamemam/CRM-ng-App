import { TestBed } from '@angular/core/testing';

import { ExportClientsService } from './export-clients.service';

describe('ExportClientsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportClientsService = TestBed.get(ExportClientsService);
    expect(service).toBeTruthy();
  });
});
