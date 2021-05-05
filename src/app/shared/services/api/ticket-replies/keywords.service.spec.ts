import { TestBed } from '@angular/core/testing';

import { KeywordsService } from './keywords.service';

describe('KeywordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeywordsService = TestBed.get(KeywordsService);
    expect(service).toBeTruthy();
  });
});
