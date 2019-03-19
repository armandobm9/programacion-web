var detalleGrupo = localStorage.getItem("detalleGrupo");
var indice = localStorage.getItem("indice");
var grupo = localStorage.getItem("mostrador");

var btnGrupos = document.getElementsByClassName("btnGrupos");
var grupoDetalle = "";

var ventanaGrupoDetalle = function() {
  var url = "http://museobillete.azurewebsites.net/api/Expo/";
  console.log(url + indice);
  fetch(url + indice)
    .then(datos => datos.json())
    .then(datos => {
      grupoDetalle =
        datos.mostradores[grupo].grupos[detalleGrupo].piezas[this.value]
          .detallesUrl;
      console.log(grupoDetalle);
      window.open(grupoDetalle, "_blank", 'nodeIntegration=no');
    });
};

var buscaDetalleGrupos = function() {
  var url = "http://museobillete.azurewebsites.net/api/Expo/";
  console.log(url + indice);
  fetch(url + indice)
    .then(datos => datos.json())
    .then(datos => {
      document.getElementById("GrupoMonedas").innerHTML = "";
      grupos = datos.mostradores[grupo].grupos[detalleGrupo].piezas;
      var foto = "";
      for (let i = 0; i < grupos.length; i++) {
        document.getElementById("GrupoMonedas").innerHTML += `
                  <article id="contenido">
                      <img src="${
                        datos.mostradores[grupo].grupos[detalleGrupo].piezas[i]
                          .imagenFondoUrl
                      }" class="imgFoto">
                      <article>
                      <div class="txtNombre">${
                        datos.mostradores[grupo].grupos[detalleGrupo].piezas[i]
                          .titulo
                      }</div>                     
                      <button class="btnGrupos" value="${i}">Piezas</button> 
                  </article>
                  </article>                 
                  <br> 
  
              `;
      }

      for (let i = 0; i < btnGrupos.length; i++) {
        btnGrupos[i].addEventListener("click", ventanaGrupoDetalle);
      }
    });
};

buscaDetalleGrupos();