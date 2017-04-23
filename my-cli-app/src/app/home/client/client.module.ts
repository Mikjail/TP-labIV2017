import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';

import { UserService }  from '../../_services/index';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClientRoutingModule
  ],
  providers: [
    UserService
  ]
})
export class ClientModule {}