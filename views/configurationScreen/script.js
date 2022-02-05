const { ipcRenderer } = require('electron')
const util = require('../utils/util')
const _ = require('lodash')

function guardarRutaPokemon() {
    const tickGuardadoCorrecto = document.getElementById('tickGuardadoCorrecto')
    const inputRuta = document.getElementById('inputRuta')
    const valorInputRuta = inputRuta.files[0].path

    notificarAltaDeScreenHaciaMain({ruta:valorInputRuta})
    util.aparecerYDesvanecer(tickGuardadoCorrecto, 0.1)
    ipcRenderer.send('altaDeScreen:configuracion', { ruta: valorInputRuta })
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

function colocarPlaceHolderPrevisional() {
    const valorInputRuta = obtenerExtension(inputRuta.files[0].path)
    placeHolder(valorInputRuta)
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