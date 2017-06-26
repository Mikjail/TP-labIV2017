import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       let currentData: any;
       currentData= localStorage.getItem('currentUser');
       currentData = JSON.parse(currentData);
        switch (state.url) {
            case "/home":
                return this.goHome(route, state);
        
            default:
                return this.goAnother(route, currentData.datosDB);
        }
       
    }

     goHome(route,state){
           if (localStorage.getItem('currentUser')) {
            //  this.router.navigate(['/home'], { queryParams: { returnUrl: state.url }});
             return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
     }

     goAnother(route, user){
        if(route.data.roles.indexOf(user.role) != -1){
            return true;
        }
        this.router.navigate(['/home']);
        return false;
     }
}