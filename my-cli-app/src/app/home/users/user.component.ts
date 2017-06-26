import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/index';
import { User } from '../../_models/index';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    

  
  constructor(private userService: UserService) {
    
   }
   ngOnInit() {
  }
}
