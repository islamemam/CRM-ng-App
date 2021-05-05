import { TestBed } from '@angular/core/testing';

import { AutoReplyService } from './auto-reply.service';

describe('AutoReplyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutoReplyService = TestBed.get(AutoReplyService);
    expect(service).toBeTruthy();
  });
});
