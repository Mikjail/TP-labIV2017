import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/index';
import { User } from '../../_models/index';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    user:User;  
  
  constructor(private userService : UserService) {}

  ngOnInit() {
    let userData:any;
      userData = JSON.parse(localStorage.getItem('currentUser'));
      this.user =  userData.datosDB;
  }

}
