import { TestBed } from '@angular/core/testing';

import { EditClientService } from './edit-client.service';

describe('EditClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditClientService = TestBed.get(EditClientService);
    expect(service).toBeTruthy();
  });
});
