import { Component, OnInit } from '@angular/core';
import {Pipe, PipeTransform,Injectable } from '@angular/core';

// @Pipe({
//     name: 'searchClientByName'
// })
// @Injectable()
// export class SearchClientByName implements PipeTransform{
//     // Transform is the new "return function(value, args)" in Angular 1.x
//     transform(items: any[], field:string, value:String) {
//     if(!items) return [];
//     console.log(value);
//     return items.filter(it => it[field].toLowerCase().indexOf(value)!== -1);
//   }

// }

@Pipe({
    name: 'searchClientByPhone'
})
@Injectable()
export class SearchClientByPhone implements PipeTransform{
    // Transform is the new "return function(value, args)" in Angular 1.x
    transform(items: any[], field:string, value:String) {
    if(!items) return [];
    return items.filter(it => it[field].toLowerCase().indexOf(value)!== -1);
  }

}


