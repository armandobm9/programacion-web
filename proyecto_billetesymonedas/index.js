window.onload = function() {
    const { BrowserWindow } = require("electron").remote;
    const app = require("electron").app;
    const path = require("path");
    const url = require("url");
    let PantallaMostradores;
  
    var btnMostrador = document.getElementsByClassName("btnMostrador");
  
    var Mostradores = function() {     
      var variable = "";
  
      var urls = "http://museobillete.azurewebsites.net/api/Expo";
      fetch(urls)
        .then(datos => datos.json())
        .then(datos => {
          variable = datos[this.value].id;
          console.log(variable);
          localStorage.setItem("indice", variable);
        });
  
      PantallaMostradores = new BrowserWindow({ width: 465, height: 580 });
      PantallaMostradores.loadURL(
        url.format({
          pathname: path.join(__dirname, "Mostradores.html"),
          protocol: "file",
          slashes: true
        })
      );
  
      PantallaMostradores.show();
    };

    
  
    var Vitrinas = function() {      
      var url = "http://museobillete.azurewebsites.net/api/Expo";
      fetch(url)
        .then(datos => datos.json())
        .then(datos => {
          var Titulos = "";
          var imagen = "";
          document.getElementById("art01").innerHTML = "";
          for (let i = 0; i < datos.length; i++) {
            Titulos = datos[i].titulo;
            imagen = datos[i].imagenFondoUrl;
  
            document.getElementById("art01").innerHTML += `
                
                <article id="vitrina">
                      <img src="${imagen}" class="Fotobill" id="img">                      
                      <article id="desc"><div id="txtNombre">${Titulos}</div> 
                      <button class="btnMostrador" value="${i}">Mostrador</button> </article>                     
                </article>
               
                
              `;
          } //termina for
          for (let i = 0; i < btnMostrador.length; i++) {
            btnMostrador[i].addEventListener("click", Mostradores);
          }
        });
    };
  
    Vitrinas();
  if ( window.addEventListener ) {
  var state = 0, konami = [38,38,40,40,37,39,37,39,66,65];
  window.addEventListener("keydown", function(e) {
  if ( e.keyCode == konami[state] ) state++;
  else state = 0;
  if ( state == 10 )
  window.location = "konami.html";
  }, true);
  }
    // var btnBuscar=document.getElementById('btnBuscar');
    // btnBuscar.addEventListener('click',buscaPersonaje);
  };