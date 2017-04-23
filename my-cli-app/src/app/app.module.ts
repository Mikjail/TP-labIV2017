import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AlertModule } from 'ng2-bootstrap';
import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService, ProductService  } from './_services/index';

import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';
import { NoContentComponent } from './no-content/index';
import { LoginComponent } from './login/index';
import { ProductsComponent } from './home/products/products.component';
import { OrdersComponent } from './home/orders/orders.component';
import { ClientComponent } from './home/client/client.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoContentComponent,
    RegisterComponent,
    LoginComponent,
    OrdersComponent,
    ProductsComponent,
    ClientComponent
    ],
  imports: [AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthGuard, 
    AuthenticationService,
    UserService,
    ProductService
    ],
  bootstrap: [AppComponent ]
})
export class AppModule { }
