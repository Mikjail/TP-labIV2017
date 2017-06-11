import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Persona } from '../_models/index';

@Injectable()
export class OrderService {

    url = 'http://localhost:8080';
    
   constructor(private _http: Http) { }
   
    getAll(){
        console.log("entro a request pedido")
        return this._http.get(this.url +'/pedido', this.jwt()).map((response: Response) => response.json());
    }
   getById(id: number) {
        return this._http.get(this.url +'/pedido/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(persona: Persona) {
        return this._http.post(this.url +'/pedido', persona, this.jwt()).map((response: Response) => response.json());
    }

    update(persona: Persona) {
        return this._http.put(this.url +'/pedido', persona, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        console.log(id);
        return this._http.delete(this.url +'/pedido/' + id, this.jwt()).map((response: Response) => response.json());
    }
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}