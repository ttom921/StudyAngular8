import { TestBed } from '@angular/core/testing';

import { OSMMarkerClusterService } from './osmmarker-cluster.service';

describe('OSMMarkerClusterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OSMMarkerClusterService = TestBed.get(OSMMarkerClusterService);
    expect(service).toBeTruthy();
  });
});
