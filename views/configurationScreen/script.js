const Store = require('electron-store')
const store = new Store()
const { ipcRenderer } = require('electron')
const util = require('../utils/util')

function guardarRutaPokemon() {
    const tickGuardadoCorrecto = document.getElementById('tickGuardadoCorrecto')
    const valorInputRuta = inputRuta.value
    store.set('ruta', { inputRuta: valorInputRuta })
 	util.aparecerYDesvanecer(tickGuardadoCorrecto,0.1)
    ipcRenderer.send('altaDeScreen:configuracion',{ruta:valorInputRuta})	   
}
function funcionesDeInicio() {
    actualizarPlaceHolder();
    notificarAltaDeScreenHaciaMain()
}
function notificarAltaDeScreenHaciaMain(){
    const ruta = store.get('ruta').inputRuta
    ipcRenderer.send('altaDeScreen:configuracion',{ruta})
}

function actualizarPlaceHolder() {
    let input = document.getElementById('inputRuta')
    let formRutaPokemon = document.getElementById('formRutaPokemon')
    const ruta = store.get('ruta').inputRuta
    if (!ruta) {
        placeholder = '.../miPokemon.js'
        formRutaPokemon.innerHTML = `<input id="inputRuta" type="text" placeholder="${placeholder}">`  
    } else {
        input.value = ruta
    }
}

function ocultarConfiguracion(){
    console.log('envio ocultacion')
    ipcRenderer.send('screens:configurationScreenHide',{})
}

ipcRenderer.on('config:ruta', (event, data) => {
    ipcRenderer.send('config:ruta', {ruta: inputRuta.value})
})