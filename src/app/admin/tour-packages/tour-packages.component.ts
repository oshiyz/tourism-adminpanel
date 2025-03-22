import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { TourPackageFormComponent } from '../tour-package-form/tour-package-form.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tour-packages',
  standalone: true,
  imports: [ReactiveFormsModule, TourPackageFormComponent], // Ensure TourPackageFormComponent is imported
  templateUrl: './tour-packages.component.html',
  styleUrls: ['./tour-packages.component.scss']
})
export class TourPackagesComponent implements OnInit {
  tourPackages: any[] = [];
  @Input() packageData: any; // Define the input property

  selectedPackage: any = null;
  private apiUrl = 'https://localhost:44399/api/TourPackage';

  constructor(private http: HttpClient,
   private router : Router
  ) {}

  ngOnInit() {
    this.loadTourPackages();
  }

  loadTourPackages() {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      this.tourPackages = data;
    });
  }

  addPackage() {
    this.selectedPackage = {};
  }

  editPackage(pkg: any) {
    // Navigate to the form with the package ID
    this.router.navigate([`/admin/tour-packages/edit`, pkg.packageID]);
  }

  savePackage(data: any) {
    this.http.post(this.apiUrl, data).subscribe(() => {
      this.loadTourPackages();
      this.selectedPackage = null;
    });
  }

  deletePackage(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => this.loadTourPackages());
  }
}
