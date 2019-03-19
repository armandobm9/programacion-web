var indice = localStorage.getItem("indice");
var grupo = localStorage.getItem("mostrador")
var btnMostradores = document.getElementsByClassName('btnMostradores');
var btnQuitar = document.getElementsByClassName('quitarFavoritos');

var VentanaDetalleMonedas = function () {
  window.open(this.value, "_self")
}

var muestraFavoritos = function() {
	var datos;
	fetch('http://localhost/pw/favoritos.php')
	.then(datos=>datos.json())
	.then(datos=> {
		var resultado = '';

		datos.forEach(function(val, index){
			//console.log('valor: ', val)
			resultado += `
				<article class="abajoIzquierda" id="cont01">
		          	<img src="${val.fimagen}" class="imgFoto" id="fotoBill">
		          	<article class="abajoDerecha" id="art02">
					  	    <div class="txtNombre">${val.fnombre}</div>
		              <div class="txtNombre">${val.fdescripcion}</div>
					  	    <button class="btnMostradores" id="btnMostrador" value=${val.fdetalle} onclick="VentanaDetalleMonedas()">Detalle</button> 
                  <button class="quitarFavoritos" id="quitar" value=${val.id2} >Quitar</button> 
				  	   </article>
				</article>
			`
		})
		document.getElementById('allFavorites').innerHTML = resultado;
	})
}

document.addEventListener('click',function(e){
  if(e.target && e.target.id== 'quitar'){
      quitar(e.target);
  }
});

var quitar = function(btnQuitar){
  var fn = btnQuitar.getAttribute('value');
  const data = new FormData();
  data.append('id',fn);
  fetch('http://localhost/pw/quitarFavoritos.php', {
    method: 'post',
    body: data
  })
  .then(datos=>datos.json())
  .then(datos=> {
    if (datos.respuesta == true) {
      alert('Se quito de favoritos')
      location.reload();
    } else {
      alert('No se pudo quitar de favoritos')
    }
  })
};

muestraFavoritos();

