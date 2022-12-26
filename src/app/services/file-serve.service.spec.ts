import { TestBed } from '@angular/core/testing';

import { FileServeService } from './file-serve.service';

describe('FileServeService', () => {
  let service: FileServeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileServeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
