const { ipcRenderer } = require('electron')


let musicaDeBatallaPrendida = true;

function funcionesDeInicio() {
    let musicaDeBatalla = document.getElementById("musicaDeBatalla");
    const botonDeBatalla = document.getElementById('botonBatalla');
    const botonConfiguracion = document.getElementById('botonConfiguracion')
    botonConfiguracion.disabled = true
    botonBatalla.disabled = true
    musicaDeBatalla.volume = 0.9
    musicaDeBatalla.loop = true
    prenderMusica()
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
    ipcRenderer.send('screens:configurationScreen', {

    })
}
ipcRenderer.on('altaDeScreen:configuracion',(event,data) => {
  botonBatalla.disabled = false
  botonConfiguracion.disabled = false
})