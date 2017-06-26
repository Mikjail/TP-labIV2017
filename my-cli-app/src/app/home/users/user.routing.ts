import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
import { NewUserComponent } from './user-new.component';
import { UserListComponent } from './user-list.component';

export const USER_RECORDS_ROUTE: Routes = [
  
    { path: '', component: UserListComponent },
      { path: 'newUser', component: NewUserComponent},
      { path: '**', redirectTo: '' }
];