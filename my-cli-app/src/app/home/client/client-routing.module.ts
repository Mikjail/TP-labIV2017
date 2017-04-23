import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './client.component';
import { NewClientComponent } from './client-new.component';

const clientRoutes: Routes = [
  {
    path: 'client', component: ClientComponent, children:[
      {
        path: 'newClient', component: NewClientComponent
      }
    ]
  },
  { path: '**', redirectTo: 'client' }
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
