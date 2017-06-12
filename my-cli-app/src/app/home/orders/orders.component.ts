import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchClientByPhone }  from './client-search.component';

import { Cliente } from '../../_models/index';
import { ClienteService } from '../../_services/index';
import { OrderService } from '../../_services/index';
import { Order } from '../../_models/order';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrderService, ClienteService, SearchClientByPhone]
})

export class OrderComponent implements OnInit {
  clientes: Array<Cliente>;
  orders: Array<Order>;
  cliente: Cliente;
  status:String = "buscar";

  constructor(private orderService: OrderService, private clienteService: ClienteService, private _router: Router) {
    this.clientes = new Array<Cliente>();
    this.cliente = new Cliente();
   }

  ngOnInit() {
    this.getClientes();
  }
   getClientes(){
    this.clienteService.getAll().subscribe(
      data => this.clientes = data.clientes,
      error => console.log(error),
      () => console.log("finished")
    );  
  }

  setClientes(id){
    console.log(id);
    this.clientes.forEach(element => {
      if(element.id == id){
        this.cliente = element;
      }
    });
  }

   submitForm(){
   console.log(this.cliente.foto);
    this.clienteService.create(this.cliente).subscribe(
      data => console.log(data),
      error => console.log("ERROR"),
      () => console.log("finished")
    )
  }

  chageStatus(status){
    switch(status){
      case "nuevo":
        this.status= status;
        break;

      case "pedir":
        this.status= status;
        break;
      
      default : 
        this.status = status;
    }
  }

}
