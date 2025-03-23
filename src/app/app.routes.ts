// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { TourPackagesComponent } from './components/tour-packages/tour-packages.component';


// Export the routes constant
export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) // Lazy load the AdminModule
  },
  { path: '', redirectTo: '/tour-packages', pathMatch: 'full' },
  { path: 'tour-packages', component: TourPackagesComponent }
];

export class AppRoutingModule { }