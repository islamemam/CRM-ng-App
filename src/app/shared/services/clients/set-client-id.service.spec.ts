import { TestBed } from '@angular/core/testing';

import { SetClientIdService } from './set-client-id.service';

describe('SetClientIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SetClientIdService = TestBed.get(SetClientIdService);
    expect(service).toBeTruthy();
  });
});
