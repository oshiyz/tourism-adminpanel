// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { TourPackagesComponent } from './components/tour-packages/tour-packages.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MatIconModule } from '@angular/material/icon';


// Export the routes constant
export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) // Lazy load the AdminModule
  },
  { path: '', redirectTo: '/tour-packages', pathMatch: 'full' },
  { path: 'tour-packages', component: TourPackagesComponent },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'users',
    loadComponent: () => import('./admin/users/users.component').then(m => m.UsersComponent)
  },
  {
    path: 'tours',
    loadComponent: () => import('./components/tour-packages/tour-packages.component').then(m => m.TourPackagesComponent)
  },
  {
    path: 'places',
    loadComponent: () => import('./components/places/places.component').then(m => m.PlacesComponent)
  },
  {
    path: 'bookings',
    loadComponent: () => import('./admin/bookings/bookings.component').then(m => m.BookingsComponent)
  },
  {
    path: 'reports',
    loadComponent: () => import('./admin/reports/reports.component').then(m => m.ReportsComponent)
  },
  {
    path: 'settings',
    loadComponent: () => import('./admin/settings/settings.component').then(m => m.SettingsComponent)
  },
  {
    path: 'travel-places',
    children: [
      {
        path: '',
        loadComponent: () => import('./components/travel-places/travel-places-list/travel-places-list.component')
          .then(m => m.TravelPlacesListComponent)
      },
      {
        path: 'new',
        loadComponent: () => import('./components/travel-places/travel-place-form/travel-place-form.component')
          .then(m => m.TravelPlaceFormComponent)
      },
      {
        path: 'edit/:id',
        loadComponent: () => import('./components/travel-places/travel-place-form/travel-place-form.component')
          .then(m => m.TravelPlaceFormComponent)
      },
      {
        path: 'detail/:id',
        loadComponent: () => import('./components/travel-places/travel-place-detail/travel-place-detail.component')
          .then(m => m.TravelPlaceDetailComponent)
      }
    ]
  }
];

export class AppRoutingModule { }
