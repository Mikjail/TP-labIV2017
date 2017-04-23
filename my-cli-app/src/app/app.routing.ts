import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { OrdersComponent } from './home/orders/index';
import { ProductsComponent } from './home/products/index';
import { NoContentComponent } from './no-content/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    // { path: 'home', component: HomeComponent, children: 
    //     [
    //         { path: 'client', component: ClientComponent },
    //         { path: 'orders', component: OrdersComponent},
    //         { path: 'products', component: ProductsComponent},
    //     ]
    // },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: 
        [
            { path: 'client', component: ClientComponent, children:[
                {
                    path:"new", component: NewClientComponent
                }
            ]},
            { path: 'orders', component: OrdersComponent},
            { path: 'products', component: ProductsComponent},
        ]},
    { path: 'login', component: LoginComponent },
 // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
    // { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);