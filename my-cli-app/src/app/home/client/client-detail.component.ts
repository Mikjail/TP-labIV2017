import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PersonaService } from '../../_services/index';
import { Persona } from '../../_models/persona';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client.component.css'],
  providers: [PersonaService]
})

export class DetailClientComponent implements OnInit{
  personas: Array<Persona>;
  nuevo:boolean = false;
  persona: Persona;
  
  constructor( private personaService: PersonaService, private _router: Router ) {
    this.personas = new Array<Persona>();
  }
   ngOnInit() {
    this.getPersonas();
  }

  getFotos(){
    this.personas.forEach(persona => {
        persona.foto = "assets/fotos/"+persona.foto;
    });
  }
  getPersonas(){
    this.personaService.getAll().subscribe(
      data => this.personas = data.personas,
      error => console.log(error),
      () => this.getFotos(),
    );  
  }
  borrar(id){
     this.personaService.delete(id).subscribe(
      data => this.getPersonas(),
      error => console.log("ERROR"),
      () => this.nuevo=false
    )
  }

}