import { NgModule } from '@angular/core';
import { Routes , RouterModule} from '@angular/router';

export const routes: Routes = [
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    { path: '', redirectTo: '/admin/tour-packages', pathMatch: 'full' }
  ];
  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
