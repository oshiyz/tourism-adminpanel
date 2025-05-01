import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPlaceFormComponent } from './travel-place-form.component';

describe('TravelPlaceFormComponent', () => {
  let component: TravelPlaceFormComponent;
  let fixture: ComponentFixture<TravelPlaceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelPlaceFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelPlaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
