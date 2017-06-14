import { Component, OnInit } from '@angular/core';
import { OrderService, ProductService, ClienteService } from '../../_services/index';
import { Order, Cliente, Product, ProductoPedido } from '../../_models/index';

import {  } from '../../_services/index';
import { Router } from '@angular/router';


@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrderService, ClienteService, ProductService]
})

export class ListOrdersComponent implements OnInit{

  clientes: Array<Cliente>;
  products: Array<Product>;
  productoPedido : Array<ProductoPedido>;
  cliente: Cliente;
  pedidos : Array<Order>;
  selectedOrder: Order;

  constructor(private orderService: OrderService,  private clienteService: ClienteService, private productServices: ProductService) {
    this.cliente = new Cliente();
    this.productoPedido = new Array<ProductoPedido>();
    this.products = new Array<Product>();
    this.clientes = new Array<Cliente>();
    this.pedidos = new Array<Order>();    
    this.selectedOrder = new Order();
   }

  ngOnInit() {
    this.getOrders();
  }

  setProductoPedido(productoPedido:Array<ProductoPedido>){
      this.productoPedido= productoPedido;
      console.log(this.productoPedido);

  }
  setProducts(productos: Array<Product>){
      this.products= productos;
        console.log(this.products);
  }

  setClients(clientes: Array<Cliente>){
   this.clientes = clientes;
    console.log(this.clientes);
  }  
  
  
  setOrders(){
    this.productoPedido.forEach(element => {
          let idPedidos= new Array<number>();
          if(idPedidos.indexOf(element.id_pedido)!= -1){
            this.setFromExistingPedido(element);
          } 
          else{
            this.setNewPedido(element);
          } 
    });
    console.log(this.pedidos);
  }

  setNewPedido(productoP){
      let nuevoPedido= new Order();
      nuevoPedido.setPedido(productoP, this.clientes, this.products);
      this.pedidos.push(nuevoPedido); 
  }
  
  setFromExistingPedido(productoP:ProductoPedido){
        this.pedidos.forEach(element => {
          if(element.id == productoP.id_pedido){
             element.setProducto(productoP, this.products);
          }
        });
  }

   getOrders(){
    let def = 
    this.orderService.getAll().subscribe(
      data => this.setProductoPedido(data.orders),
      error => console.log(error),
      () => this.getProducts()
    );  
  }

  getProducts(){
    this.productServices.getAll().subscribe(
      data =>  this.setProducts(data.productos),
      error => console.log(error),
      () => this.getCliente()
    );  
  }

  getCliente(){
   this.clienteService.getAll().subscribe(
     data => this.setClients(data.clientes),
     error => console.warn(error),
     () => this.setOrders()
   );
  }
  
  onSelect(pedido:Order){
    console.log("onSelect");
    this.selectedOrder = pedido;
  }

}