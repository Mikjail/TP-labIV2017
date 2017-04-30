import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';

import { Product } from '../../_models/product';
import { ProductService } from  '../../_services/index';

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})

export class NewProductsComponent implements OnInit{
  
    public productsForm: FormGroup;
    public tipos = ['arepaMaiz', 'arepaTrigo', 'empanada', 'salsa', 'postre'];

constructor(private _fb:FormBuilder, private productServices: ProductService, private _router: Router) { }
  
  ngOnInit() {
      this.productsForm = this._fb.group({
      'tipoProducto': [''],
      'nombre' : ['',[<any>Validators.required,<any>Validators.minLength(5)]],
      'descripcion': [''],
      'ingredientes' : [''],
      'cantidad':[''],
      'precio': [''],
      'img' : ['']
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

}