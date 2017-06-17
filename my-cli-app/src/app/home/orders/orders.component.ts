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
  newOrder : Order;
  tipos = [ { 'id' : 1, 'nombre':'arepaMaiz'},
                   { 'id' : 2, 'nombre': 'arepaTrigo'}, 
                   { 'id' : 3, 'nombre': 'empanada'},
                   { 'id' : 4, 'nombre':'tequeños'},
                   { 'id' : 5, 'nombre':'salsa'},
                   { 'id' : 6, 'nombre':'postre'}];

  options =  [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];          

  constructor(private orderService: OrderService, private clienteService: ClienteService, private productServices: ProductService, private _router: Router) {
    this.clientes = new Array<Cliente>();
    this.cliente = new Cliente();
    this.selectedClient = new Cliente();
    this.productos = new Array<Product>();
    this.newOrder = new Order;
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
  
  showTipoProduct(id){
    let tipoP="";
    this.tipos.forEach(element => {
      if(element.id == id ){
        tipoP = element.nombre;
      }
    });
    return tipoP;
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
  


  reloadPage(){

    this._router.navigateByUrl('home').then(()=>{
      this.status="buscar";
    })
    
  }
   submitForm(){
    this.clienteService.create(this.cliente).subscribe(
      data => console.log(data),
      error => console.log("ERROR"),
      () => console.log("finished")
    )
  }

  submitOrder(productos: Array<Product>){
      this.newOrder.id_cliente = this.selectedClient.id;
      this.newOrder.fecha = new Date().toLocaleDateString();
     console.log(this.newOrder);
      this.orderService.create(this.newOrder).subscribe(
        data => console.log(data),
        error => console.log("error"),
        () => this.reloadPage()
      )
  }
}
