import { TestBed } from '@angular/core/testing';

import { DownloadTemplatesService } from './download-templates.service';

describe('DownloadTemplatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DownloadTemplatesService = TestBed.get(DownloadTemplatesService);
    expect(service).toBeTruthy();
  });
});
