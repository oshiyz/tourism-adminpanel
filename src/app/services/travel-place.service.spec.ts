import { TestBed } from '@angular/core/testing';

import { TravelPlaceService } from './travel-place.service';

describe('TravelPlaceService', () => {
  let service: TravelPlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelPlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
