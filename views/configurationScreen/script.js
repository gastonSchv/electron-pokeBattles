const Store = require('electron-store')
const store = new Store()
const { ipcRenderer } = require('electron')

function guardarRutaPokemon() {
    const tickGuardadoCorrecto = document.getElementById('tickGuardadoCorrecto')
    const valorInputRuta = inputRuta.value
    store.set('ruta', { inputRuta: valorInputRuta })
 	aparecerYDesvanecer(tickGuardadoCorrecto)	   
}
function aparecerYDesvanecer(htmlComponent, pace = 0.1) {
    var opacity = 0;
    var variationOpacityPace = pace;
    var counter = 1;
    var intervalId = setInterval(function() {
        if (counter / 2 == 1 / variationOpacityPace) {
            clearInterval(intervalId)
        }
        if (counter > 1 / variationOpacityPace) {
            opacity -= variationOpacityPace
            htmlComponent.style.opacity = opacity
        } else {
            opacity += variationOpacityPace
            htmlComponent.style.opacity = opacity
        }
        counter++;
    }, 70)
}
function functionesDeInicio() {
    actualizarPlaceHolder();
    notificarAltaDeScreenHaciaMain()
}
function notificarAltaDeScreenHaciaMain(){
    ipcRenderer.send('altaDeScreen:configuracion',{})
}

function actualizarPlaceHolder() {
    let inputRuta = document.getElementById('inputRuta')
    let formRutaPokemon = document.getElementById('formRutaPokemon')
    const ruta = store.get('ruta').inputRuta
    if (!ruta) {
        placeholder = '.../miPokemon.js'
        formRutaPokemon.innerHTML = `<input id="inputRuta" type="text" placeholder="${placeholder}">`  
    } else {
        inputRuta.value = ruta
    }
}

function notificarRutaPokemon() {
    ipcRenderer.send('config:ruta', {
        ruta: inputRuta.value
    })
}
function ocultarConfiguracion(){
    console.log('envio ocultacion')
    ipcRenderer.send('screens:configurationScreenHide',{})
}

ipcRenderer.on('config:ruta', (event, data) => {
    notificarRutaPokemon()
})