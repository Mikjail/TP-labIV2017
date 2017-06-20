<?php
class Persona
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS (No sé por qué tuve que ponerlos public)
	public $id;
 	public $nombre;
  	public $apellido;
  	public $telefono;
  	public $foto;
	// public $sexo;
	public $pass;
//--------------------------------------------------------------------------------//

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
	public function GetApellido()
	{
		return $this->apellido;
	}
	public function GetTelefono()
	{
		return $this->telefono;
	}
	public function GetFoto()
	{
		return $this->foto;
	}
	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
	public function SetApellido($valor)
	{
		$this->apellido = $valor;
	}
	public function SetTelefono($valor)
	{
		$this->telefono = $valor;
	}
		public function SetFoto($valor)
	{
		$this->foto = $valor;
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
	public static function TraerUnaPersonaPorId($id){
		$conexion = self::CrearConexion();

		$sql = "SELECT P.id, P.nombre, P.apellido, P.telefono, P.foto, P.pass
				FROM personas P
				WHERE P.id = :id";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":id", $id, PDO::PARAM_INT);
		$consulta->execute();

		$persona = $consulta->fetchObject('Persona');
		return $persona;
	}

	public static function TraerTodasLasPersonas(){
		$conexion = self::CrearConexion();

		$sql = "SELECT P.id, P.nombre, P.apellido, P.telefono, P.foto, P.pass
				FROM persona P";

		$consulta = $conexion->prepare($sql);
		$consulta->execute();

		$personas = $consulta->fetchall(PDO::FETCH_CLASS, 'Persona');
		return $personas;
	}

	public static function Agregar($persona){
		$conexion = self::CrearConexion();

		$sql = "INSERT INTO persona (nombre, apellido, telefono, foto, pass)
				VALUES (:nombre, :apellido, :telefono, :foto, :pass)";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":nombre", $persona->nombre, PDO::PARAM_STR);
		$consulta->bindValue(":apellido", $persona->apellido, PDO::PARAM_STR);
		$consulta->bindValue(":telefono", $persona->telefono, PDO::PARAM_STR);
		// $consulta->bindValue(":sexo", $persona->sexo, PDO::PARAM_STR);
		$consulta->bindValue(":foto", $persona->foto, PDO::PARAM_STR);
		$consulta->bindValue(":pass", $persona->pass, PDO::PARAM_STR);
		$consulta->execute();

		$idAgregado = $conexion->lastInsertId();
		return $idAgregado;
	}

	public static function Modificar($persona){
		$conexion = self::CrearConexion();

		$sql = "UPDATE personas
				SET nombre = :nombre, apellido = :apellido, telefono = :telefono, foto = :foto, pass = :pass
				WHERE id = :id"; //, password = :pass

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":nombre", $persona->nombre, PDO::PARAM_STR);
		$consulta->bindValue(":apellido", $persona->apellido, PDO::PARAM_STR);
		$consulta->bindValue(":telefono", $persona->telefono, PDO::PARAM_STR);
		// $consulta->bindValue(":sexo", $persona->sexo, PDO::PARAM_STR);
		$consulta->bindValue(":foto", $persona->foto, PDO::PARAM_STR);
		$consulta->bindValue(":pass", $persona->password, PDO::PARAM_STR);
		$consulta->bindValue(":id", $persona->id, PDO::PARAM_INT);
		$consulta->execute();

		$cantidad = $consulta->rowCount();
		return $cantidad;
	}

	public static function Eliminar($id){
		$conexion = self::CrearConexion();

		$sql = "DELETE FROM persona
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
			// $conexion = new PDO("mysql:host=localhost;dbname=camburpinton;charset=utf8;",'root','');
				$conexion = new PDO("mysql:host=localhost;dbname=camburpinton;charset=utf8;",'mikjail','Juli.1012');
			
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