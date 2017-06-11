import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderComponent } from './orders.component';
// import { NewOrdersComponent } from './orders-new.component';
import { ListOrdersComponent } from './orders-list.component';
// import { DetailOrdersComponent } from './orders-detail.component';

export const ORDERS_RECORDS_ROUTE: Routes = [
  
      { path: '', component: ListOrdersComponent },
    //   { path: 'newOrder', component: NewProductsComponent},
    //   { path: 'detailOrder', component: DetailProductsComponent},
      { path: '**', redirectTo: '' },
];