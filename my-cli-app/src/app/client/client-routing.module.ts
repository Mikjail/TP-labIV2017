import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './client.component';
import { ClientListComponent } from './client-list.component';


const clientRoutes: Routes = [
  {
    path: '', component: ClientComponent, children: [
      { path: '', component: ClientListComponent,
      }
    ]
  }
]
@NgModule({
  imports: [
    RouterModule.forChild(clientRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClientRoutingModule { }
