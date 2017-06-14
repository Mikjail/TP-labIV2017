import { Order, ProductoPedido, Product } from '../_models/index';

export class Cliente {
  id: number
  nombre: string
  telefono: string
  calle :string
  altura: string
  localidad : string
  piso :string
  depto:string
  pedidos: Order[];
  foto:string
  pass:string
  
  constructor(){
    this.id= 0;
    this.nombre= "";
    this.telefono= "";
    this.calle = "";
    this.altura = "";
    this.localidad= "";
    this.piso= "";
    this.depto= "";
    this.pedidos = new Array();
    this.foto="";
    this.pass="";
  }
  public setClientNewOrder(){
  }


}