import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ClienteService } from '../../_services/index';
import { Cliente } from '../../_models/index';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ClienteService]
})

export class DetailClientComponent implements OnInit{
  clientes: Array<Cliente>;
  nuevo:boolean = false;
  cliente: Cliente;
  
  constructor( private clienteService: ClienteService, private _router: Router ) {
    this.clientes = new Array<Cliente>();
  }
   ngOnInit() {
    this.getPersonas();
  }

  getPersonas(){
    this.clienteService.getAll().subscribe(
      data => this.clientes = data.clientes,
      error => console.log(error),
      () => this.getFotos(),
    );  
  }
  
  getFotos(){
    this.clientes.forEach(persona => {
        persona.foto = "assets/fotos/"+persona.foto;
    });
  }
  borrar(id){
     this.clienteService.delete(id).subscribe(
      data => this.getPersonas(),
      error => console.log("ERROR"),
      () => this.nuevo=false
    )
  }

}