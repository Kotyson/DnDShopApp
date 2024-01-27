import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'equipment',
    pathMatch: 'full'
  },
  {
    path: 'equipment',
    loadChildren: () => import('./pages/equipment/equipment.module').then(m => m.EquipmentPageModule)
  },
  {
    path: 'equipment/:id',
    loadChildren: () => import('./pages/equipment-details/equipment-details.module').then(m => m.EquipmentDetailsPageModule)
  },
  {
    path: 'equipment/:id1/:id2',
    loadChildren: () => import('./pages/equipment-details/equipment-details.module').then(m => m.EquipmentDetailsPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
