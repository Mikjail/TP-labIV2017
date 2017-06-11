import { Component, OnInit } from '@angular/core';
import {Pipe, PipeTransform,Injectable } from '@angular/core';

@Pipe({
    name: 'searchClient'
})
@Injectable()
export class SearchClient implements PipeTransform{
    // Transform is the new "return function(value, args)" in Angular 1.x
    transform(items: any[], field:string, value:String) {
    if(!items) return [];
    console.log(value);
    return items.filter(it => it[field].toLowerCase().indexOf(value)!== -1);
  }

}

