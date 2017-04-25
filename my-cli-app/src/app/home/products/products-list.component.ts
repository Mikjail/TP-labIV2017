import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/index';
import { Product } from '../../_models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})

export class ListProductsComponent implements OnInit{

  productos: Array<Product>;
  
  constructor(private productServices: ProductService) {
    this.productos = new Array<Product>();
    this.getProducts();
   }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productServices.getAll().subscribe(
      data => this.productos = data.productos,
      error => console.log(error),
      () => console.log("finished")
    );  
  }
}