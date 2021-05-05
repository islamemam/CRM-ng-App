import { TestBed } from '@angular/core/testing';

import { GetNotesService } from './get-notes.service';

describe('GetNotesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetNotesService = TestBed.get(GetNotesService);
    expect(service).toBeTruthy();
  });
});
