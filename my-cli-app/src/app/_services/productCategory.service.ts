import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Product } from '../_models/index';
import { ProductCategory } from '../_models/index';

@Injectable()
export class ProductCategoryService {
    //url = 'http://localhost:8080';
    url = 'http://www.cambur-pinton.com/admin/back';
        
    constructor(private _http: Http) { }

    getAll() {
        return this._http.get(this.url + '/tipoproducto', this.jwt()).map((response: Response) => response.json());
    }

    getById(id: number) {
        return this._http.get(this.url +'/tipoproducto/' + id, this.jwt()).map((response: Response) => response.json());
    }

    create(productCategory: ProductCategory) {
        return this._http.post(this.url +'/tipoproducto', productCategory, this.jwt()).map((response: Response) => response.json());
    }

    update(productCategory: ProductCategory) {
        return this._http.put(this.url +'/tipoproducto', productCategory, this.jwt()).map((response: Response) => response.json());
    }

    delete(id: number) {
        return this._http.delete('/tipoproducto/' + id, this.jwt()).map((response: Response) => response.json());
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
