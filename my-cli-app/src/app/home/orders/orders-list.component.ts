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
  cliente: Cliente;
  pedidos : Array<Order>;
  selectedOrder: Order;
  pedidosFromServer : Array<Order>;
  constructor(private orderService: OrderService,  private clienteService: ClienteService, private productServices: ProductService) {
    this.cliente = new Cliente();
    this.products = new Array<Product>();
    this.clientes = new Array<Cliente>();
    this.pedidos = new Array<Order>();    
    this.selectedOrder = new Order();
    this.pedidosFromServer = new Array<Order>();    
   }

  ngOnInit() {
    this.getOrders();
  }

  setPedidos(pedidos:Array<Order>){
      this.pedidosFromServer= pedidos;
      console.log(this.pedidosFromServer);

  }
  setProducts(productos: Array<Product>){
      this.products= productos;
        console.log(this.products);
  }

  setClients(clientes: Array<Cliente>){
   this.clientes = clientes;
  }  
  
  
  setOrders(){
    this.pedidosFromServer.forEach(element => {
            let today =  this.getTodayFormat();
            console.log(today);
            if(element.fecha == today){
                this.setNewPedido(element);
            } 
    });
  }

  getTodayFormat(){
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth()+1; //January is 0!
    var year = today.getFullYear();
    let dayString : String;
    let monthString : String;
    if(day<10){
      
        dayString = '0'+ day;
    }
    else{
        dayString = day.toString();
    } 
    if(month<10){
      
        monthString='0'+month;
    } 
    return year + "-" +  monthString +"-"+dayString ;
  }
  setNewPedido(pedido: Order){
      let nuevoPedido= new Order();
      nuevoPedido.setPedido(pedido, this.clientes, this.products);
      this.pedidos.push(nuevoPedido);
     
  }

   getOrders(){
    let def = 
    this.orderService.getAll().subscribe(
      data => this.setPedidos(data.orders),
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
  
  getDeliveryStatus(statusPedido){
    switch(statusPedido){
     
      case 0:
        return { "background-color": "#f0ad4e"}

      case 1:
        return {"background-color": "#5bc0de"}   
      
      case 2:
        return {"background-color": "#5cb85c"}    

      default:
        return {"background-color": "red"}    
    }
  }
  onSelect(pedido:Order){
    console.log("onSelect");
    this.selectedOrder = pedido;
  }

}