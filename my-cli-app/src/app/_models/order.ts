import { Cliente } from '../_models/index';
import { Product } from '../_models/index';

export class Order{
    id: number;
    cliente: Cliente;
    producto : Product;
    fecha : Date;
    total: number;

    constructor(orders){
        this.id= orders.id;
        this.producto = new Product();
        this.producto.setProductOrder(orders);
        this.cliente = new Cliente();
        this.cliente.setClientOrder(orders);
        this.fecha = orders.fecha;
        this.total = orders.total; 
    }
}