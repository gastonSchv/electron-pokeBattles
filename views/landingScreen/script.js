const { ipcRenderer } = require('electron')
const _ = require('lodash')
const util = require('../utils/util')

let musicaDeBatallaPrendida = true

function funcionesDeInicio() {
    botonConfiguracion.disabled = true
    botonBatalla.disabled = true
    botonJuezDeBatalla.disabled = true
	botonMiPokemon.disabled = true
	botonCentroDeEntrenamiento.disabled = true

    musicaDeBatalla.volume = 1
    musicaDeBatalla.loop = true
    util.crearBotonCerradoConEstilo(contenedor)
    prenderMusica()
}
function apagarMusica() {
    util.apagarMusica(musicaDeBatalla,musicaDeBatallaImg)   
}

function prenderMusica() {
    util.prenderMusica(musicaDeBatalla,musicaDeBatallaImg)
}

function cambiarEstadoMusicaDeBatalla() {
    util.cambiarEstadoMusicaDeBatalla(musicaDeBatalla,musicaDeBatallaPrendida,musicaDeBatallaImg)
    musicaDeBatallaPrendida? musicaDeBatallaPrendida=false:musicaDeBatallaPrendida=true
}
function abrirPantallaDeBatalla() {
    apagarMusica()
    ipcRenderer.send('screens:battleScreen', {})
}
function abrirModalSelectorDeEnemigo(){
    apagarMusica()
    ipcRenderer.send('screens:selectorDeEnemigoScreen',{})
}
function abrirModalConfiguracion() {
    ipcRenderer.send('screens:configurationScreen', {})
}
function abrirModalMiPokemon(){
    ipcRenderer.send('screens:miPokemonScreen',{})
}
function abrirModalDeJuezDeBatalla() {
    apagarMusica()
    ipcRenderer.send('screens:juezDeBatallaScreen', {})
}
function cerrarPantalla(){
	window.close()
}
function abrirModalCentroDeEntrenamiento(){
    ipcRenderer.send('screens:centroDeEntrenamientoScreen', {})    
}
ipcRenderer.on('altaDeScreen:configuracionPrimeraApertura',(event,data) => {
    botonConfiguracion.disabled = false
})
ipcRenderer.on('altaDeScreen:configuracion', (event, data) => {
    botonConfiguracion.disabled = false
    if (data.ruta) {
        botonBatalla.disabled = false
        botonJuezDeBatalla.disabled = false
  		botonMiPokemon.disabled = false
  		botonCentroDeEntrenamiento.disabled = false
    }else{
        botonBatalla.disabled = true
        botonJuezDeBatalla.disabled = true
    	botonMiPokemon.disabled = true
    	botonCentroDeEntrenamiento.disabled = true
    }
})