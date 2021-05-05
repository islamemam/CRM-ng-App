import { TestBed } from '@angular/core/testing';

import { StoreAnswerService } from './store-answer.service';

describe('StoreAnswerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreAnswerService = TestBed.get(StoreAnswerService);
    expect(service).toBeTruthy();
  });
});
