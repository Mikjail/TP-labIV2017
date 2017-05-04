import { Component, OnInit } from '@angular/core';
import { EntidadService } from '../../_services/index';
import { Entidad } from '../../_models/entidad';

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
    this.getEntidades();
  }

  getEntidades(){
    this.entidadService.getAll().subscribe(
      data=> this.entidades = data,
      error => console.log(error),
      () => console.log("finished")
  )}
}
