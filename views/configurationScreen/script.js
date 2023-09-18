const { ipcRenderer } = require('electron')
const util = require('../utils/util')
const _ = require('lodash')
const bootstrap = require('bootstrap')

function guardarRutaPokemon() {
    const tickGuardadoCorrecto = document.getElementById('tickGuardadoCorrecto')
    const inputRuta = document.getElementById('inputRuta')
    const valorInputRuta = inputRuta.files[0].path

    notificarAltaDeScreenHaciaMain({ruta:valorInputRuta})
    util.aparecerYDesvanecer(tickGuardadoCorrecto,10)
    colocarPlaceHolder()
    placeHolderLabel.style.color = 'black'
}

function funcionesDeInicio() {
    util.crearBotonCerradoConEstilo(contenedor)
    notificarAltaDeScreenHaciaMain({})
}

function cerrarPantalla() {
    ipcRenderer.send('screens:configurationScreenHide', {})
}
function notificarAltaDeScreenHaciaMain(obj) {
    ipcRenderer.send('altaDeScreen:configuracion', obj)
}
function placeHolder(unPlaceHolder) {
    placeHolderLabel.innerHTML = unPlaceHolder
}

function obtenerExtension(path) {
    return _.last(_.split(path, '\\'))
}

function colocarPlaceHolder(ruta) {
    const extensionDeRuta = obtenerExtension(ruta)
    placeHolder(extensionDeRuta)
}
function accionesPostBusquedaDeArchivo(){
    const extension = obtenerExtension(inputRuta.files[0].path)
    colocarPlaceHolderPrevisional(extension)
    verificarExtensionDeArchivo(extension)
}
function verificarExtensionDeArchivo(extension){
    if(_.includes(extension,".js")&&!_.includes(extension,".json")){
    	botonGuardarButton.disabled = false
    	eliminarToolTipDeBotonGuardar()
    }else{
        botonGuardarButton.disabled = true
        agregarToolTipConMensajeEnBotonGuardar('La extension del archivo debe ser .js')
    }
}
function agregarToolTipConMensajeEnBotonGuardar(unMensaje){
	botonGuardar.title = unMensaje
	new bootstrap.Tooltip(botonGuardar)
}
function eliminarToolTipDeBotonGuardar(){
	new bootstrap.Tooltip(botonGuardar).disable()	
}
function colocarPlaceHolderPrevisional(extension) {
    placeHolder(extension)
    placeHolderLabel.style.color = 'blue'
}
ipcRenderer.on('config:ruta', (event, data) => {
    ipcRenderer.send('config:ruta', { ruta: inputRuta.value })
})
ipcRenderer.on('altaDeScreen:configuracion', (event, data) => {
    if (data.ruta) {
        colocarPlaceHolder(data.ruta);
    }
})
function borrarRuta (){
    ipcRenderer.send('borrarRutaConfig',{})
}