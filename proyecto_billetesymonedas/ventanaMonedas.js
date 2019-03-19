var indice = localStorage.getItem("indice");
var grupo = localStorage.getItem("mostrador");

const { BrowserWindow } = require("electron").remote;
const app = require("electron").app;
const path = require("path");
const url = require("url");
let detallePieza;
let DetalleGrupos;

var btnMostrador = document.getElementsByClassName("btnMostradores");
var favoritos=document.getElementsByClassName('btnFavoritos');

var ventanaDetallesPieza = function() {
  var unico = "";
  var detalle = "";
  var detalleGrupo = "";

  var urls = "http://museobillete.azurewebsites.net/api/Expo/";
  fetch(urls + indice)
    .then(datos => datos.json())
    .then(datos => {
      unico = datos.mostradores[grupo].grupos[this.value].unico;

      if (unico == true) {
        detalle =
          datos.mostradores[grupo].grupos[this.value].piezas[0].detallesUrl;
        console.log(detalle);
        localStorage.setItem("detalle", detalle);
        window.open(detalle, "_blank", 'nodeIntegration=no');

        //PantallaDetalleMonedas.show();
      } else {
        detalleGrupo = this.value;
        console.log(detalle);
        localStorage.setItem("detalleGrupo", detalleGrupo);
        DetalleGrupos = new BrowserWindow({ width: 460, height: 600 });
        DetalleGrupos.loadURL(
          url.format({
            pathname: path.join(__dirname, "pantallaGrupos.html"),
            protocol: "file",
            slashes: true
          })
        );
        console.log("falso");
      }
    });
};

var agregar = function(btnFavoritos){
  var fn = btnFavoritos.getAttribute('data-titulo');
  var fdes = btnFavoritos.getAttribute('data-descripcion');
  var fimg = btnFavoritos.getAttribute('data-foto');
  var fdet = btnFavoritos.getAttribute('data-detalle');;
  const data = new FormData();
  data.append('fnombre',fn);
  data.append('fdescripcion',fdes);
  data.append('fimagen',fimg);
  data.append('fdetalle',fdet);
  fetch('http://localhost/pw/agregaFavoritos.php', {
    method: 'post',
    body: data
  })
  .then(datos=>datos.json())
  .then(datos=> {
    if (datos.respuesta == true) {
      alert('Agregado a favoritos')
    } else {
      alert('Ya está agregado a favoritos')
    }
  })
};

document.addEventListener('click',function(e){
  if(e.target && e.target.id== 'favoritos'){
      agregar(e.target);
  }
});

var buscaDetalleMonedas = function() {
  var url = "http://museobillete.azurewebsites.net/api/Expo/";
  console.log(url + indice);
  fetch(url + indice)
    .then(datos => datos.json())
    .then(datos => {
      document.getElementById("VentanaMonedas").innerHTML = "";
      grupos = datos.mostradores[grupo].grupos;
      var foto = "";
      var descrip = "";
      for (let i = 0; i < grupos.length; i++) {
        titulo = datos.mostradores[grupo].grupos[i].titulo;
        descrip = datos.mostradores[grupo].grupos[i].descripcion;
        foto = datos.mostradores[grupo].grupos[i].imagenFondoUrl;
        detalle = datos.mostradores[grupo].grupos[i].piezas[0].detallesUrl;
        if (descrip == null) {
          descrip = "Grupo de Piezas";
        }

        document.getElementById("VentanaMonedas").innerHTML += `
				<article id="cont01">
          <img src="${foto}" class="imgFoto">
          <article>
            <img src="img/favoritos.png" alt="" id="favoritos" class="fav btnFavoritos"
              data-titulo="${titulo}"
              data-descripcion="${descrip}"
              data-foto="${foto}"
              data-detalle="${detalle}"
              //onclick=""
            >
					  <div class="txtNombre">${titulo}</div>
            <div class="txtNombre">${descrip}</div>
					  <button class="btnMostradores" id="btnMostrador" value="${i}">Detalle</button> 
			  	</article>
				</article>				
				<br> 
			`;
      }

      
      for (let i = 0; i < btnMostrador.length; i++) {
        btnMostrador[i].addEventListener("click", ventanaDetallesPieza);
        
      }

       /*favoritos.addEventListener("click", function() {
          agregar (datosGrupos[i].piezas[0].titulo, datosGrupos[i].piezas[0].descripcion, foto, datosGrupos[i].piezas[0].detallesUrl);
        }, false); */

      

      
    });
};

buscaDetalleMonedas();