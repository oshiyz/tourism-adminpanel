import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tour-package-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './tour-package-form.component.html',
  styleUrls: ['./tour-package-form.component.scss']
})
export class TourPackageFormComponent {
  tourPackageForm: FormGroup;
  @Input() packageData: any; // Define the input property

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.tourPackageForm = this.fb.group({
      packageName: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      durationDays: [0, Validators.required],
      place: ['', Validators.required]
    });

    // If editing, populate the form with the existing data
    this.route.params.subscribe(params => {
      if (params['id']) {
        // Fetch the package data and populate the form
        // this.tourPackageForm.patchValue(packageData);
      }
    });
  }

  onSubmit() {
    if (this.tourPackageForm.valid) {
      console.log(this.tourPackageForm.value);
    }
  }
}