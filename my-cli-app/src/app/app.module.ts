import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AlertModule } from 'ng2-bootstrap';
import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService  } from './_services/index';

import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/index';
import { NoContentComponent } from './no-content/index';
import { LoginComponent } from './login/index';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NoContentComponent,
    LoginComponent,
    ProductsComponent,
    OrdersComponent
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
    UserService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
