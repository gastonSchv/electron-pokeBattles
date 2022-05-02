const { ipcRenderer } = require('electron')
const _ = require('lodash')
const util = require('../utils/util')
const SystemError = require('../../error management/SystemError')
const juezDeBatalla = require('../../evaluation management/juezDeBatalla')

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

function borrarBotonesDeError() {
    const botonesDeError = document.getElementsByClassName("botonDetalleError")
    _.forEach(botonesDeError, botonDeError => {
        botonDeError.style.opacity = 0
        botonDeError.disabled = true
    })
}

function verificarPokemonAntesDeComenzar(data) {
    botonesDeJuego = [botonBatalla, botonJuezDeBatalla, botonMiPokemon, botonCentroDeEntrenamiento]
    botonesIniciales = [botonJuezDeBatalla]
    const _doWithError = err => {
        const systemError = new SystemError(err)

        const botonConfiguracionDiv = document.getElementById("botonConfiguracionDiv")
        util.deshabilitarBotones(botonesDeJuego)
        util.habilitarDetalleResultadoFallido(botonConfiguracionDiv, "mainError", systemError)
        util.colocarFotoMiniaturaMiPokemon(iconoPokemon, '')
    }
    if(data.isError){
        _doWithError(data.err)
    }
    if (data.ruta) {
        try {
            const pokemon = require(`${data.ruta}`)
            juezDeBatalla.pasaTodasLasEvaluaciones(pokemon)
                .then(pasaTodasLasEvaluaciones => {
                    if (pasaTodasLasEvaluaciones) {
                        util.habilitarBotones(botonesDeJuego)
                    }
                    util.habilitarBotones(botonesIniciales)
                    util.colocarFotoMiniaturaMiPokemon(iconoPokemon, pokemon)
                    borrarBotonesDeError()
                })
                .catch(systemError => {
                    _doWithError(systemError)
                })
        } catch (systemError) {
            _doWithError(systemError)
        }
    }
}

function mostrarDetalleError(errMessage, recommendations, originalErrorMessage) { //sumar localizacion
    ipcRenderer.send('detalleDeError', { errMessage, recommendations, originalErrorMessage })
}
ipcRenderer.on('altaDeScreen:landingScreen', (event, data) => {
    verificarPokemonAntesDeComenzar(data)
})
ipcRenderer.on('bloqueoBotonesDeJuego', (event, data) => {
    botonesDeJuego = [botonBatalla, botonMiPokemon, botonCentroDeEntrenamiento]
    if (data.deshabilitarBotones) {
        util.deshabilitarBotones(botonesDeJuego)
    }
})
ipcRenderer.on('altaDeScreen:configuracion', (event, data) => {
    verificarPokemonAntesDeComenzar(data)
})