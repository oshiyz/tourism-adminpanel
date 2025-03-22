import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tour-package-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Import ReactiveFormsModule here
  templateUrl: './tour-package-form.component.html',
  styleUrls: ['./tour-package-form.component.scss']
})
export class TourPackageFormComponent {
  tourPackageForm: FormGroup;
  @Input() packageData: any; // Define the input property

  constructor(private fb: FormBuilder) {
    this.tourPackageForm = this.fb.group({
      packageName: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      durationDays: [0, Validators.required],
      place: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.tourPackageForm.valid) {
      console.log(this.tourPackageForm.value);
    }
  }
}
