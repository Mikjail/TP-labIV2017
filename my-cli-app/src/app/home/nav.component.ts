import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/index';
import { User } from '../_models/index';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
    user:User;  
  
  constructor(private userService : UserService) {}

  ngOnInit() {
    let userData:any;
      userData = JSON.parse(localStorage.getItem('currentUser'));
      this.user =  userData.datosDB;
  }

}
