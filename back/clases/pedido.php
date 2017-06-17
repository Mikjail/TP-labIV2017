<?php
class Pedido
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS (No sé por qué tuve que ponerlos public)
	public $id;
 	public $id_cliente;
    public $productos;
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
	public function getProductos()
	{
		return $this->productos;
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
	public function setProductos($valor)
	{
		$this->productos = $valor;
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

		$sql = "SELECT P.id, P.id_cliente, P.fecha, P.total, P.productos
				FROM pedidos P
				WHERE :id = P.id";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":id", $id, PDO::PARAM_STR);
		$consulta->execute();

		$pedido = $consulta->fetchObject('Pedido');
		return $pedido;
	}

	public static function TraerTodosLosPedidos(){
		$conexion = self::CrearConexion();

		$sql = "SELECT P.id, P.id_cliente, P.fecha, P.total, P.productos
				FROM pedidos P";

		$consulta = $conexion->prepare($sql);
		$consulta->execute();

		$pedidos = $consulta->fetchall(PDO::FETCH_CLASS, 'Pedido');
		return $pedidos;
	}

	public static function Agregar($pedido){
		$conexion = self::CrearConexion();

		$sql = "INSERT INTO pedidos (id_cliente, productos, fecha, total)
				VALUES (:id_cliente, :productos, :fecha, :total)";
				
		$consulta = $conexion->prepare($sql);	
		$consulta->bindValue(":id_cliente", $pedido->id_cliente, PDO::PARAM_INT);
		$consulta->bindValue(":fecha", $pedido->fecha, PDO::PARAM_STR);
		$consulta->bindValue(":productos", json_encode( $pedido->productos), PDO::PARAM_STR);
		$consulta->bindValue(":total", $pedido->total, PDO::PARAM_STR);
		// $consulta->bindValue(":sexo", $pedido->sexo, PDO::PARAM_STR);
		// $consulta->bindValue(":foto", $pedido->foto, PDO::PARAM_STR);
		// $consulta->bindValue(":pass", $pedido->pass, PDO::PARAM_STR)
		$consulta->execute();
		$pedido->id = $conexion->lastInsertId();
		return $pedido->id;
	}

	
	public static function Eliminar($id){
		$conexion = self::CrearConexion();

		$sql = "DELETE FROM pedidos
				WHERE id_pedido = :id";

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