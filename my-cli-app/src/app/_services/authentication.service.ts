import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(nombre: string, password: string) {
        // let url = 'https://plusvibestudio-mikjail.c9users.io/back/index.php';
        let url = 'localhost:8080';
         
         //let url = 'http://localhost/proyectos/plusvibestudio/TPlaboratorioIV2016/back/index.php';
         let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'); 
        return this.http.post(url + '/auth/login', JSON.stringify({ nombre: nombre, password: password }),{
        headers: headers
        }).map((response :any) => {
                let data = response.json();
                console.log(data);
                let user = response;
                console.log(JSON.parse(user._body));
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    console.log(user);
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}