import { Cliente } from '../_models/index';
import { Product } from '../_models/index';
import { ProductoPedido } from '../_models/index';


export class Order{
    id: number;
    cliente : Cliente;
    productos : Array<Product>;
    cantidad: number;
    fecha : Date;
    total: number;
    
    constructor(){
        this.id=0;
        this.cliente = new Cliente();
        this.productos = new Array<Product>();
        this.cantidad = 0;
        this.fecha = new Date();
        this.total = 0;
    }

    public setPedido(productoPedido: ProductoPedido,clientes:Array<Cliente>,productos: Array<Product>  ){
        this.id = productoPedido.id;
        this.cantidad=  productoPedido.cantidadProducto;
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
                this.productos.push(element);
            }
        });
    }
}