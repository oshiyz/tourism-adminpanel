import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourPackagesComponent } from './components/tour-packages/tour-packages.component';

const routes: Routes = [
  { path: '', redirectTo: '/tour-packages', pathMatch: 'full' },
  { path: 'tour-packages', component: TourPackagesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 