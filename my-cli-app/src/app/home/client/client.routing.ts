import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './client.component';
import { NewClientComponent } from './client-new.component';

export const CLIENT_RECORDS_ROUTE: Routes = [
  
      { path: '', component: NewClientComponent },
      { path: '**', redirectTo: '' },
];