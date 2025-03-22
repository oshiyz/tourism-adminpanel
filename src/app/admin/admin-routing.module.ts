// admin-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { TourPackagesComponent } from './tour-packages/tour-packages.component';
import { TourPackageFormComponent } from './tour-package-form/tour-package-form.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'tour-packages/new', component: TourPackageFormComponent }, // Route for creating a new tour package
      { path: 'tour-packages/table', component: TourPackagesComponent }, // Route for viewing the table
      { path: 'tour-packages/edit/:id', component: TourPackageFormComponent }, // Route for editing an existing tour package
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }