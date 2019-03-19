var indice = localStorage.getItem("indice");

const { BrowserWindow } = require("electron").remote;
const app = require("electron").app;
const path = require("path");
const url = require("url");
let PantallaBilleteMoneda;

var btnMostrador = document.getElementsByClassName("btnMostrar");

var VentanaMonedas = function() {
  localStorage.setItem("mostrador", this.value);
  PantallaBilleteMoneda = new BrowserWindow({ width: 650, height: 600 });
  PantallaBilleteMoneda.loadURL(
    url.format({
      pathname: path.join(__dirname, "ventanaMonedas.html"),
      protocol: "file",
      slashes: true
    })
  );

  PantallaBilleteMoneda.show();
};

var Mostrador = function() {
  var url = "http://museobillete.azurewebsites.net/api/Expo/";
  console.log(url + indice);
  fetch(url + indice)
    .then(datos => datos.json())
    .then(datos => {
      mostradores = datos.mostradores;     
      document.getElementById("Mostradores").innerHTML = "";
      for (let i = 0; i < mostradores.length; i++) {
        document.getElementById("Mostradores").innerHTML+= `
				  <br>
          <article id = "mostrador">
          ${datos.mostradores[i].titulo}
          
          <button id="btnMostrar" class="btnMostrar" value="${i}">Mostrar</button> 
          </article>
          <br>
          
			`;
      }
      for (let i = 0; i < btnMostrador.length; i++) {
        btnMostrador[i].addEventListener("click", VentanaMonedas);
      }
    });
};

Mostrador();