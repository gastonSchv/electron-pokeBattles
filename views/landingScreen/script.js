const { ipcRenderer } = require('electron')
const _ = require('lodash')

let musicaDeBatallaPrendida = true;

function funcionesDeInicio() {
    let musicaDeBatalla = document.getElementById("musicaDeBatalla");
    const botonDeBatalla = document.getElementById('botonBatalla');
    const botonConfiguracion = document.getElementById('botonConfiguracion')
    botonConfiguracion.disabled = true
    botonBatalla.disabled = true
    botonJuezDeBatalla.disabled = true
    musicaDeBatalla.volume = 1
    musicaDeBatalla.loop = true
    //prenderMusica()
}

function prenderMusica() {
    musicaDeBatalla.play()
    musicaDeBatallaPrendida = true;
    musicaDeBatallaImg.src = "../../../assets/images/audio on.png"
}

function apagarMusica() {
    musicaDeBatallaPrendida = false;
    musicaDeBatalla.pause()
    musicaDeBatallaImg.src = "../../../assets/images/audio off.png"
}

function cambiarEstadoMusicaDeBatalla() {
    if (musicaDeBatallaPrendida) {
        apagarMusica()
    } else {
        prenderMusica()
    }
}

function abrirPantallaDeBatalla() {
    apagarMusica()
    ipcRenderer.send('screens:battleScreen', {})
}

function abrirModalConfiguracion() {
    ipcRenderer.send('screens:configurationScreen', {})
}

function abrirModalDeJuezDeBatalla() {
    apagarMusica()
    console.log('mando juezDeBatallaScreen')
    ipcRenderer.send('screens:juezDeBatallaScreen', {})
}
ipcRenderer.on('altaDeScreen:configuracion', (event, data) => {
    botonConfiguracion.disabled = false
    console.log(data.ruta)
    if (data.ruta) {
        botonBatalla.disabled = false
        botonJuezDeBatalla.disabled = false
    }else{
        botonBatalla.disabled = true
        botonJuezDeBatalla.disabled = true
    }
})