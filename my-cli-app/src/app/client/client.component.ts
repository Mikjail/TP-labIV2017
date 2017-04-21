import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  
  nombre:string;
  mostrar:boolean;
  numero:number=0;
  foto:string="assets/juli.jpg"
  constructor() { }

  ngOnInit() {
  }

  mostrarNombre(){
    console.log(this.nombre);
  }
}
