import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { ProductsComponent, PRODUCT_RECORDS_ROUTE } from './home/products/index';
import { ClientComponent, CLIENT_RECORDS_ROUTE } from './home/client/index';
import { OrderComponent, ORDERS_RECORDS_ROUTE } from './home/orders/index';

import { NoContentComponent } from './no-content/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: 
        [
            { path: 'client', component: ClientComponent, children:[
                 ...CLIENT_RECORDS_ROUTE
            ]},
            { path: 'orders', component: OrderComponent, children:[
                ...ORDERS_RECORDS_ROUTE
            ]},
            { path: 'products', component: ProductsComponent, children:[
                ...PRODUCT_RECORDS_ROUTE
            ]},
        ]},
    { path: 'login', component: LoginComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);