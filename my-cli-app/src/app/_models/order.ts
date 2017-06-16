import { Cliente } from '../_models/index';
import { Product } from '../_models/index';
import { ProductoPedido } from '../_models/index';


export class Order{
    id: number;
    id_cliente;
    cliente : Cliente;
    productos : Array<Product>;
    cantidad: string;
    fecha : any;
    total: number;
    
    constructor(){
        this.id=0;
        this.cliente = new Cliente();
        this.productos = new Array<Product>();
        this.cantidad = "";
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
    public setPedido(productoPedido: ProductoPedido,clientes:Array<Cliente>,productos: Array<Product>  ){
        this.id = productoPedido.id_pedido;
        this.cantidad= productoPedido.cantidadProducto;
        this.fecha = productoPedido.fecha;
        this.total = productoPedido.total;
        this.productos = new Array<Product>();
        this.setCliente(productoPedido, clientes);
        this.setProducto(productoPedido, productos);
    }

    public setCliente(productoPedido:ProductoPedido, clientes:Array<Cliente>){
          clientes.forEach(element => {
              if(element.id == productoPedido.id_cliente){
                  this.cliente = element;
              }
          });
    }

    public setProducto(productoPedido:ProductoPedido, productos: Array<Product>){
        productos.forEach(element => {
            if(element.id == productoPedido.id_producto ){
                console.log("Reconocio un producto");
                element.cantidad =  element.cantidad + parseInt(productoPedido.cantidadProducto);
                this.productos.push(element);
            }
        });
    }
    
    
}