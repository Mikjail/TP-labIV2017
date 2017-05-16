<?php
class TipoProducto
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id;
 	public $nombre;

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS
	public function GetId()
	{
		return $this->id;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
    	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}

    
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id !== NULL){
			$obj = self::TraerUnProductoPorId($id);
			$this->id = $obj->GetId();
			$this->nombre = $obj->GetNombre();
        }
	}
//--------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------//
//--METODO DE CLASE
	public static function TraerUnTipoProductoPorId($id){
		require_once "connection.php";
        $conexion = Connection::CrearConexion();

		$sql = "SELECT T.id, T.nombre
				FROM tipoproductos T
				WHERE T.id = :id";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":id", $id, PDO::PARAM_INT);
		$consulta->execute();

		$tipoproductos = $consulta->fetchObject('TipoProducto');
		return $tipoproductos;
	}
    public static function TraerTodosLosTipoProductos(){
        require_once "connection.php";
		$conexion = Connection::CrearConexion();

		$sql = "SELECT T.id, T.nombre
				FROM tipoproductos T";

		$consulta = $conexion->prepare($sql);
		$consulta->execute();

		$tipoproductos = $consulta->fetchall(PDO::FETCH_CLASS, 'TipoProducto');
		return $tipoproductos;
	}
    	public static function Agregar($producto){
		$conexion = self::CrearConexion();

		$sql = "INSERT INTO productos (nombre)
				VALUES (:nombre)";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":nombre", $producto->nombre, PDO::PARAM_STR);
		$consulta->execute();

		$idAgregado = $conexion->lastInsertId();
		return $idAgregado;
        
        }       
}