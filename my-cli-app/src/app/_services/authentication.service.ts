import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(usuario) {
        // let url = 'https://plusvibestudio-mikjail.c9users.io/back/index.php';
        //let url = 'http://localhost:8080';
        let url = 'http://www.cambur-pinton.com/admin/back';
         console.log(usuario);
         //let url = 'http://localhost/proyectos/plusvibestudio/TPlaboratorioIV2016/back/index.php';
         let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'); 
        return this.http.post(url + '/auth/login', usuario,{headers: headers}).map((response :any) =>response.json()); 
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}