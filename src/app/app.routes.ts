// src/app/app.routes.ts
import { Routes } from '@angular/router';


// Export the routes constant
export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) // Lazy load the AdminModule
  },
  { path: '', redirectTo: '/admin', pathMatch: 'full' } // Default route
];

export class AppRoutingModule { }