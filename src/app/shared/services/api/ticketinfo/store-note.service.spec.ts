import { TestBed } from '@angular/core/testing';

import { StoreNoteService } from './store-note.service';

describe('StoreNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreNoteService = TestBed.get(StoreNoteService);
    expect(service).toBeTruthy();
  });
});
