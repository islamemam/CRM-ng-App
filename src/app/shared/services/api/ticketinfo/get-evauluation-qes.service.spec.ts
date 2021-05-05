import { TestBed } from '@angular/core/testing';

import { GetEvauluationQesService } from './get-evauluation-qes.service';

describe('GetEvauluationQesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetEvauluationQesService = TestBed.get(GetEvauluationQesService);
    expect(service).toBeTruthy();
  });
});
