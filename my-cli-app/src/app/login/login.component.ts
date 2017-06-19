import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../_models/index';
import { AlertService, AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    userForm: any = {};
    loading = false;
    returnUrl: string;
    user : User;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { 
            this.user=new User();
        }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.user.nombre = this.userForm.username;
        this.user.password = this.userForm.password;
        this.authenticationService.login(this.user).subscribe(
                data => {
                    let user = data;
                if(typeof user.miToken == 'undefined'){
                    this.alertService.error("El usuario " + this.user.nombre + " o contraseña no existe!"); 
                    this.loading = false;  
                   }else{
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                     localStorage.setItem('currentUser', JSON.stringify(user));
                     this.router.navigate([this.returnUrl]);
                   }
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
