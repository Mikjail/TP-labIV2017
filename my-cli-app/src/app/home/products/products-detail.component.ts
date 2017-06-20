import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProductService } from '../../_services/index';
import { Product } from '../../_models/product';


import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ActivatedRoute, Params, Router} from '@angular/router';
const URL = 'http://www.cambur-pinton.com/admin/back/filesProduct';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})


export class DetailProductsComponent implements OnInit{
 
  public producto: Product;
  public productsForm: FormGroup;
  private editar=true;
  editarNow:boolean = false;
  public selectOption: any;
  public submitted: boolean;

  public tipos = [ { 'id' : 1, 'nombre':'arepaMaiz'},
                   { 'id' : 2, 'nombre': 'arepaTrigo'}, 
                   { 'id' : 3, 'nombre': 'empanada'},
                   { 'id' : 4, 'nombre':'tequeños'},
                   { 'id' : 5, 'nombre':'salsa'},
                   { 'id' : 6, 'nombre':'postre'}];

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasAnotherDropZoneOver:boolean = false;

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
      'precio':[''],
      'img' : ['']
    })
  }

  

  getProduct(id){
  this.productServices.getById(id).subscribe(
    data => { 
      this.producto = data.productos
      this.selectOption = this.tipos[parseInt(this.producto.id_tipoProducto)-1].nombre;
      console.log(this.selectOption);
  },
    error => { console.log(error)},
      () => { console.log("finished") 
    });
  }

  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  
 
  submitForm(product , params){
    this.submitted = true;
    this.producto.img ="assets/productos/"+ this.uploader.queue[0]._file.name;
    this.productServices.update(this.producto).subscribe(
      data => console.log(data),
      error => console.log("ERROR"),
      () => this.uploader.uploadAll()
    )
  }
  
}