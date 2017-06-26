import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/index';
import { User } from '../../_models/index';


@Component({
  selector: 'app-user',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user.component.css']
})
export class UserListComponent implements OnInit {
    
  users:Array<User>;
  
  constructor(private userService: UserService) {
    this.users = new Array<User>();
   }
   ngOnInit() {
    this.getUsers();
  }

  getUsers(){
      this.userService.getAll().subscribe(
      data => this.users = data.usuarios,
      error => console.log(error),
      () => console.log("finished")
    );  

  }
  
  userBorrar(id){
  this.userService.delete(id).subscribe(
      data => console.log(data),
      error => console.log("ERROR"),
      () => this.getUsers()
    )
  }
}
