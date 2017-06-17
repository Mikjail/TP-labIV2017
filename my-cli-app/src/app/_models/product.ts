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
        this.cantidad = parseInt(productOrder.cantidad);
        this.precio = parseFloat(productOrder.precio);
    }
}
