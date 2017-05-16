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
  private selectOption: any;
  public tipos = [ { 'id' : 1, 'nombre':'arepaMaiz'},
                   { 'id' : 2, 'nombre': 'arepaTrigo'}, 
                   { 'id' : 3, 'nombre': 'empanada'},
                   { 'id' : 4, 'nombre':'tequeños'},
                   { 'id' : 5, 'nombre':'salsa'},
                   { 'id' : 6, 'nombre':'postre'}];
  
  constructor(private _fb:FormBuilder, private productServices: ProductService,  private _router: ActivatedRoute, private _routerNav: Router) {
     this.producto = new Product();
     let id= this._router.params.subscribe((params:Params) =>{
        this.getProduct(params.id);
    })
   }

  ngOnInit() {
      this.productsForm = this._fb.group({
      'tipoProducto': ['',[<any>Validators.required]],
      'nombre' : ['',[<any>Validators.required,<any>Validators.minLength(5)]],
      'descripcion': ['',[<any>Validators.required,<any>Validators.minLength(5)]],
      'ingredientes' : ['',[<any>Validators.required,<any>Validators.minLength(5)]],
      'cantidad':[''],
      'precio':['',[<any>Validators.required]],
      'img' : ['',[<any>Validators.required,<any>Validators.minLength(5)]]
    })
  }

  getProduct(id){
  this.productServices.getById(id).subscribe(
    data => { 
      this.producto = data.productos
      this.selectOption = this.tipos[this.producto.id_tipoProducto].nombre;
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