<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require './vendor/autoload.php';

//Incluyo librerías de JWT
use \Firebase\JWT\JWT;

//Se instancia aplicación Slim.
$app = new \Slim\App();

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});



$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            // ->withHeader('Access-Control-Allow-Origin', 'http://cambur-pinton.com')
			->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
			->withHeader('Access-Control-Allow-Credentials', 'true');	
});

//Hola Mundo
$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, como estas $name");

    return $response;
});

#LOGIN
	$app->post("/auth/login", function($request, $response, $args){

		//Recupero desde $request las credenciales ingresadas. Usar getParsedBody() ya incluye un json_decode.
		//$credenciales = $request->getParsedBody();
		$credenciales = json_decode($request->getBody());
		
		
		//Conecto con la BD para ver si son correctas
		try
		{
			require_once "clases/usuario.php";
			$usuarioLogueado = Usuario::TraerUsuarioLogueado($credenciales);
	
		}
		catch (Exception $e) {
			print_r("Error: " . $e->GetMessage());
			die();
			return;
		}
		//Preparo una respuesta para bien o para mal
		if($usuarioLogueado)
		{
			##Todo lo que está acá (más incluir las librerías arriba) es la funcionalidad del JWT, que lo vimos dentro de auth.php. JWT solo usa dos funciones decode y encode.##
			//Clave elegida por el admin del server para encoding y decoding el JWT
			$key = "123456";
			//Creo el token que voy a codificar
			$token = array(
			    "id" => $usuarioLogueado->id,
			    "nombre" => $usuarioLogueado->nombre,
			    "email" => $usuarioLogueado->email,
				"userRole" => $usuarioLogueado->role,
			    "exp" => time()+100000
			);
			//Codifico el token con la función encode()
			$jwt = JWT::encode($token, $key);
			//Creo un array de respuesta donde uno de sus elementos tiene por índice el mismo nombre que en la configuración del Satellizer del cliente, y su valor es el JWT
			$respuesta["miToken"] = $jwt;
			$respuesta["datosDB"] = $usuarioLogueado; //A modo de TEST envío al cliente los datos de la BD
			$decoded = JWT::decode($jwt, $key, array('HS256'));
			$decoded_array = (array) $decoded;
			//$respuesta["datosTOKEN"] = $decoded_array; //A modo de TEST envío al cliente los datos descifrados
		}
		else{
			$respuesta["login"] = "Error! Usuario o clave incorrectas";
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});
	$app->post("/auth/signup", function($request, $response, $args){
		//Recuperar los datos recibidos
		$datosRegistro = json_encode(json_decode($request->getBody()));
		//Validar
			//... (en un futuro)
		//Guardar en la BD
		try
		{
			require_once "clases/usuario.php";
			$idAgregado = Usuario::Agregar(json_decode($datosRegistro));
		}
		catch (Exception $e) {
			print_r("Error: " . $e->GetMessage());
			die();
			return;
		}
		//Loguearlo
		if($idAgregado)
		{
			try
			{
				require_once "clases/usuario.php";
				$usuarioLogueado = Usuario::TraerUnUsuarioPorId($idAgregado);
			}
			catch (Exception $e) {
				print_r("Error: " . $e->GetMessage());
				die();
				return;
			}
			##Todo lo que está acá (más incluir las librerías arriba) es la funcionalidad del JWT, que lo vimos dentro de auth.php. JWT solo usa dos funciones decode y encode.##
			//Clave elegida por el admin del server para encoding y decoding el JWT
			$key = "123456";
			//Creo el token que voy a codificar
			$token = array(
			    "nombre" => $usuarioLogueado->nombre,
			    "perfil" => $usuarioLogueado->perfil,
			    "email" => $usuarioLogueado->email,
			    "exp" => time()+100000
			);
			//Codifico el token con la función encode()
			$jwt = JWT::encode($token, $key);
			//Creo un array de respuesta donde uno de sus elementos tiene por índice el mismo nombre que en la configuración del Satellizer del cliente, y su valor es el JWT
			$respuesta["miToken"] = $jwt;
			$respuesta["datosDB"] = $usuarioLogueado; //A modo de TEST envío al cliente los datos de la BD
			$decoded = JWT::decode($jwt, $key, array('HS256'));
			$decoded_array = (array) $decoded;
			$respuesta["datosTOKEN"] = $decoded_array; //A modo de TEST envío al cliente los datos descifrados
		}
		else{
			$respuesta["login"] = "Error!";
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});
#USUARIOS
    //Alta de Usuario
	$app->post("/usuarios", function($request, $response, $args){
		//Recupero los datos del formulario de alta del usuario en un stdClass
		$usuario = json_decode($request->getBody()); // $usuario->nombre = "Mika"
		//Modifico el usuario
		try{
			require_once "clases/usuario.php";
			$respuesta["idAgregado"] = Usuario::Agregar($usuario);
			$respuesta["mensaje"] = "Se agregó el usuario #".$respuesta["idAgregado"];
		}
		catch (Exception $e){
			$respuesta["idAgregado"] = "ERROR";
			$respuesta["error"] = $e;
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});

    //Tomar todos los usuarios
	$app->get("/usuarios", function($request, $response, $args){
		//Traigo todos los usuarios
		require_once "clases/usuario.php";
		$usuarios = Usuario::TraerTodosLosUsuarios();		
		$respuesta["usuarios"] = $usuarios;
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;		
	});

    //Borrar usuario segun su id.
	$app->delete("/usuarios/{id}", function($request, $response, $args){
		//Recupero el Id del usuario
		$id = json_decode($args["id"]);
		//Elimino el usuario
		try{
			require_once "clases/usuario.php";
			$respuesta["cantidad"] = Usuario::Eliminar($id);
			$respuesta["mensaje"] = "Se eliminaron ".$respuesta["cantidad"]." usuarios";
		}
		catch (Exception $e){
			$respuesta["nuevoId"] = "ERROR";
			$respuesta["error"] = $e;
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});

    //Modificar Usuario
	$app->put("/usuarios", function($request, $response, $args){
		//Recupero los datos del formulario de modificación del usuario en un stdClass
		$usuario = json_decode($request->getBody()); // $usuario->nombre = "Mika" 
		//Modifico el usuario
		try{
			require_once "clases/usuario.php";
			$respuesta["cantidad"] = Usuario::Modificar($usuario);
			$respuesta["mensaje"] = "Se modificaron ".$respuesta["cantidad"]." usuarios";
		}
		catch (Exception $e){
			$respuesta["nuevoId"] = "ERROR";
			$respuesta["error"] = $e;
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});

#PRODUCTOS

 //Alta de producto
	$app->post("/productos", function($request, $response, $args){

		//Recupero los datos del formulario de alta del producto en un stdClass
		$producto = json_decode($request->getBody()); // $producto->nombre = "Mika"
		//Modifico el producto
		try{
			require_once "clases/producto.php";
			$respuesta["idAgregado"] = Producto::Agregar($producto);
			$respuesta["mensaje"] = "Se agregó el producto #".$respuesta["idAgregado"];
		}
		catch (Exception $e){
			$respuesta["idAgregado"] = "ERROR";
			$respuesta["error"] = $e;
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});

    //Tomar todos los productos
	$app->get("/productos", function($request, $response, $args){
		//Traigo todos los productos
		require_once "clases/producto.php";
		$productos = Producto::TraerTodosLosProductos();		
		$respuesta["productos"] = $productos;
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;		
	});
	
	 //Tomar un solo productos
	$app->get("/productos/{id}", function($request, $response, $args){
		//Recupero los datos del formulario de alta del producto en un stdClass
		$id = json_decode($args["id"]);// $producto->nombre = "Mika"
		//Modifico el producto
	
		//Traigo todos los productos
		require_once "clases/producto.php";
		$productos = Producto::TraerUnProductoPorId($id);
		$respuesta["productos"] = $productos;
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;		
	});
	
    //Borrar producto segun su id.
	$app->delete("/productos/{id}", function($request, $response, $args){
		//Recupero el Id del producto
		$id = json_decode($args["id"]);
		//Elimino el producto
		try{
			require_once "clases/producto.php";
			$respuesta["cantidad"] = Producto::Eliminar($id);
			$respuesta["mensaje"] = "Se eliminaron ".$respuesta["cantidad"]." productos";
		}
		catch (Exception $e){
			$respuesta["nuevoId"] = "ERROR";
			$respuesta["error"] = $e;
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});

    //Modificar producto
	$app->put("/productos", function($request, $response, $args){
		//Recupero los datos del formulario de modificación del producto en un stdClass
		$producto = json_decode($request->getBody()); // $producto->nombre = "Mika" 
		//Modifico el producto
		try{
			require_once "clases/producto.php";
			$respuesta["cantidad"] = Producto::Modificar($producto);
			$respuesta["mensaje"] = "Se modificaron ".$respuesta["cantidad"]." productos";
		}
		catch (Exception $e){
			$respuesta["nuevoId"] = "ERROR";
			$respuesta["error"] = $e;
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});

#PERSONAS

	//Alta Personas
	$app->post("/personas", function($request, $response, $args){


		//Recupero los datos del formulario de alta del producto en un stdClass
		$persona = json_decode($request->getBody()); // $producto->nombre = "Mika"
		
		
		//Modifico el producto
		try{
			require_once "clases/persona.php";
			$respuesta["idAgregado"] = Persona::Agregar($persona);
			$respuesta["mensaje"] = "Se agregó el producto #".$respuesta["idAgregado"];
		}
		catch (Exception $e){
			$respuesta["idAgregado"] = "ERROR";
			$respuesta["error"] = $e;
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});

    //Tomar todos los personas
	$app->get("/personas", function($request, $response, $args){
		//Traigo todos los personas
		require_once "clases/persona.php";
		$personas = Persona::TraerTodasLasPersonas();		
		$respuesta["personas"] = $personas;
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;		
	});
	
	 //Tomar un solo personas
	$app->get("/personas/{id}", function($request, $response, $args){
		//Recupero los datos del formulario de alta del producto en un stdClass
		$id = json_decode($args["id"]);// $producto->nombre = "Mika"
		//Modifico el producto
	
		//Traigo todos los personas
		require_once "clases/persona.php";
		$personas = Persona::TraerUnaPersonaPorId($id);
		$respuesta["personas"] = $personas;
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;		
	});
	
    //Borrar producto segun su id.
	$app->delete("/personas/{id}", function($request, $response, $args){
		//Recupero el Id del producto
		$id = json_decode($args["id"]);
		//Elimino el producto
		try{
			require_once "clases/persona.php";
			$respuesta["cantidad"] = Persona::Eliminar($id);
			$respuesta["mensaje"] = "Se eliminaron ".$respuesta["cantidad"]." personas";
		}
		catch (Exception $e){
			$respuesta["nuevoId"] = "ERROR";
			$respuesta["error"] = $e;
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});

    //Modificar producto
	$app->put("/personas", function($request, $response, $args){
		//Recupero los datos del formulario de modificación del producto en un stdClass
		$persona = json_decode($request->getBody()); // $producto->nombre = "Mika" 
		//Modifico el producto
		try{
			require_once "clases/persona.php";
			$respuesta["cantidad"] = Persona::Modificar($persona);
			$respuesta["mensaje"] = "Se modificaron ".$respuesta["cantidad"]." personas";
		}
		catch (Exception $e){
			$respuesta["nuevoId"] = "ERROR";
			$respuesta["error"] = $e;
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});

#CLIENTES

	//Alta clientes
	$app->post("/clientes", function($request, $response, $args){


		//Recupero los datos del formulario de alta del producto en un stdClass
		$cliente = json_decode($request->getBody()); // $producto->nombre = "Mika"
		
		
		//Modifico el producto
		try{
			require_once "clases/cliente.php";
			$respuesta["idAgregado"] = Cliente::Agregar($cliente);
			$respuesta["mensaje"] = "Se agregó el producto #".$respuesta["idAgregado"];
		}
		catch (Exception $e){
			$respuesta["idAgregado"] = "ERROR";
			$respuesta["error"] = $e;
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});

    //Tomar todos los clientes
	$app->get("/clientes", function($request, $response, $args){
		//Traigo todos los clientes
		require_once "clases/cliente.php";
		$clientes = Cliente::TraerTodosLosClientes();		
		$respuesta["clientes"] = $clientes;
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;		
	});
	
	 //Tomar un solo cliente
	$app->get("/clientes/{id}", function($request, $response, $args){
		//Recupero los datos del formulario de alta del producto en un stdClass
		$id = json_decode($args["id"]);// $producto->nombre = "Mika"
		//Modifico el producto
	
		//Traigo todos los clientes
		require_once "clases/cliente.php";
		$clientes = Cliente::TraerUnaPersonaPorId($id);
		$respuesta["clientes"] = $clientes;
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;		
	});
	
    //Borrar producto segun su id.
	$app->delete("/clientes/{id}", function($request, $response, $args){
		//Recupero el Id del producto
		$id = json_decode($args["id"]);
		//Elimino el producto
		try{
			require_once "clases/cliente.php";
			$respuesta["cantidad"] = Cliente::Eliminar($id);
			$respuesta["mensaje"] = "Se eliminaron ".$respuesta["cantidad"]." clientes";
		}
		catch (Exception $e){
			$respuesta["nuevoId"] = "ERROR";
			$respuesta["error"] = $e;
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});

    //Modificar clientes
	$app->put("/clientes", function($request, $response, $args){
		//Recupero los datos del formulario de modificación del producto en un stdClass
		$cliente = json_decode($request->getBody()); // $producto->nombre = "Mika" 
		//Modifico el producto
		try{
			require_once "clases/cliente.php";
			$respuesta["cantidad"] = Cliente::Modificar($cliente);
			$respuesta["mensaje"] = "Se modificaron ".$respuesta["cantidad"]." clientes";
		}
		catch (Exception $e){
			$respuesta["nuevoId"] = "ERROR";
			$respuesta["error"] = $e;
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});


#PEDIDOS
	//Alta pedidos
	$app->post("/pedidos", function($request, $response, $args){


		//Recupero los datos del formulario de alta del producto en un stdClass
		$pedido = json_decode($request->getBody()); // $producto->nombre = "Mika"
		
		
		//Modifico el producto
		try{
			require_once "clases/pedido.php";
			$respuesta["idAgregado"] = Pedido::Agregar($pedido);
			$respuesta["mensaje"] = "Se agregó el producto #".$respuesta["idAgregado"];
		}
		catch (Exception $e){
			$respuesta["idAgregado"] = "ERROR";
			$respuesta["error"] = $e;
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});
	 //Tomar un solo pedido
	$app->get("/pedidos/{id}", function($request, $response, $args){
		//Recupero los datos del formulario de alta del producto en un stdClass
		$id = json_decode($args["id"]);// $producto->nombre = "Mika"
	
	
		//Traigo el pedido
		require_once "clases/pedido.php";
		$pedidos = Pedido::TraerUnPedidoPorId($id);
		$respuesta["pedidos"] = $pedidos;
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;		
	});


  //Tomar todos los pedidos
	$app->get("/pedidos", function($request, $response, $args){
		//Traigo todos los clientes
		require_once "clases/pedido.php";
		$pedidos = Pedido::TraerTodosLosPedidos();	
		$respuesta["orders"] = $pedidos;

		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;		
	});


	//Eliminar pedido
	//Borrar producto segun su id.
	$app->delete("/pedidos/{id}", function($request, $response, $args){
		//Recupero el Id del producto
		$id = json_decode($args["id"]);
		//Elimino el producto
		try{
			require_once "clases/pedido.php";
			$respuesta["cantidad"] = Pedido::Eliminar($id);
			$respuesta["mensaje"] = "Se eliminaron ".$respuesta["cantidad"]." clientes";
		}
		catch (Exception $e){
			$respuesta["nuevoId"] = "ERROR";
			$respuesta["error"] = $e;
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});


#ARCHIVOS

	$app->post("/filesPerson", function($request, $response, $args){
		if ( !empty( $_FILES ) ) {
			#-------------------------------------- REDIMENSIONAR IMAGEN A 600x400 --------------------------------#
			$maxDimW = 600;
			$maxDimH = 400;
			list($width, $height, $type, $attr) = getimagesize( $_FILES['file']['tmp_name'] );
			// if ( $width > $maxDimW || $height > $maxDimH ) {
			    $target_filename = $_FILES['file']['tmp_name'];
			    $fn = $_FILES['file']['tmp_name'];
			 
			    $size = getimagesize( $fn );
			    $ratio = $size[0]/$size[1]; // width/height
			    // if( $ratio > 1) {
			    //     $width = $maxDimW;
			    //     $height = $maxDimH/$ratio;
			    // } else {
			    //     $width = $maxDimW*$ratio;
			    //     $height = $maxDimH;
			    // }
				$width = $maxDimW;
				$height = $maxDimH;
			    $src = imagecreatefromstring(file_get_contents($fn));
			    $dst = imagecreatetruecolor( $width, $height );
			    imagecopyresampled($dst, $src, 0, 0, 0, 0, $width, $height, $size[0], $size[1] );
			    imagejpeg($dst, $target_filename); // adjust format as needed
			#-------------------------------------------------------------------------------------------------------#
		    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
		    // $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
		    //$uploadPath = "../". DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
		    // $uploadPath = 'C:\xampp\htdocs\proyectos\plusvibestudio\TP-labIV2017\my-cli-app\src\assets\fotos' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
		    $uploadPath = 'http://www.cambur-pinton.com/assets/fotos' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
			move_uploaded_file( $tempPath, $uploadPath );
		    $respuesta["mensaje"] = 'Archivo Cargado!';
		} else {
		    $respuesta["error"] = 'No se cargo el archivo';
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});

	$app->post("/filesProduct", function($request, $response, $args){
		if ( !empty( $_FILES ) || !($_FILES["fileToUpload"]["size"] > 500000) ) {
			// Allow certain file formats
			// if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
			// && $imageFileType != "gif" ) {
			// 	echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
			// 	$uploadOk = 0;
			// }
			// // Check if $uploadOk is set to 0 by an error
			// if ($uploadOk == 0) {
			// 	$respuesta["error"]= "Sorry, your file was not uploaded.";
			// // if everything is ok, try to upload file
			// }			
		#-------------------------------------------------------------------------------------------------------#
		    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
		    // $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
		    //$uploadPath = "../". DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
		    $uploadPath = 'http://www.cambur-pinton.com/assets/productos/'. $_FILES[ 'file' ][ 'name' ];
			move_uploaded_file( $tempPath, $uploadPath );
		    $respuesta["mensaje"] = 'Archivo Cargado!';
		} else {
		    $respuesta["error"] = 'No se cargo el archivo';
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});
#TIPOPRODUCTOS
	//Alta Personas
	$app->post("/tipoproducto", function($request, $response, $args){

		//Recupero los datos del formulario de alta del producto en un stdClass
		$persona = json_decode($request->getBody()); // $producto->nombre = "Mika"
		//Modifico el producto
		try{
			require_once "clases/persona.php";
			$respuesta["idAgregado"] = Persona::Agregar($persona);
			$respuesta["mensaje"] = "Se agregó el producto #".$respuesta["idAgregado"];
		}
		catch (Exception $e){
			$respuesta["idAgregado"] = "ERROR";
			$respuesta["error"] = $e;
		}
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;
	});

    //Tomar todos los Tipos de Productos
	$app->get("/tipoproducto", function($request, $response, $args){
		//Traigo todos los personas
		require_once "clases/tipoProducto.php";
		$tipoproductos = TipoProducto::TraerTodosLosTipoProductos();		
		$respuesta = $tipoproductos;
		//Escribo la respuesta en el body del response y lo retorno
		$response->getBody()->write(json_encode($respuesta));
		return $response;		
	});
	
$app->run();
