const Store = require('electron-store')
const store = new Store()
const { ipcRenderer } = require('electron')
const util = require('../utils/util')
const _ = require('lodash')

function guardarRutaPokemon() {
    const tickGuardadoCorrecto = document.getElementById('tickGuardadoCorrecto')
    const inputRuta = document.getElementById('inputRuta')
    const valorInputRuta = inputRuta.files[0].path
    
    store.set('ruta', { inputRuta: valorInputRuta })
    util.aparecerYDesvanecer(tickGuardadoCorrecto, 0.1)
    ipcRenderer.send('altaDeScreen:configuracion', { ruta: valorInputRuta })
    colocarPlaceHolder()
    placeHolderLabel.style.color = 'black'
}

function funcionesDeInicio() {
    const ruta = store.get('ruta')
    if (ruta) {
        colocarPlaceHolder();
        notificarAltaDeScreenHaciaMain()
    } else {
        habilitarModalParaPirmerUso()
    }
    util.crearBotonCerradoConEstilo(contenedor)
}   
function cerrarPantalla(){
    ipcRenderer.send('screens:configurationScreenHide', {})
}
function habilitarModalParaPirmerUso() {
    ipcRenderer.send('altaDeScreen:configuracionPrimeraApertura', {})
}

function notificarAltaDeScreenHaciaMain() {
    const ruta = store.get('ruta').inputRuta
    ipcRenderer.send('altaDeScreen:configuracion', { ruta })
}
function placeHolder(unPlaceHolder){
    placeHolderLabel.innerHTML = unPlaceHolder
}
function obtenerExtension(path){
    return _.last(_.split(path,'\\'))
}
function colocarPlaceHolder() {
    const ruta = store.get('ruta')
    const extensionDeRuta = obtenerExtension(ruta.inputRuta)
    placeHolder(extensionDeRuta)
}
function colocarPlaceHolderPrevisional(){
    const valorInputRuta = obtenerExtension(inputRuta.files[0].path)
    placeHolder(valorInputRuta)
    placeHolderLabel.style.color = 'blue'
}
ipcRenderer.on('config:ruta', (event, data) => {
    ipcRenderer.send('config:ruta', { ruta: inputRuta.value })
})