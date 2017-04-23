import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../_services/index';
import { Product } from '../../_models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {
  
  productos: Array<Product>;

  constructor(private productServices: ProductService) {
    this.productos = new Array<Product>();
    this.getProducts();
    console.log(this.productos);
   }

  ngOnInit() {
  }

  getProducts(){
    this.productServices.getAll().subscribe(
      data => this.productos = data.productos,
      error => console.log(error),
      () => console.log("finished")
    );  
  }
}
