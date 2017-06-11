import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchClient }  from './client-search.component';

import { Persona } from '../../_models/persona';
import { PersonaService } from '../../_services/index';
import { OrderService } from '../../_services/index';
import { Order } from '../../_models/order';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrderService, PersonaService, SearchClient]
})

export class OrderComponent implements OnInit {
  personas: Array<Persona>;
  orders: Array<Order>;
  persona: Persona;
  nuevo:boolean = false;

  constructor(private orderService: OrderService, private personaService: PersonaService, private _router: Router) {
    this.personas = new Array<Persona>();
    this.persona = new Persona();
   }

  ngOnInit() {
    this.getPersonas();
  }
   getPersonas(){
    this.personaService.getAll().subscribe(
      data => this.personas = data.personas,
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

   submitForm(){
   console.log(this.persona.foto);
    this.personaService.create(this.persona).subscribe(
      data => console.log(data),
      error => console.log("ERROR"),
      () => console.log("finished")
    )
  }

}
