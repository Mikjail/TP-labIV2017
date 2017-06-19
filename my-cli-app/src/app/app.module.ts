import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AlertModule } from 'ng2-bootstrap';
import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService, ProductService, AlertService  } from './_services/index';

import { routing } from './app.routing';
import { AlertComponent } from './_directives/index';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/index';
import { HomeComponent } from './home/index';
import { NoContentComponent } from './no-content/index';
import { LoginComponent } from './login/index';

import { ProductsComponent, DetailProductsComponent, NewProductsComponent, ListProductsComponent } from './home/products/index';
import { OrderComponent, ListOrdersComponent, SearchClientByPhone, DirectionsMapDirective } from './home/orders/index';
import { ClientComponent, NewClientComponent, DetailClientComponent } from './home/client/index';

import { AgmCoreModule } from "angular2-google-maps/core";
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoContentComponent,
    RegisterComponent,
    AlertComponent,
    LoginComponent,
    OrderComponent,
    ListOrdersComponent,
    ProductsComponent,
    NewProductsComponent,
    ListProductsComponent,
    DetailProductsComponent,
    ClientComponent,
    NewClientComponent,
    DetailClientComponent,
    SearchClientByPhone,
    DirectionsMapDirective
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyC9qoUtPZFr24eqjQ0Lfhf4HXUMg_T85CU",
      libraries: ["places"]
    })
  ],
  providers: [
    AuthGuard, 
    AuthenticationService,
    UserService,
    ProductService,
    AlertService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
