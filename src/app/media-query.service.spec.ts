import { TestBed } from '@angular/core/testing';

import { MediaQueryService } from './media-query.service';

describe('MediaQueryService', () => {
  let service: MediaQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediaQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
