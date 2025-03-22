import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { TourPackagesComponent } from './tour-packages/tour-packages.component';
import { TourPackageFormComponent } from './tour-package-form/tour-package-form.component';

@NgModule({
  declarations: [

  ],
  imports: [
    LayoutComponent,
    TourPackagesComponent,
    TourPackageFormComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }