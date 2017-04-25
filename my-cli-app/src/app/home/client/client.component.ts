import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  constructor(private router:Router) { }

  ngOnInit() {
  }

  mostrarNombre(){
    console.log(this.nombre);
  }

  newClient(){
      this.router.navigate(["./client/newClient"]);
  }
}
