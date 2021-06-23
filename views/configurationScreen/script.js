const Store = require('electron-store')
const store = new Store()
const { ipcRenderer } = require('electron')

function guardarRutaPokemon() {
    const valorInputRuta = inputRuta.value
    if (valorInputRuta) {
        store.set('ruta', { inputRuta: valorInputRuta })
    }
}

function functionesDeInicio() {
    actualizarPlaceHolder();
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
    console.log('Envio ruta pokemon', {
        ruta: inputRuta.value
    })
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

