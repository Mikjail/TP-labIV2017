import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchClientByPhone }  from './client-search.component';

import { Cliente, Order, Product } from '../../_models/index';
import { ClienteService, OrderService, ProductService } from '../../_services/index';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrderService, ClienteService, SearchClientByPhone, ProductService]
})

export class OrderComponent implements OnInit {
  clientes: Array<Cliente>;
  orders: Array<Order>;
  cliente: Cliente;
  status:String = "buscar";
  selectedClient: Cliente;
  productos : Array<Product>;
  constructor(private orderService: OrderService, private clienteService: ClienteService, private productServices: ProductService, private _router: Router) {
    this.clientes = new Array<Cliente>();
    this.cliente = new Cliente();
    this.selectedClient = new Cliente();
   }

  ngOnInit() {
    this.getClientes();
  }
   getClientes(){
    this.clienteService.getAll().subscribe(
      data => this.clientes=data.clientes,
      error => console.log(error),
      () => this.getProducts()
    );  
  }

  getProducts(){
    this.productServices.getAll().subscribe(
      data => this.productos = data.productos,
      error => console.log(error),
      () => console.log("finished")
    );  
  }

  onSelect(cliente:Cliente){
    this.selectedClient = cliente;
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
