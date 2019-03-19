<?php
	header("Access-Control-Allow-Origin: *");
	$servidor="localhost";
	$usuario="root";
	$password="";
	$basedatos="favoritos";
	$conexion=mysqli_connect($servidor,$usuario,$password,$basedatos);
	$consulta="select * from favoritosmyb";
	$resultado=mysqli_query($conexion,$consulta);
	$salida= array();
	if(mysqli_num_rows($resultado) > 0) {
		while($registro = mysqli_fetch_array($resultado)){
			$salida[] = Array(
				"id2" => $registro['id'],
				"fnombre" => $registro['fnombre'],
				"fdescripcion" => $registro['fdescripcion'],
				"fimagen" => $registro['fimagen'],
				"fdetalle" => $registro['fdetalle']
			);
		}
	}

	echo json_encode($salida);

	?>