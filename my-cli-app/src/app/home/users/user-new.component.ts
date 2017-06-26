import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/index';
import { User } from '../../_models/index';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css'],
  providers: [UserService]
})

export class NewUserComponent implements OnInit {
  public submitted:boolean;
  user:User;
  userForm: FormGroup;
  constructor(private _fb:FormBuilder, private userService: UserService) {
    this.user = new User();
    this.userForm = this._fb.group({
      'nombre' : ['',[<any>Validators.required]],
      'apellido' : ['',[<any>Validators.required]],
      'password' :  ['',[<any>Validators.required]],
      'email' :  ['',[<any>Validators.required]],
      'role' : ['',[<any>Validators.required]],
      'sexo': ['',[<any>Validators.required]]
   })
  }


   ngOnInit() {
  }


   submitForm(user, params:boolean){
    this.submitted = true;
    console.log(user);
    this.userService.create(user).subscribe(
      data => console.log(data),
      error => console.log("ERROR"),
      () => console.log("finished")
    )
  }

 
}
