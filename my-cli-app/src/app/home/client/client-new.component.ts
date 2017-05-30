import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { PersonaService } from '../../_services/index';
import { Persona } from '../../_models/persona';
const URL = 'http://localhost:8080/filesPerson';

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ PersonaService ]
})

export class NewClientComponent implements OnInit{
  personas: Array<Persona>;
  nuevo:boolean = false;
  public personasForm: FormGroup;
  persona: Persona;
  sexo: Array<any> = ['m', 'f']

  public uploader:FileUploader = new FileUploader({url: URL});
  public hasAnotherDropZoneOver:boolean = false;

  constructor(private _fb:FormBuilder, private personaService: PersonaService, private _router: Router ) {
    this.personas = new Array<Persona>();
    this.persona = new Persona();
     this.personasForm = this._fb.group({
      'nombre' : ['',[<any>Validators.required,<any>Validators.minLength(5)]],
      'apellido':  ['',[<any>Validators.required,<any>Validators.minLength(5)]],
      'telefono' :  ['',[<any>Validators.required]],
      'pass' :  ['',[<any>Validators.required]]
      
    })
   }

  ngOnInit() {
  }

   public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  

   submitForm(){
    this.persona.foto = "img/personas/"+this.uploader.queue[0]._file.name;
    console.log(this.persona.foto);
    this.personaService.create(this.persona).subscribe(
      data => console.log(data),
      error => console.log("ERROR"),
      () => console.log("finished")
    )
  }

}