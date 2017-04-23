import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { User } from '../_models/index';

@Injectable()
export class ProductService {
    url = 'http://localhost:8080';
        
    constructor(private _http: Http) { }

    getAll() {
        return this._http.get(this.url + '/productos', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this._http.get('/productos/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(user: User) {
        return this._http.post('/productos', user, this.jwt()).map((response: Response) => response.json());
    }

    update(user: User) {
        return this._http.put('/productos/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this._http.delete('/productos/' + id, this.jwt()).map((response: Response) => response.json());
    }
// private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
