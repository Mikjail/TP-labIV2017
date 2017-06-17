import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ClienteService } from '../../_services/index';
import { Cliente } from '../../_models/index';
const URL = 'http://localhost:8080/filesPerson';

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ ClienteService ]
})

export class NewClientComponent implements OnInit{
  public clientes: Array<Cliente>;
  public nuevo:boolean = false;
  public clientesForm: FormGroup;
  public cliente: Cliente;
  public sexo: Array<any> = ['m', 'f']
  public submitted:boolean;
  public uploader:FileUploader = new FileUploader({url: URL});
  public hasAnotherDropZoneOver:boolean = false;

  constructor(private _fb:FormBuilder, private clienteService: ClienteService, private _router: Router ) {
    this.clientes = new Array<Cliente>();
    this.cliente = new Cliente();
     this.clientesForm = this._fb.group({
      'nombre' : ['',[<any>Validators.required,<any>Validators.minLength(5)]],
      'telefono' :  ['',[<any>Validators.required]],
      'calle' :  ['',[<any>Validators.required]],
      'altura' :  ['',[<any>Validators.required]],
      'piso' :  '',
      'depto' :  '',
      'localidad' :  ['',[<any>Validators.required]],      
      'pass' :  ['',[<any>Validators.required]]
      
    })
   }

  ngOnInit() {
  }

   public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  

   submitForm(cliente, params:boolean){
        this.submitted = true;
    this.cliente.foto =this.uploader.queue[0]._file.name;
    console.log(this.cliente.foto);

    this.clienteService.create(this.cliente).subscribe(
      data => console.log(data),
      error => console.log("ERROR"),
      () => this.uploader.uploadAll()
    )
  }

}