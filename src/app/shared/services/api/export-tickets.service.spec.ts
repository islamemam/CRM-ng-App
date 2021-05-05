import { TestBed } from '@angular/core/testing';

import { ExportTicketsService } from './export-tickets.service';

describe('ExportTicketsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportTicketsService = TestBed.get(ExportTicketsService);
    expect(service).toBeTruthy();
  });
});
