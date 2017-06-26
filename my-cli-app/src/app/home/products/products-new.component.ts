import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Product } from '../../_models/product';
import { ProductService, ProductCategoryService } from  '../../_services/index';
const URL = 'http://www.cambur-pinton.com/admin/back/filesProduct';

@Component({
  selector: 'app-products-new',
  templateUrl: './products-new.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService, ProductCategoryService]
})


export class NewProductsComponent implements OnInit{
  
    public productsForm: FormGroup;
    public tipos =[];
    public uploader:FileUploader = new FileUploader({url: URL});
    public hasAnotherDropZoneOver:boolean = false;
    public submitted: boolean;
  
constructor( private _router: Router, private _fb:FormBuilder, private productServices: ProductService, private productCategoryService: ProductCategoryService) {
    this.getProductCategory();
 }
  
  ngOnInit() {
      this.productsForm = this._fb.group({
      'id_tipoProducto': ['',[<any>Validators.required]],
      'nombre' : ['',[<any>Validators.required,<any>Validators.minLength(5)]],
      'descripcion':  ['',[<any>Validators.required,<any>Validators.minLength(5)]],
      'ingredientes' :  ['',[<any>Validators.required]],
      'precio':  ['',[<any>Validators.required]],
      'img' :  [''],
    })

  }

public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
  

  submitForm(producto:Product, params:boolean){
    this.submitted = true;
    producto.cantidad= 0;
     if(this.uploader.queue.length > 0){     
      
    producto.img ="assets/productos/"+ this.uploader.queue[0]._file.name;
    }
    else{
       producto.img ="";
    }
    this.productServices.create(producto).subscribe(
      data => console.log(data),
      error => console.log("ERROR"),
      () => {
        if(this.uploader.queue.length > 0){     
            this.uploader.uploadAll()
        }
        this._router.navigateByUrl("/home/products")
      }
    )
  }

  getProductCategory(){
    return this.productCategoryService.getAll().subscribe(
      data => this.tipos = data,
      error => console.log(error),
      () => console.log("finished")
    );
  }

}