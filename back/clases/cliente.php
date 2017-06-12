<?php
class Cliente
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS (No sé por qué tuve que ponerlos public)
	public $id;
 	public $nombre;
 	public $email;
  	public $telefono;
    public $calle;
    public $altura;
    public $piso;
    public $depto;
    public $localidad;
	// public $sexo;
	public $pass;
//--------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------//
//--GETTERS Y SETTERS

#GETTERS
	public function GetId()
	{
		return $this->id;
	}
	public function GetNombre()
	{
		return $this->nombre;
	}
	
    public function GetEmail()
	{
		return $this->email;
	}
	public function GetTelefono()
	{
		return $this->telefono;
	}
    public function GetCalle()
	{
		return $this->calle;
	}
    public function GetAltura()
	{
		return $this->altura;
	}
     public function GetPiso()
	{
		return $this->piso;
	}
    public function GetDepto()
	{
		return $this->depto;
	}
    public function GetLocalidad()
	{
		return $this->localidad;
	}
    public function GetPass()
	{
		return $this->pass;
	}

#SETTERS
	public function SetId($valor)
	{
		$this->id = $valor;
	}
	public function SetNombre($valor)
	{
		$this->nombre = $valor;
	}
    public function SetEmail($valor)
	{
		$this->email = $valor;
    }
	public function SetTelefono($valor)
	{
		$this->telefono = $valor;
    }
	public function SetCalle($valor)
	{
		$this->calle = $valor;
	}
	public function SetAltura($valor)
	{
		$this->altura = $valor;
	}
   	public function SetPiso($valor)
	{
		$this->piso = $valor;
	}
   	public function SetDepto($valor)
	{
		$this->depto = $valor;
	}
    public function SetLocalidad($valor)
	{
		$this->localidad = $valor;
	}
    public function SetPass($valor)
	{
		$this->pass = $pass;
	}
 
//--------------------------------------------------------------------------------//
//--CONSTRUCTOR
	public function __construct($id=NULL)
	{
		if($id !== NULL){
			$obj = self::TraerUnaPersonaPorId($id);
			$this->id = $obj->GetId();
			$this->nombre = $obj->GetNombre();
            $this->email = $obj->GetEmail();
			$this->telefono = $obj->GetTelefono();
            $this->calle = $obj->GetCalle();
            $this->altura = $obj->GetAltura();
            $this->piso = $obj->GetPiso();
            $this->depto = $obj->GetDepto();
            $this->localidad = $obj->GetLocalidad();
			$this->foto = $obj->GetFoto();
            $this->pass = $obj->GetPass();
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
	public static function TraerUnClientePorId($id){
		$conexion = self::CrearConexion();

		$sql = "SELECT C.id, C.nombre, C.telefono, C.calle, C.altura, C.piso, C.depto, C.localidad
				FROM clientes C
				WHERE C.id = :id";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":id", $id, PDO::PARAM_INT);
		$consulta->execute();

		$cliente = $consulta->fetchObject('Cliente');
		return $cliente;
	}

	public static function TraerTodosLosClientes(){
		$conexion = self::CrearConexion();

		$sql = "SELECT  C.id, C.nombre, C.telefono, C.calle, C.altura, C.piso, C.depto, C.localidad
				FROM clientes C";

		$consulta = $conexion->prepare($sql);
		$consulta->execute();

		$clientes = $consulta->fetchall(PDO::FETCH_CLASS, 'Cliente');

		return $clientes;
	}

	public static function Agregar($cliente){
		$conexion = self::CrearConexion();

		$sql = "INSERT INTO clientes (nombre, telefono, calle, altura, piso, depto, localidad)
				VALUES ( :nombre, :telefono, :calle, :altura, :piso, :depto, :localidad)";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":nombre", $cliente->nombre, PDO::PARAM_STR);
		$consulta->bindValue(":telefono", $cliente->telefono, PDO::PARAM_STR);
		$consulta->bindValue(":calle", $cliente->calle, PDO::PARAM_STR);
		$consulta->bindValue(":altura", $cliente->altura, PDO::PARAM_STR);
		$consulta->bindValue(":piso", $cliente->piso, PDO::PARAM_STR);
		$consulta->bindValue(":depto", $cliente->depto, PDO::PARAM_STR);
		$consulta->bindValue(":localidad", $cliente->depto, PDO::PARAM_STR);
		// $consulta->bindValue(":sexo", $cliente->sexo, PDO::PARAM_STR);
		// $consulta->bindValue(":foto", $cliente->foto, PDO::PARAM_STR);
		// $consulta->bindValue(":pass", $cliente->pass, PDO::PARAM_STR);
		$consulta->execute();

		$idAgregado = $conexion->lastInsertId();
		return $idAgregado;
	}

	public static function Modificar($cliente){
		$conexion = self::CrearConexion();

		$sql = "UPDATE clientes
				SET nombre = :nombre, telefono = :telefono, calle= :calle, altura =:altura, piso = :piso, depto=:depto, localidad = :localidad
				WHERE id = :id"; //, password = :pass

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":nombre", $cliente->nombre, PDO::PARAM_STR);
		// $consulta->bindValue(":apellido", $cliente->apellido, PDO::PARAM_STR);
		$consulta->bindValue(":telefono", $cliente->telefono, PDO::PARAM_STR);
		$consulta->bindValue(":calle", $cliente->calle, PDO::PARAM_STR);
		$consulta->bindValue(":altura", $cliente->altura, PDO::PARAM_STR);
		$consulta->bindValue(":piso", $cliente->piso, PDO::PARAM_STR);
		$consulta->bindValue(":depto", $cliente->depto, PDO::PARAM_STR);
		$consulta->bindValue(":localidad", $cliente->depto, PDO::PARAM_STR);
		// $consulta->bindValue(":sexo", $cliente->sexo, PDO::PARAM_STR);
		// $consulta->bindValue(":foto", $cliente->foto, PDO::PARAM_STR);
		// $consulta->bindValue(":pass", $cliente->password, PDO::PARAM_STR);
		$consulta->bindValue(":id", $cliente->id, PDO::PARAM_INT);
		$consulta->execute();

		$cantidad = $consulta->rowCount();
		return $cantidad;
	}

	public static function Eliminar($id){
		$conexion = self::CrearConexion();

		$sql = "DELETE FROM clientes
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