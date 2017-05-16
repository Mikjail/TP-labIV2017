import { Component, OnInit } from '@angular/core';
import { EntidadService } from '../../_services/index';
import { Entidad } from '../../_models/entidad';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
 // const URL = '/api/';
const URL = 'http://localhost:8080';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
    providers: [EntidadService]
})

export class OrdersComponent implements OnInit {
  entidades: Array<Entidad>;

  constructor(private entidadService: EntidadService) { 
    this.entidades = new Array<Entidad>();
  }

  ngOnInit() {
    // this.getEntidades();
  }

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  // getEntidades(){
  //   this.entidadService.getAll().subscribe(
  //     data=> this.entidades = data,
  //     error => console.log(error),
  //     () => console.log("finished")
  // )}


}
