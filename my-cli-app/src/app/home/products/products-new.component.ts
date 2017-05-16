import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';

import { Product } from '../../_models/product';
import { ProductService, ProductCategoryService } from  '../../_services/index';
@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService, ProductCategoryService]
})

export class NewProductsComponent implements OnInit{
  
    public productsForm: FormGroup;
    public tipos =[];
  
constructor( private _router: Router, private _fb:FormBuilder, private productServices: ProductService, private productCategoryService: ProductCategoryService) {
    this.getProductCategory();
 }
  
  ngOnInit() {
      this.productsForm = this._fb.group({
      'tipoProducto': ['',[<any>Validators.required]],
      'nombre' : ['',[<any>Validators.required,<any>Validators.minLength(5)]],
      'descripcion':  ['',[<any>Validators.required,<any>Validators.minLength(5)]],
      'ingredientes' :  ['',[<any>Validators.required]],
      'cantidad': ['',[<any>Validators.required]],
      'precio':  ['',[<any>Validators.required]],
      'img' :  ['',[<any>Validators.required]],
    })

  }

  submitForm(producto:Product){

    this.productServices.create(producto).subscribe(
      data => console.log(data),
      error => console.log("ERROR"),
      () => this._router.navigate(['../home/products/'])
    )
    console.log(producto);

  }

  getProductCategory(){
    return this.productCategoryService.getAll().subscribe(
      data => this.tipos = data,
      error => console.log(error),
      () => console.log("finished")
    );
  }

}