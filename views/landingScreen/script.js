const { ipcRenderer } = require('electron')
const _ = require('lodash')
const util = require('../utils/util')
const SystemError = require('../../error management/SystemError')


let musicaDeBatallaPrendida = true
let botonesDeJuego = []

function funcionesDeInicio() {
    botonesDeJuego = [botonBatalla, botonJuezDeBatalla, botonMiPokemon, botonCentroDeEntrenamiento]
    util.deshabilitarBotones(botonesDeJuego)
    ipcRenderer.send('altaDeScreen:landingScreen', {})
    musicaDeBatalla.volume = 1
    musicaDeBatalla.loop = true
    util.crearBotonCerradoConEstilo(contenedor)
    prenderMusica()
}

function apagarMusica() {
    util.apagarMusica(musicaDeBatalla, musicaDeBatallaImg)
}

function prenderMusica() {
    util.prenderMusica(musicaDeBatalla, musicaDeBatallaImg)
}

function cambiarEstadoMusicaDeBatalla() {
    util.cambiarEstadoMusicaDeBatalla(musicaDeBatalla, musicaDeBatallaPrendida, musicaDeBatallaImg)
    musicaDeBatallaPrendida ? musicaDeBatallaPrendida = false : musicaDeBatallaPrendida = true
}

function abrirPantallaDeBatalla() {
    apagarMusica()
    ipcRenderer.send('screens:battleScreen', {})
}

function abrirModalSelectorDeEnemigo() {
    apagarMusica()
    ipcRenderer.send('screens:selectorDeEnemigoScreen', {})
}

function abrirModalConfiguracion() {
    ipcRenderer.send('screens:configurationScreen', {})
}

function abrirModalMiPokemon() {
    ipcRenderer.send('screens:miPokemonScreen', {})
}

function abrirModalDeJuezDeBatalla() {
    apagarMusica()
    ipcRenderer.send('screens:juezDeBatallaScreen', {})
}

function cerrarPantalla() {
    window.close()
}

function consultarRutaValida() {
    ipcRenderer.send('rutaValida', {})
}

function abrirModalCentroDeEntrenamiento() {
    ipcRenderer.send('screens:centroDeEntrenamientoScreen', {})
}
function borrarBotonesDeError(){
    const botonesDeError = document.getElementsByClassName("botonDetalleError")
    _.forEach(botonesDeError, botonDeError => {
        botonDeError.style.opacity = 0
        botonDeError.disabled = true
    })
}
function verificarPokemonAntesDeComenzar(data) {
    botonesDeJuego = [botonBatalla, botonJuezDeBatalla, botonMiPokemon, botonCentroDeEntrenamiento]
    if (data.ruta) {
        try {
            const pokemon = require(data.ruta)
            util.habilitarBotones(botonesDeJuego)
            util.colocarFotoMiniaturaMiPokemon(iconoPokemon, pokemon)
            borrarBotonesDeError()
        } catch (err) {
            const systemError = new SystemError(err)
            util.deshabilitarBotones(botonesDeJuego)
            const botonConfiguracionDiv = document.getElementById("botonConfiguracionDiv")
            util.habilitarDetalleResultadoFallido(botonConfiguracionDiv,"mainError",systemError)
            util.colocarFotoMiniaturaMiPokemon(iconoPokemon, '')
        }
    }
}
function mostrarDetalleError(errMessage,recommendations,originalErrorMessage){//sumar localizacion
    ipcRenderer.send('detalleDeError',{errMessage,recommendations,originalErrorMessage})
}
ipcRenderer.on('altaDeScreen:landingScreen', (event, data) => {
    verificarPokemonAntesDeComenzar(data)
})
ipcRenderer.on('bloqueoBotonesDeJuego', (event, data) => {
    botonesDeJuego = [botonBatalla, botonMiPokemon, botonCentroDeEntrenamiento]
    if (!data.deshabilitarBotones) {
        consultarRutaValida()
    } else {
        util.deshabilitarBotones(botonesDeJuego)
    }
})
ipcRenderer.on('rutaValida', (event, data) => {
    util.habilitarBotones(botonesDeJuego.concat(botonJuezDeBatalla))
})
ipcRenderer.on('altaDeScreen:configuracion', (event, data) => {
    verificarPokemonAntesDeComenzar(data)
})