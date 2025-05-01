import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { TravelPlaceService } from '../../../services/travel-place.service';

@Component({
  selector: 'app-travel-place-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './travel-place-form.component.html',
  styleUrls: ['./travel-place-form.component.scss']
})
export class TravelPlaceFormComponent implements OnInit {
  placeForm: FormGroup;
  isEditMode = false;
  placeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private travelPlaceService: TravelPlaceService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.placeForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.placeId = +params['id'];
        this.loadTravelPlace(this.placeId);
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      ownerName: ['', Validators.required],
      ownerEmail: ['', [Validators.required, Validators.email]],
      placeName: ['', Validators.required],
      description: ['', Validators.required],
      locationLink: ['', Validators.required],
      images: [''],
      bookingInstructions: ['', Validators.required],
      discountNotices: [''],
      contactInfo: ['', Validators.required],
      bookedDates: [''],
      facilities: this.fb.array([])
    });
  }

  get facilities(): FormArray {
    return this.placeForm.get('facilities') as FormArray;
  }

  addFacility(): void {
    const facilityForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      averagePrice: [0, [Validators.required, Validators.min(0)]],
      pricePerPerson: [0, [Validators.required, Validators.min(0)]],
      duration: ['', Validators.required],
      availability: ['', Validators.required],
      specialNotices: ['']
    });

    this.facilities.push(facilityForm);
  }

  removeFacility(index: number): void {
    this.facilities.removeAt(index);
  }

  loadTravelPlace(id: number): void {
    this.travelPlaceService.getTravelPlaceById(id).subscribe({
      next: (place) => {
        this.placeForm.patchValue(place);
        place.facilities?.forEach(facility => {
          const facilityForm = this.fb.group({
            id: [facility.id],
            name: [facility.name, Validators.required],
            description: [facility.description, Validators.required],
            averagePrice: [facility.averagePrice, [Validators.required, Validators.min(0)]],
            pricePerPerson: [facility.pricePerPerson, [Validators.required, Validators.min(0)]],
            duration: [facility.duration, Validators.required],
            availability: [facility.availability, Validators.required],
            specialNotices: [facility.specialNotices]
          });
          this.facilities.push(facilityForm);
        });
      },
      error: (error) => console.error('Error loading travel place:', error)
    });
  }

  onSubmit(): void {
    if (this.placeForm.valid) {
      const travelPlace = this.placeForm.value;

      if (this.isEditMode && this.placeId) {
        this.travelPlaceService.updateTravelPlace(this.placeId, travelPlace).subscribe({
          next: () => this.router.navigate(['/travel-places']),
          error: (error) => console.error('Error updating travel place:', error)
        });
      } else {
        this.travelPlaceService.createTravelPlace(travelPlace).subscribe({
          next: () => this.router.navigate(['/travel-places']),
          error: (error) => console.error('Error creating travel place:', error)
        });
      }
    }
  }
}
