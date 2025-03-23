import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TourPackageService, TourPackage } from '../../services/tour-package.service';

@Component({
  selector: 'app-tour-packages',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './tour-packages.component.html',
  styleUrls: ['./tour-packages.component.scss']
})
export class TourPackagesComponent implements OnInit {
  tourPackages: TourPackage[] = [];
  tourPackageForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;

  constructor(
    private tourPackageService: TourPackageService,
    private fb: FormBuilder
  ) {
    this.tourPackageForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      duration: ['', Validators.required],
      location: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTourPackages();
  }

  loadTourPackages(): void {
    this.tourPackageService.getTourPackages().subscribe({
      next: (packages) => {
        this.tourPackages = packages;
      },
      error: (error) => {
        console.error('Error loading tour packages:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.tourPackageForm.valid) {
      const formData = this.tourPackageForm.value;
      if (this.isEditing && this.editingId) {
        this.tourPackageService.updateTourPackage(this.editingId, formData).subscribe({
          next: () => {
            this.loadTourPackages();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error updating tour package:', error);
          }
        });
      } else {
        this.tourPackageService.createTourPackage(formData).subscribe({
          next: () => {
            this.loadTourPackages();
            this.resetForm();
          },
          error: (error) => {
            console.error('Error creating tour package:', error);
          }
        });
      }
    }
  }

  editTourPackage(package_: TourPackage): void {
    if (package_.id) {
      this.isEditing = true;
      this.editingId = package_.id;
      this.tourPackageForm.patchValue(package_);
    }
  }

  deleteTourPackage(id: number): void {
    if (confirm('Are you sure you want to delete this tour package?')) {
      this.tourPackageService.deleteTourPackage(id).subscribe({
        next: () => {
          this.loadTourPackages();
        },
        error: (error) => {
          console.error('Error deleting tour package:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.tourPackageForm.reset();
    this.isEditing = false;
    this.editingId = null;
  }

  get formControls() {
    return this.tourPackageForm.controls;
  }
}
