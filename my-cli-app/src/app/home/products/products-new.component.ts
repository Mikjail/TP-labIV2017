import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products.component.css']
})

export class NewProductsComponent implements OnInit{
  
    public productsForm: FormGroup;
    public submitted: boolean;
    public events: any[] = [];

constructor(private _fb:FormBuilder) { }

  ngOnInit() {
      this.productsForm = this._fb.group({
      'tipoProducto': [''],
      'name' : ['',[<any>Validators.required,<any>Validators.minLength(5)]],
      'descripcion': [''],
      'ingredientes' : [''],
      'cantidad':[''],
      'precio': ['']
    })
  }

}