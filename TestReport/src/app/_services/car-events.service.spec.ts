import { TestBed } from '@angular/core/testing';

import { CarEventsService } from './car-events.service';

describe('CarEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CarEventsService = TestBed.get(CarEventsService);
    expect(service).toBeTruthy();
  });
});
