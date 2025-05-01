import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPlaceDetailComponent } from './travel-place-detail.component';

describe('TravelPlaceDetailComponent', () => {
  let component: TravelPlaceDetailComponent;
  let fixture: ComponentFixture<TravelPlaceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelPlaceDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelPlaceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
