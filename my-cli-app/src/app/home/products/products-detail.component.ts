import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from '../../_services/index';
import { Product } from '../../_models/product';


import { ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})


export class DetailProductsComponent implements OnInit{

  private producto: Product;
  public productsForm: FormGroup;
  private editar=true;
  editarNow:boolean = false;
  public tipos = ['arepaMaiz', 'arepaTrigo', 'empanada', 'salsa', 'postre'];
  
  constructor(private _fb:FormBuilder, private productServices: ProductService,  private _router: ActivatedRoute, private _routerNav: Router) {
     this.producto = new Product();
     let id= this._router.params.subscribe((params:Params) =>{
        this.getProduct(params.id);
    })
   }

  ngOnInit() {
      this.productsForm = this._fb.group({
      'tipoProducto': [''],
      'nombre' : ['',[<any>Validators.required,<any>Validators.minLength(5)]],
      'descripcion': [''],
      'ingredientes' : [''],
      'cantidad':[''],
      'precio': [''],
      'img' : [''],
    })
  }

  getProduct(id){
  this.productServices.getById(id).subscribe(
    data => { 
      this.producto = data.productos
  },
    error => { console.log(error)},
      () => { console.log("finished") });
  }

  submitForm(){
    this.productServices.update(this.producto).subscribe(
      data => console.log(data),
      error => console.log("ERROR"),
      () => this._routerNav.navigate(['../home/products/'])
    )
  }
  
}