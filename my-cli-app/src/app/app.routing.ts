import { Routes, RouterModule } from '@angular/router';

import { NavComponent } from './home/index';
import { HomeComponent } from './home/home/index';
import { LoginComponent } from './login/index';
import { UserComponent, USER_RECORDS_ROUTE } from './home/users/index';
import { ProductsComponent, PRODUCT_RECORDS_ROUTE } from './home/products/index';
import { ClientComponent, CLIENT_RECORDS_ROUTE } from './home/client/index';
import { OrderComponent, ORDERS_RECORDS_ROUTE } from './home/orders/index';

import { NoContentComponent } from './no-content/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: 'home', component: NavComponent, canActivate: [AuthGuard], data: { roles: ['admin', 'user']}, children: 
        [
            { path: '', component: HomeComponent, canActivate: [AuthGuard], data: { roles: ['admin']}},

            { path: 'client', component: ClientComponent, canActivate: [AuthGuard], data: { roles: ['admin']}, children:[
                 ...CLIENT_RECORDS_ROUTE
            ]},
            { path: 'orders', component: OrderComponent,  canActivate: [AuthGuard], data: { roles: ['admin', 'user']}, children:[
                ...ORDERS_RECORDS_ROUTE
            ]},
            { path: 'products', component: ProductsComponent, canActivate: [AuthGuard], data: { roles: ['admin']}, children:[
                ...PRODUCT_RECORDS_ROUTE
            ]},
            { path: 'users', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['admin']}, children:[
                ...USER_RECORDS_ROUTE
            ]},
             { path: '**', redirectTo: '' }
        ]},
    { path: 'login', component: LoginComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);