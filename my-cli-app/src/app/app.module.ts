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

import { ClientComponent, NewClientComponent, DetailClientComponent } from './home/client/index';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

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
    NewClientComponent,
    DetailClientComponent
    ],
  imports: [AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    FileUploadModule
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
