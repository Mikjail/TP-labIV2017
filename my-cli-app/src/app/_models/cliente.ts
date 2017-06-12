export class Cliente {
  id: number
  nombre: string
  telefono: string
  calle :string
  altura: string
  localidad : string
  piso :string
  depto:string
  service: string
  foto:string
  pass:string
  
  setClientOrder(orderClient){
    this.id = orderClient.id;
    this.nombre = orderClient.nombreCliente;
    this.calle = orderClient.calle;
    this.altura = orderClient.altura;
    this.piso = orderClient.piso;
    this.depto = orderClient.depto;
    this.telefono = orderClient.telefono;
    this.localidad = orderClient.localidad;
  }
}