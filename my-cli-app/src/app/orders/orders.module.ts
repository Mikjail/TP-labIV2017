import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { OrdersComponent } from './orders.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
      OrdersComponent
  ]
})
export class OrdersModule{}