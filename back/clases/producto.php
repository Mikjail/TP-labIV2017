<?php
class Producto {
    //--------------------------------------------------------------------------------//
    //--ATRIBUTOS (No sé por qué tuve que ponerlos public)
    public $id;
    public $nombre;
    public $descripcion;
    public $ingredientes;
    public $img;
    public $precio;
    public $cantidad;
    public $id_tipoProducto;
    
    
#CONSTRUCTOR

	public function __construct($id=NULL)
	{
		if($id !== NULL){
			$obj = self::TraerProductosPorId($id);
			$this->id = $obj->GetId();
			$this->nombre = $obj->GetNombre();
			$this->descripcion = $obj->getDescripcion();
			$this->ingredientes = $obj->getIngredientes();
			$this->img = $obj->getImg();
            $this->id_tipoProducto = $obj->getTipoProducto();
            $this->precio = $obj->getPrecio();
            $this->cantidad = $obj->getCantidad();
            // $this->total = $obj->getTotal();
		}
	}

#GETTERS 
    public function getId() {
        return $this->id;
    }

    public function getNombre()
	{
		return $this->nombre;
	}
    public function getDescripcion()
	{
		return $this->descripcion;
	}
    public function getImg()
	{
		return $this->img;
	}
   
    public function getTipoProducto()
	{
		return $this->id_tipoProducto;
	}
    
    public function getPrecio()
	{
		return $this->precio;
	}
    public function getCantidad()
	{
		return $this->cantidad;
	}
    // public function getTotal()
	// {
	// 	return $this->total;
	// }
#SETTERS
    public function setId($valor) {
        $this->id = $valor;
    }

    public function setNombre($valor)
	{
		$this->nombre = $valor;
	}
    public function setDescripcion($valor)
	{
		$this->descripcion = $valor;
	}
    public function setImg($valor)
	{
		$this->img = $valor;
	}
    public function setTipoProducto($valor)
	{
		$this->id_tipoProducto = $valor;
	}
    
    public function setPrecio($valor)
	{
		$this->precio = $valor;
	}
    public function setCantidad($valor)
	{
		$this->cantidad = $valor;
	}
    // public function setTotal($valor)
	// {
	// 	$this->total = $valor;
	// }

#FUNCTIONS
public static function TraerUnProductoPorId($id){
		$conexion = self::CrearConexion();

		$sql = "SELECT P.id, P.nombre, P.descripcion, P.ingredientes, 
                       P.img, P.id_tipoProducto, P.precio, P.cantidad
				FROM productos P
				WHERE P.id = :id";

		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":id", $id, PDO::PARAM_INT);
		$consulta->execute();

		$producto = $consulta->fetchObject('Producto');
		return $producto;
	}

	public static function TraerTodosLosProductos(){
		$conexion = self::CrearConexion();

		$sql = "SELECT P.id, P.nombre, P.descripcion, P.ingredientes, 
                       P.img, P.id_tipoProducto, P.precio, P.cantidad
				FROM productos P";

		$consulta = $conexion->prepare($sql);
		$consulta->execute();

		$usuarios = $consulta->fetchall(PDO::FETCH_CLASS, 'Producto');
		return $usuarios;
	}

	public static function Agregar($producto){
		$conexion = self::CrearConexion();

		
		var_dump( $producto);

		var_dump( $producto->id_tipoProducto);

		$sql = "INSERT INTO productos (nombre, descripcion, ingredientes,
		 img, id_tipoProducto, precio, cantidad)
				VALUES (:nombre, :descripcion, :ingredientes,
                :img, :id_tipoProducto, :precio, :cantidad )";

		
		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":nombre", $producto->nombre, PDO::PARAM_STR);
		$consulta->bindValue(":descripcion", $producto->descripcion, PDO::PARAM_STR);
		$consulta->bindValue(":ingredientes", $producto->ingredientes, PDO::PARAM_STR);
        $consulta->bindValue(":img", $producto->img, PDO::PARAM_STR);
		$consulta->bindValue(":id_tipoProducto", $producto->id_tipoProducto, PDO::PARAM_INT);
		$consulta->bindValue(":precio", $producto->precio, PDO::PARAM_STR);
    	$consulta->bindValue(":cantidad", $producto->cantidad, PDO::PARAM_INT);
    	// $consulta->bindValue(":total", $producto->total, PDO::PARAM_STR);
        $consulta->execute();

		$conexion->lastInsertId();
		$idAgregado = $conexion->lastInsertId();
		return $idAgregado;
	}

	public static function Modificar($producto){
		$conexion = self::CrearConexion();

		$sql = "UPDATE productos
				SET nombre = :nombre, descripcion = :descripcion, ingredientes = :ingredientes,
                 img = :img, id_tipoProducto = :tipoProducto, precio = :precio, cantidad = :cantidad
				WHERE id = :id"; //, password = :pass


		$consulta = $conexion->prepare($sql);
		$consulta->bindValue(":nombre", $producto->nombre, PDO::PARAM_STR);
		$consulta->bindValue(":descripcion", $producto->descripcion, PDO::PARAM_STR);
		$consulta->bindValue(":ingredientes", $producto->ingredientes, PDO::PARAM_STR);
		$consulta->bindValue(":img", $producto->img, PDO::PARAM_STR);
		$consulta->bindValue(":tipoProducto", $producto->id_tipoProducto, PDO::PARAM_STR);
		$consulta->bindValue(":precio", $producto->precio, PDO::PARAM_STR);
    	$consulta->bindValue(":cantidad", $producto->cantidad, PDO::PARAM_STR);
    	$consulta->bindValue(":id", $producto->id, PDO::PARAM_INT);
        $consulta->execute();

		$cantidad = $consulta->rowCount();
		return $cantidad;
	}

	public static function Eliminar($id){
		$conexion = self::CrearConexion();

		$sql = "DELETE FROM productos
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
			$conexion = new PDO("mysql:host=localhost;dbname=camburpinton;charset=utf8;",'root','');
			return $conexion;
		}
		catch (Exception $e) {
			print_r("Error: " . $e->GetMessage());
			die();
			return;
		}
	}


}