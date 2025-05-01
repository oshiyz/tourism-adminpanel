import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPlacesListComponent } from './travel-places-list.component';

describe('TravelPlacesListComponent', () => {
  let component: TravelPlacesListComponent;
  let fixture: ComponentFixture<TravelPlacesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelPlacesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelPlacesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
