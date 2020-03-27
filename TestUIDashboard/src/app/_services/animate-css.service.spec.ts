import { TestBed } from '@angular/core/testing';

import { AnimateCSSService } from './animate-css.service';

describe('AnimateCSSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnimateCSSService = TestBed.get(AnimateCSSService);
    expect(service).toBeTruthy();
  });
});
