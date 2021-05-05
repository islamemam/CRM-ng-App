import { TestBed } from '@angular/core/testing';

import { UpdateNoteService } from './update-note.service';

describe('UpdateNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateNoteService = TestBed.get(UpdateNoteService);
    expect(service).toBeTruthy();
  });
});
