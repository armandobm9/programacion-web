// cargar la aplicacion de electron
const app = require("electron").app;
//crear ventanas del sistema operativo
const BrowserWindow = require("electron").BrowserWindow;
//Ruta del sistema de archivos del S.O.
const path = require("path");
//ruta de carga de aplicaciones web
const url = require("url");

//constantes para imprimir en pdf alv bien perron

const electron = require("electron");
//sitema de archivos
const fs = require("fs");
//sistema operativo
const os = require("os");
// para declarar una funcion remota
//IPC llamada a procedimiento interno
const ipc = electron.ipcMain;
// acceso ala terminal o linea de comandos
const shell = electron.shell;

//otra forma de declaras una cosntante
//pantalla principal
let PantallaPrincipal;

function muestraPantallaPrincipal() {
  //creamos pantalla vacia
  PantallaPrincipal = new BrowserWindow({ width: 1200, height: 520 });
  //cargamos en la pantalla elc ontenido de nuestra pagina
  PantallaPrincipal.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file",
      slashes: true
    })
  );
  PantallaPrincipal.show();
}
//evento para PDF (declaracion)
ipc.on("print-to-pdf", function(event) {
  const pdfPath = path.join(os.tmpdir(), "print.pdf");
  const win = BrowserWindow.fromWebContents(event.sender);
  win.webContents.printToPDF({}, function(error, data) {
    if (error) throw error;
    fs.writeFile(pdfPath, data, function(error) {
      if (error) {
        throw error;
      }
      shell.openExternal("file://" + pdfPath);
    });
  });
});

app.on("ready", muestraPantallaPrincipal);