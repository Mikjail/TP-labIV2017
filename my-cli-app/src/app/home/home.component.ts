import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/index';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    users= [];  
  
  constructor(private userService : UserService) {}

  ngOnInit() {
      this.userService.getAll()
      .subscribe((usuarios : any) =>{
          this.users= usuarios;  
      });
  }

}
