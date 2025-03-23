import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TourPackageService } from '../../services/tour-package.service';
import { CommonModule } from '@angular/common';
import { TourPackage } from '../../models/tour-package'; // Adjust the import path as necessary

@Component({
  selector: 'app-tour-package-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './tour-package-form.component.html',
  styleUrls: ['./tour-package-form.component.scss']
})
export class TourPackageFormComponent {
  @Input() packageData: TourPackage | null = null;
  tourPackageForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private tourPackageService: TourPackageService) {
    this.tourPackageForm = this.fb.group({
      packageName: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      durationDays: [0, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      place: ['', Validators.required]
    });
  }

  ngOnChanges() {
    if (this.packageData) {
      this.tourPackageForm.patchValue(this.packageData);
    }
  }

  onSubmit() {
    if (this.tourPackageForm.valid) {
      const tourPackage = this.tourPackageForm.value;
      this.tourPackageService.addTourPackage(tourPackage).subscribe({
        next: (response) => {
          console.log('Tour package added successfully', response);
          // Optionally, reset the form or navigate to another page
          this.tourPackageForm.reset();
        },
        error: (error) => {
          console.error('There was an error!', error);
        }
      });
    }
  }
}