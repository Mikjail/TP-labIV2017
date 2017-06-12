export class Product {
    id: number;
	nombre : string;
    descripcion:string;
    ingredientes: string;
    img: string;
    precio: number;
    cantidad:number;
    id_tipoProducto:string;


    setProductOrder(productOrder){
        this.nombre = productOrder.nombre;
        this.cantidad = productOrder.cantidad;
        this.precio = productOrder.precio;
    }
}
