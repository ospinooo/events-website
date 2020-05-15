import { TestBed } from '@angular/core/testing';

import { FeesService } from './fees.service';

describe('FeesService', () => {
  let service: FeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
