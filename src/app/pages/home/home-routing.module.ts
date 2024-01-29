import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'equipment',
        loadChildren: () => import('../equipment/equipment.module').then(m => m.EquipmentPageModule)
      },
      {
        path: 'equipment/:id1/:id2',
        loadChildren: () => import('../equipment-details/equipment-details.module').then(m => m.EquipmentDetailsPageModule)
      },
      {
        path: 'favourites',
        loadChildren: () => import('../favourites/favourites.module').then(m => m.FavouritesPageModule)
      },
      {
        path: 'favourites/:id1/:id2',
        redirectTo: 'equipment/:id1/:id2',
        // loadChildren: () => import('../favourites/favourites.module').then(m => m.FavouritesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
