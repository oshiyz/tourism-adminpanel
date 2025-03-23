import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { TourPackageFormComponent } from './tour-package-form/tour-package-form.component';

@NgModule({
  declarations: [

  ],
  imports: [
    TourPackageFormComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }