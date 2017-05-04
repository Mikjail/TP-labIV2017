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
    public tipos =[ { 'id' : 1, 'nombre':'arepaMaiz'},
                   { 'id' : 2, 'nombre': 'arepaTrigo'}, 
                   { 'id' : 3, 'nombre': 'empanada'},
                   { 'id' : 4, 'nombre':'tequeños'},
                   { 'id' : 5, 'nombre':'salsa'},
                   { 'id' : 6, 'nombre':'postre'}];
  
constructor(private _fb:FormBuilder, private productServices: ProductService, private _router: Router) { }
  
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

}