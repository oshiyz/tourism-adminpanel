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
import { TravelPlace, TravelPlaceFacility } from '../../../models/travel-place';


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
  selectedImages: string[] = [];

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
      id: [null],
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

  addFacility(facility?: TravelPlaceFacility): void {
    const mainId = this.placeForm.get('id')?.value || this.placeId; // <-- A
    const facilityForm = this.fb.group({
      travelPlaceId: [facility?.travelPlaceId || mainId, Validators.required], // ADD THIS LINE!
    name: [facility?.name || '', Validators.required],
    description: [facility?.description || '', Validators.required],
    averagePrice: [facility?.averagePrice || 0, [Validators.required, Validators.min(0)]],
    pricePerPerson: [facility?.pricePerPerson || 0, [Validators.required, Validators.min(0)]],
    duration: [facility?.duration || '', Validators.required],
    availability: [facility?.availability || '', Validators.required],
    specialNotices: [facility?.specialNotices || '']
  });

    this.facilities.push(facilityForm);
  }

  removeFacility(index: number): void {
    this.facilities.removeAt(index);
  }

  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files: FileList | null = input.files;
    if (!files) return;

    const readFile = (file: File): Promise<string> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    };

    Promise.all(Array.from(files).map(file => readFile(file))).then(base64Images => {
      this.selectedImages = base64Images;
      this.placeForm.patchValue({ images: JSON.stringify(base64Images) });
    });
  }

  loadTravelPlace(id: number): void {
    this.travelPlaceService.getTravelPlaceById(id).subscribe({
      next: (place: TravelPlace) => {
        this.placeForm.patchValue({
          id: place.id,
          ownerName: place.ownerName,
          ownerEmail: place.ownerEmail,
          placeName: place.placeName,
          description: place.description,
          locationLink: place.locationLink,
          bookingInstructions: place.bookingInstructions,
          discountNotices: place.discountNotices,
          contactInfo: place.contactInfo,
          bookedDates: place.bookedDates,
          images: place.images
        });

        if (place.images) {
          try {
            this.selectedImages = JSON.parse(place.images);
          } catch {
            this.selectedImages = [];
          }
        }

        if (place.facilities && place.facilities.length > 0) {
          place.facilities.forEach(f => this.addFacility(f));
        }
      },
      error: (err) => console.error('Error loading travel place:', err)
    });
  }

  onSubmit(): void {
    if (this.placeForm.invalid) return;

    const formValue = this.placeForm.value;
    const request = this.isEditMode
      ? this.travelPlaceService.updateTravelPlace(this.placeId!, formValue)
      : this.travelPlaceService.createTravelPlace(formValue);

    request.subscribe({
      next: () => this.router.navigate(['/travel-places']),
      error: err => console.error('Submit failed', err)
    });
  }
}
