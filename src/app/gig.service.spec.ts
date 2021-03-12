import { TestBed } from '@angular/core/testing';

import { GigService } from './gig.service';

describe('GigService', () => {
  let service: GigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
