import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './client.component';


const clientRoutes: Routes = [
  {
    path: 'client', component: ClientComponent
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
