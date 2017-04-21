import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { OrdersComponent } from './orders/index';
import { NoContentComponent } from './no-content/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, children: 
        [
            { path: 'products', loadChildren: 'app/products/products.module#ClientModule'},
            { path: 'orders', component: OrdersComponent},
            { path: 'client', loadChildren: 'app/client/client.module#ClientModule'},
        ]
    },
//     { path: '', component: HomeComponent, canActivate: [AuthGuard], children: 
//         [
//             { path: 'products', loadChildren: 'app/products/products.module#ClientModule'},
//             { path: 'orders', loadChildren: 'app/orders/orders.module#ClientModule'},
//             { path: 'client', loadChildren: 'app/client/client.module#ClientModule'},
//         ]},
//     { path: 'login', component: LoginComponent },
//  // otherwise redirect to home
//     //{ path: '**', redirectTo: '' }
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);