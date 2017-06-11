import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../_services/index';
import { Order } from '../../_models/order';

import { Persona } from '../../_models/persona';
import { PersonaService } from '../../_services/index';
import { SearchClient } from './client-search.component'
import { Router } from '@angular/router';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrderService, PersonaService, SearchClient]
})

export class ListOrdersComponent implements OnInit{

  personas: Array<Persona>;
  orders: Array<Order>;
  persona: Persona;
  constructor(private orderService: OrderService, private personaService: PersonaService, private _router: Router) {
    this.personas = new Array<Persona>();
    this.persona = new Persona();
   }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.orderService.getAll().subscribe(
      data => this.orders = data.orders,
      error => console.log(error),
      () => console.log("finished")
    );  
  }

  setPerson(id){
    console.log(id);
    this.personas.forEach(element => {
      if(element.id == id){
        this.persona = element;
      }
    });
  }

  onSelect(product:Order){
    this._router.navigate(['../home/products/detailProduct',{ id: product.id}]);
  }

  
}