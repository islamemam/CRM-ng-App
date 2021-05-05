import { TestBed } from '@angular/core/testing';

import { StoreRepliesService } from './store-replies.service';

describe('StoreRepliesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreRepliesService = TestBed.get(StoreRepliesService);
    expect(service).toBeTruthy();
  });
});
