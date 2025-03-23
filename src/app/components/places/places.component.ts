import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlaceService, Place } from '../../services/place.service';

@Component({
  selector: 'app-places',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  places: Place[] = [];
  placeForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;

  constructor(
    private placeService: PlaceService,
    private fb: FormBuilder
  ) {
    this.placeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      images: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      packages: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      timeSlots: ['', Validators.required],
      specialFunctions: ['', Validators.required],
      location: ['', Validators.required],
      contactInfo: ['', Validators.required],
      isActive: [true]
    });
  }

  ngOnInit(): void {
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.placeService.getPlaces().subscribe({
      next: (places) => {
        this.places = places;
      },
      error: (error) => {
        console.error('Error loading places:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.placeForm.valid) {
      const formData = this.placeForm.value;
      if (this.isEditing && this.editingId) {
        this.placeService.updatePlace(this.editingId, formData).subscribe({
          next: () => {
            this.loadPlaces();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error updating place:', error);
          }
        });
      } else {
        this.placeService.createPlace(formData).subscribe({
          next: () => {
            this.loadPlaces();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error creating place:', error);
          }
        });
      }
    }
  }

  editPlace(place: Place): void {
    if (place.id) {
      this.isEditing = true;
      this.editingId = place.id;
      this.placeForm.patchValue(place);
    }
  }

  deletePlace(id: number): void {
    if (confirm('Are you sure you want to delete this place?')) {
      this.placeService.deletePlace(id).subscribe({
        next: () => {
          this.loadPlaces();
        },
        error: (error) => {
          console.error('Error deleting place:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.placeForm.reset();
    this.isEditing = false;
    this.editingId = null;
  }

  get formControls() {
    return this.placeForm.controls;
  }
} 