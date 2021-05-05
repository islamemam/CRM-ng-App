import { TestBed } from '@angular/core/testing';

import { GetRepliesService } from './get-replies.service';

describe('GetRepliesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetRepliesService = TestBed.get(GetRepliesService);
    expect(service).toBeTruthy();
  });
});
