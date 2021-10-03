const juezDeBatalla = require('../../evaluation management/juezDeBatalla')
const { ipcRenderer } = require('electron')
const relator = require('../../battle elements/relator')
const util = require('../utils/util')

function funcionesDeInicio() {
    const contenedorEvaluaciones = document.getElementById('contenedorEvaluaciones');
    pedirRutaConfig()
    util.crearBotonCerradoConEstilo(contenedor)
}

function cerrarPantalla() {
    window.close()
}

function pedirRutaConfig() {
    ipcRenderer.send('config:pedidoRutaJuezDeBatallaScreen', {})
}

function prenderPitidoArbitro() {
    pitidoArbitro.volume = 0.5
    pitidoArbitro.play()
}


function deshabilitarBotonesDeJuego(booleano) {
    ipcRenderer.send('bloqueoBotonesDeJuego:juezDeBatalla', { deshabilitarBotones: booleano })
}

function habilitarDetalleResultadoFallido(idEvaluacion, err) {//agregar localizacion
    const contenedorEvaluacion = document.getElementById(`botonError${idEvaluacion}`)
    contenedorEvaluacion.innerHTML += `
         <button id="botonError${idEvaluacion}" onclick="mostrarDetalleError('\
         ${err.prettyMessage()}','${err.recommendations()}','${err.message()}')" class="botonDetalleError">
            detalle error
        </button>`
}
function realizarEvaluacion(unPokemon,idEvaluacion){
	return evaluar(idEvaluacion, unPokemon, () => juezDeBatalla.constatarEvaluacion(unPokemon,idEvaluacion))	
}
function mostrarDetalleError(errMessage,recommendations,originalErrorMessage){//agregar localizacion
    ipcRenderer.send('detalleDeError',{errMessage,recommendations,originalErrorMessage})
}
function realizarEvaluacionesNecesarias(unPokemon) {
    realizarEvaluacion(unPokemon,'atributosNecesarios')
    realizarEvaluacion(unPokemon,'puntoDeAtributosMaximoPermitido')
}
ipcRenderer.on('config:pedidoRutaJuezDeBatallaScreen', (event, data) => {
    const unPokemon = require(`${data.ruta}`)
    deshabilitarBotonesDeJuego(false)
    realizarEvaluacionesNecesarias(unPokemon)
    window.visualViewport.width > 400 ? prenderPitidoArbitro() : ''
})

function evaluar(idEvaluacion, unPokemon, evaluacionDeJuez) {

    return evaluacionDeJuez(unPokemon)
        .then(() => {
            agregarEvaluacion(idEvaluacion, relator.anunciarEvaluacionCorrecta(unPokemon, idEvaluacion), 'tick verde')
        })
        .catch(err => {
            agregarEvaluacion(idEvaluacion, err.prettyMessage(), 'tick rojo')
            deshabilitarBotonesDeJuego(true)
            habilitarDetalleResultadoFallido(idEvaluacion, err)
        })
}

function agregarEvaluacion(idEvaluacion, mensaje = '', tick) {
    contenedorEvaluaciones.innerHTML += `
    <div id="botonError${idEvaluacion}" class="contenedorEvaluacion">
        <div id="${idEvaluacion}" class="evaluaciones">
        <p class="mensajeEvaluacion">${util.substringSiHaceFalta(mensaje,200)}</p>
        </div>
        <div class="resultadoEvaluacion">
            <img src="../../../assets/images/${tick}.png">
        </div>
    </div>`
}