<?php
class Connection{
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

}