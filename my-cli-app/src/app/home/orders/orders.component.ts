import { Component, OnInit, NgZone, ViewChild, ElementRef, Directive, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { SearchClientByPhone }  from './client-search.component';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Cliente, Order, Product } from '../../_models/index';
import { ClienteService, OrderService, ProductService } from '../../_services/index';

import { AgmCoreModule, MapsAPILoader, GoogleMapsAPIWrapper } from "angular2-google-maps/core";
import { DirectionsMapDirective } from './googlr-map.directive';


declare var google:any;
declare var jQuery:any;
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrderService, ClienteService, SearchClientByPhone, ProductService, GoogleMapsAPIWrapper]
})



export class OrderComponent implements OnInit {
 
    @ViewChild("pickupInput")
    public pickupInputElementRef: ElementRef;

     @ViewChild("pickupOutput")
    public pickupOutputElementRef: ElementRef;

     @ViewChild("scrollMe")
    private scrollContainer: ElementRef;
     
     @ViewChild(DirectionsMapDirective) vc: DirectionsMapDirective;
  
  public fromAdress = "Amenábar 922, Buenos Aires, Argentina"
  public clientes: Array<Cliente>;
  public orders: Array<Order>;
  public cliente: Cliente;
  public status:String = "buscar";
  public selectedClient: Cliente;
  public mapClient: any;
  public productos : Array<Product>;
  public publicnewOrder : Order;
  public tipos = [ { 'id' : 1, 'nombre':'arepaMaiz'},
                   { 'id' : 2, 'nombre': 'arepaTrigo'}, 
                   { 'id' : 3, 'nombre': 'empanada'},
                   { 'id' : 4, 'nombre':'tequeños'},
                   { 'id' : 5, 'nombre':'salsa'},
                   { 'id' : 6, 'nombre':'postre'}];

  options =  [0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];          
  public newOrder: Order;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  public origin :any ; // its a example aleatory position
  public destination : any; // its a example aleatory position
  public estimatedTime: any;
  public estimatedDistance: any;
  public destinationInput: FormControl;
  public destinationOutput: FormControl;

  constructor(private orderService: OrderService,
  private clienteService: ClienteService, 
  private productServices: ProductService,
  private mapsAPILoader: MapsAPILoader,
  private ngZone: NgZone,
  private gmapsApi: GoogleMapsAPIWrapper,
  private _elementRef : ElementRef,
  private _router: Router) {}

  ngOnInit() {
    this.clientes = new Array<Cliente>();
    this.cliente = new Cliente();
    this.selectedClient = new Cliente();
    this.productos = new Array<Product>();
    this.newOrder = new Order;
    this.getClientes();
    
        this.zoom = 15;
        this.latitude = 50;
        this.longitude = 7;

      // this.mapCustomStyles = this.getMapCusotmStyles();
      //create search FormControl
      this.destinationOutput = new FormControl();
      
        this.setCurrentPosition();

         
      //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
          // let autocompleteInput = new google.maps.places.Autocomplete(this.pickupInputElementRef.nativeElement, {
          //   types: ["address"]
          // });
          let autocompleteOutput = new google.maps.places.Autocomplete(this.pickupOutputElementRef.nativeElement, {
            types: ["address"]
          });
                // console.log(autocompleteInput);
                //  this.setupPlaceChangedListener(autocompleteInput, 'ORG');
                this.setupPlaceChangedListener(autocompleteOutput, 'DES');
      });
  }
   
   
    private setupPlaceChangedListener(autocomplete: any, mode: any ) {
      autocomplete.addListener("place_changed", () => {
            this.ngZone.run(() => {
              //get the place result
              let place = autocomplete.getPlace();
              //verify result
              if (place.geometry === undefined) {
                return;
              } 

                console.log(place); 
                let adress = place.name.split(" ");
                this.cliente.localidad= place.vicinity;
                this.cliente.calle=adress[0];
                this.cliente.altura= adress[1];

              if (mode != 'ORG') {
                  //Origen de Amenabar 926, Buenos Aires, Argetina. (LOCAL)
                  this.vc.origin = { longitude: -58.44851799999998, latitude: -34.571228 }; 
                  this.vc.originPlaceId = "ChIJVc7TfMS1vJURgQb4fhCq1uU";
                  this.vc.destination = { longitude: place.geometry.location.lng(), latitude: place.geometry.location.lat() }; // its a example aleatory position
                  this.vc.destinationPlaceId = place.place_id;
              }   
              if(this.vc.directionsDisplay === undefined){ this.mapsAPILoader.load().then(() => { 
                    this.vc.directionsDisplay = new google.maps.DirectionsRenderer;
                  }); 
            }
          
              //Update the directions
              this.vc.updateDirections();
              this.zoom = 12;
            });

         });

    }

    getDistanceAndDuration(){
      this.estimatedTime = this.vc.estimatedTime;
      this.estimatedDistance = this.vc.estimatedDistance;
    }

    scrollToBottom(): void {
      jQuery('html, body').animate({ scrollTop: jQuery(document).height() }, 3000);
    }
    private setPickUpLocation( place:any ) {
      //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;
    }

    private setCurrentPosition() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          this.zoom = 12;
        });
      }
    }

    private getMapCusotmStyles() {
      // Write your Google Map Custom Style Code Here.
    }

   getClientes(){
    this.clienteService.getAll().subscribe(
      data => this.clientes=data.clientes,
      error => console.log(error),
      () => this.getProducts()
    );  
  }

  getProducts(){
    this.productServices.getAll().subscribe(
      data => this.productos = data.productos,
      error => console.log(error),
      () => console.log("finished")
    );  
  }

  onSelect(cliente:Cliente){
    this.selectedClient = cliente;
     this.mapClient= cliente.calle +" "+ cliente.altura + ", Buenos Aires, Argentina";
  }

  setClientes(id){
    console.log(id);
    this.clientes.forEach(element => {
      if(element.id == id){
        this.cliente = element;
      }
    });
  }
  
  
  showTipoProduct(id){
    let tipoP="";
    this.tipos.forEach(element => {
      if(element.id == id ){
        tipoP = element.nombre;
      }
    });
    return tipoP;
  }


  chageStatus(status){
    switch(status){
      case "nuevo":
        this.status= status;
        break;

      case "pedir":
        this.status= status;
        break;
      
      default : 
        this.status = status;
    }
  }
  


  reloadPage(){

    this._router.navigateByUrl('home').then(()=>{
      this.status="buscar";
    })
    
  }
   submitForm(){
    this.clienteService.create(this.cliente).subscribe(
      data => console.log(data),
      error => console.log("ERROR"),
      () => console.log("finished")
    )
  }

  submitOrder(productos: Array<Product>){
      this.newOrder.id_cliente = this.selectedClient.id;
      this.newOrder.fecha = new Date().toLocaleDateString();
     console.log(this.newOrder);
      this.orderService.create(this.newOrder).subscribe(
        data => console.log(data),
        error => console.log("error"),
        () => this.reloadPage()
      )
  }
}
