<?php
class Pedido
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS (No sé por qué tuve que ponerlos public)
	public $id;
 	public $id_cliente;
    public $nombreProducto;
    public $cantidadProducto;
    public $precioProducto;
    public $fecha;
    public $total;
//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS

#GETTERS

	public function GetId()
	{
		return $this->id;
	}
	public function getId_cliente()
	{
		return $this->id_cliente;
	}
	public function GetNombreProducto()
	{
		return $this->nombreProducto;
	}
    public function GetCantidadProducto()
	{
		return $this->cantidadProducto;
	}
    public function GetPrecioProducto()
	{
		return $this->precioProducto;
	}
	public function GetFecha()
	{
		return $this->fecha;
	}
	public function GetTotal()
	{
		return $this->total;
	}

#SETTERS

	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetId_cliente($valor)
	{
		$this->id_cliente = $valor;
	}
	public function SetNombreProducto($valor)
	{
		$this->nombreProducto = $valor;
	}
    public function SetCantidadProducto($valor)
	{
		$this->cantidadProducto = $valor;
	}
     public function SetPrecioProducto($valor)
	{
		$this->precioProducto = $valor;
	}
	public function SetFecha($valor)
	{
		$this->fecha = $valor;
	}
		public function SetTotal($valor)
	{
		$this->total = $valor;
	}

//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id !== NULL){
			$obj = self::TraerUnaPersonaPorId($id);
			$this->id = $obj->GetId();
			$this->nombre = $obj->GetNombre();
			$this->apellido = $obj->GetApellido();
			$this->telefono = $obj->GetTelefono();
			$this->foto = $obj->GetFoto();
		}
	}

//--------------------------------------------------------------------------------//
//--TOSTRING	
  	public function ToString()
	{
	  	return $this->id." - ".$this->nombre." - ".$this->apellido." - ".$this->telefono." - ".$this->foto."\r\n";
	}
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnPedidoPorId($id){
		$conexion = self::CrearConexion();

		$sql = "SELECT O.id, O.cantidad as cantidadProducto, 
		P.nombre as nombreProducto, P.precio as precioProducto, 
		Pe.id_cliente, Pe.fecha, Pe.total, C.nombre as nombreCliente,
	    C.calle, C.altura, C.piso, C.depto, C.telefono, c.localidad
				FROM producto_pedido O
                INNER JOIN productos P
                ON P.id = O.id_producto
                INNER JOIN pedidos Pe
                ON Pe.id = O.id_pedido
				INNER JOIN clientes C
				ON Pe.id_cliente = C.id
				WHERE O.id = :id";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":id", $id, PDO::PARAM_INT);
		$consulta->execute();

		$pedido = $consulta->fetchObject('Pedido');
		return $pedido;
	}

	public static function TraerTodosLosPedidos(){
		$conexion = self::CrearConexion();

		$sql = "SELECT O.id, O.id_pedido, O.cantidad as cantidadProducto, 
		O.id_producto, Pe.id_cliente, Pe.fecha, Pe.total
				FROM producto_pedido O
                INNER JOIN pedidos Pe
                ON Pe.id = O.id_pedido
				INNER JOIN clientes C";

		$consulta = $conexion->prepare($sql);
		$consulta->execute();

		$pedidos = $consulta->fetchall(PDO::FETCH_CLASS, 'Pedido');
		return $pedidos;
	}

	public static function Agregar($pedido){
		$conexion = self::CrearConexion();

		$sql = "INSERT INTO pedidos (id_cliente, fecha, total)
				VALUES (:id_cliente, :fecha, :total)";


		$consulta = $conexion->prepare($sql);

		$consulta->bindValue(":id_cliente", $pedido->id_cliente, PDO::PARAM_INT);
		$consulta->bindValue(":fecha", $pedido->fecha, PDO::PARAM_STR);
		$consulta->bindValue(":total", $pedido->total, PDO::PARAM_STR);
		// $consulta->bindValue(":sexo", $pedido->sexo, PDO::PARAM_STR);
		// $consulta->bindValue(":foto", $pedido->foto, PDO::PARAM_STR);
		// $consulta->bindValue(":pass", $pedido->pass, PDO::PARAM_STR)
		$consulta->execute();
		$pedido->id = $conexion->lastInsertId();

		foreach($pedido->productos as $productoPedido){
				$sql = "INSERT INTO producto_pedido (id_pedido, id_producto, cantidad)
					VALUES (:id_pedido, :id_producto, :cantidad)";
					
			$consulta = $conexion->prepare($sql);
			$consulta->bindValue(":id_pedido", $pedido->id, PDO::PARAM_INT);
			$consulta->bindValue(":id_producto", $productoPedido->id, PDO::PARAM_INT);
			$consulta->bindValue(":cantidad", $productoPedido->cantidad, PDO::PARAM_INT);
			$consulta->execute();
		}
		return $pedido->id;
	}

	
	public static function Eliminar($id){
		$conexion = self::CrearConexion();

		$sql = "DELETE FROM producto_pedido
				WHERE id_pedido = :id";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":id", $id, PDO::PARAM_INT);
		$consulta->execute();

		$sql = "DELETE FROM pedidos
				WHERE id = :id";
		
		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":id", $id, PDO::PARAM_INT);
		$consulta->execute();

		$cantidad = $consulta->rowCount();
		return $cantidad;
	}

	public static function CrearConexion(){
		try
		{
			//$conexion = new PDO("mysql:host=0.0.0.0;dbname=c9;charset=utf8;",'mikjail','');
			$conexion = new PDO("mysql:host=localhost;dbname=camburpinton;charset=utf8;",'root','');
			
			return $conexion;
		}
		catch (Exception $e) {
			print_r("Error: " . $e->GetMessage());
			die();
			return;
		}
	}
//--------------------------------------------------------------------------------//
}
?>