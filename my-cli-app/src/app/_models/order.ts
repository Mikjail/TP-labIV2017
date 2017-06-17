import { Cliente } from '../_models/index';
import { Product } from '../_models/index';
import { ProductoPedido } from '../_models/index';


export class Order{
    id: number;
    id_cliente;
    cliente : Cliente;
    productos : Array<Product>;
    cantidad: number;
    fecha : any;
    total: number;
    
    constructor(){
        this.id=0;
        this.cliente = new Cliente();
        this.productos = new Array<Product>();
        this.cantidad =0;
        this.fecha = "";
        this.total = 0;
        this.id_cliente = "";
    }
    
    
    public totalCompra(productos:Array<Product>){
        this.total=0;
        this.productos = new Array<Product>();
        productos.forEach(element => {
            if(element.cantidad > 0){
            this.total += element.cantidad * element.precio; 
            this.productos.push(element);    
            }   
        });   
        return this.total;  
    }
    
    public setPedido(pedido: any,clientes:Array<Cliente>,productos: Array<Product>){
        this.id = pedido.id;
        this.fecha = pedido.fecha;
        this.total = pedido.total;
        pedido.productos = JSON.parse(pedido.productos);
        this.setCliente(pedido, clientes);
        this.setProducto(pedido, productos);
    }

    public setCliente(pedido:Order, clientes:Array<Cliente>){
          clientes.forEach(element => {
              if(element.id == pedido.id_cliente){
                  this.cliente = element;
              }
          });
    }

    private setProducto(pedido:Order, productos: Array<Product>){
        productos.forEach(productoNuevo => {
           pedido.productos.forEach(productoPedido => {   
               if(productoNuevo.id == productoPedido.id){
                   this.productos.push(productoPedido);
               } 
           });
       });
    }
    
    
}