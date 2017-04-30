import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
    public submitted: boolean;
    public events: any[] = [];

constructor(private _fb:FormBuilder, private productServices: ProductService) { }
  
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
      () => console.log("finished")
    )
    console.log(producto);

  }

}