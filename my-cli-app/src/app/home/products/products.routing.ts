import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products.component';
import { NewProductsComponent } from './products-new.component';
import { ListProductsComponent } from './products-list.component';

export const PRODUCT_RECORDS_ROUTE: Routes = [
  
      { path: '', component: ListProductsComponent },
      { path: 'newProduct', component: NewProductsComponent},
      { path: '**', redirectTo: '' },
];