import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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

import { ProductsComponent, DetailProductsComponent, NewProductsComponent, ListProductsComponent } from './home/products/index';

import { OrdersComponent } from './home/orders/orders.component';

import { ClientComponent } from './home/client/client.component';
import { NewClientComponent } from './home/client/client-new.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoContentComponent,
    RegisterComponent,
    LoginComponent,
    OrdersComponent,
    ProductsComponent,
    NewProductsComponent,
    ListProductsComponent,
    DetailProductsComponent,
    ClientComponent,
    NewClientComponent
    ],
  imports: [AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [
    AuthGuard, 
    AuthenticationService,
    UserService,
    ProductService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
