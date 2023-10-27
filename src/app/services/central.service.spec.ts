import { TestBed } from '@angular/core/testing';

import { CentralService } from './central.service';

describe('CentralService', () => {
  let service: CentralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
