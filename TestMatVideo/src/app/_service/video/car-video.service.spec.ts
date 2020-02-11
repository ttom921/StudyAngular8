import { TestBed } from '@angular/core/testing';

import { CarVideoService } from './car-video.service';

describe('CarVideoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarVideoService = TestBed.get(CarVideoService);
    expect(service).toBeTruthy();
  });
});
