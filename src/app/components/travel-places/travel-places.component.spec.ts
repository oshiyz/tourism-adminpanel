import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPlacesComponent } from './travel-places.component';

describe('TravelPlacesComponent', () => {
  let component: TravelPlacesComponent;
  let fixture: ComponentFixture<TravelPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelPlacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
