import { TestBed } from '@angular/core/testing';

import { DeleteNoteService } from './delete-note.service';

describe('DeleteNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteNoteService = TestBed.get(DeleteNoteService);
    expect(service).toBeTruthy();
  });
});
