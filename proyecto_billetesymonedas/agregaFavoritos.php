<?php
	header("Access-Control-Allow-Origin: *");
	$fnombre=$_POST["fnombre"];
	$fdescripcion=$_POST["fdescripcion"];
	$fimagen=$_POST["fimagen"];
	$fdetalle=$_POST["fdetalle"];

	$servidor="localhost";
	$usuario="root";
	$password="";
	$basedatos="favoritos";
	$conexion=mysqli_connect($servidor,$usuario,$password,$basedatos);
	$consulta="INSERT INTO favoritosmyb (fnombre, fdescripcion, fimagen, fdetalle) SELECT '$fnombre', '$fdescripcion', '$fimagen', '$fdetalle' FROM DUAL WHERE NOT EXISTS (SELECT fimagen FROM favoritosmyb WHERE fimagen='$fimagen') LIMIT 1";
	$respuesta = false;
	mysqli_query($conexion,$consulta);

	if (mysqli_affected_rows($conexion) > 0) {
		$respuesta= true;
	}
	$salida = array ('respuesta' => $respuesta);
	print json_encode($salida);
?>