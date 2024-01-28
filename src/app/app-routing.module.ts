import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home/equipment',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'home/equipment',
    pathMatch: 'full'
  },
  // {
  //   path: 'equipment/:id',
  //   loadChildren: () => import('./pages/equipment-details/equipment-details.module').then(m => m.EquipmentDetailsPageModule)
  // },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
