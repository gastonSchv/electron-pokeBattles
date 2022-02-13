const juezDeBatalla = require('../../evaluation management/juezDeBatalla')
const { ipcRenderer } = require('electron')
const relator = require('../../battle elements/relator')
const util = require('../utils/util')
const _ = require('lodash')

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
function reload(){
    ipcRenderer.send('reloadScreen:juezDeBatallaScreen',{})
}
function agregarCuadroResumen(unPokemon){
    const __addCeroIfNecessary = list => {
        if(list.length < 10){
            return `0${list.length}`
        }
        return list.length
    }
    return juezDeBatalla.obtenerResultadoEvaluaciones(unPokemon)
    .then(({evaluacionesCorrectas,evaluacionesIncorrectas}) => {
        imagenDeFondo.innerHTML +=`      
            <div id="cuadroResumen">
                <div id="resultados">
                    <div id="resultadoPostivo">
                        ${__addCeroIfNecessary(evaluacionesCorrectas)} evaluaciones correctas    
                        <img src="../../../assets/images/tick verde.png">
                    </div>
                    <div id="resultadoNegativo">
                        ${__addCeroIfNecessary(evaluacionesIncorrectas)} evaluaciones incorrectas
                        <img src="../../../assets/images/tick rojo.png">
                    </div>
                </div>
                <div id="botonEvaluarDiv">
                    <button id="botonEvaluar" class="btn btn-primary" onclick="reload()">
                        EVALUAR!
                    </button>
                </div>
            </div>`
    })
}
function deshabilitarBotonesDeJuego(booleano) {
    ipcRenderer.send('bloqueoBotonesDeJuego:juezDeBatalla', { deshabilitarBotones: booleano })
}

function habilitarDetalleResultadoFallido(idEvaluacion, err) {//agregar localizacion
    const contenedorEvaluacion = document.getElementById(`contenedorEvaluacion${idEvaluacion}`)
    util.habilitarDetalleResultadoFallido(contenedorEvaluacion,idEvaluacion,err)
}
function realizarEvaluacion(unPokemon,idEvaluacion){
	return evaluar(idEvaluacion, unPokemon, () => juezDeBatalla.constatarEvaluacion(unPokemon,idEvaluacion))	
}
function mostrarDetalleError(errMessage,recommendations,originalErrorMessage){//agregar localizacion
    ipcRenderer.send('detalleDeError',{errMessage,recommendations,originalErrorMessage})
}
function realizarEvaluacionesNecesarias(unPokemon) {
    _.forEach(juezDeBatalla.obtenerEvaluaciones(), evaluacion => {
        realizarEvaluacion(unPokemon,evaluacion.id)
    })
}
ipcRenderer.on('config:pedidoRutaJuezDeBatallaScreen', (event, data) => {
    const cuadro = document.getElementById('cuadroResumen')
    const unPokemon = require(`${data.ruta}`)
    
    cuadro?0:agregarCuadroResumen(unPokemon)
    deshabilitarBotonesDeJuego(false)
    eliminarEvaluaciones()
    realizarEvaluacionesNecesarias(unPokemon)
    window.visualViewport.width > 400 ? prenderPitidoArbitro() : ''
})
function evaluar(idEvaluacion, unPokemon, evaluacionDeJuez) {

    return evaluacionDeJuez(unPokemon)
        .then(() => {
            agregarEvaluacion(idEvaluacion, relator.anunciarEvaluacionCorrecta(unPokemon, idEvaluacion), true)
        })
        .catch(err => {
            agregarEvaluacion(idEvaluacion, relator.anunciarEvaluacionIncorrecta(unPokemon,idEvaluacion), false)
            deshabilitarBotonesDeJuego(true)
            habilitarDetalleResultadoFallido(idEvaluacion, err)
        })
}
function eliminarEvaluaciones(){
    contenedorEvaluaciones.innerHTML = ``
}
function agregarEvaluacion(idEvaluacion, mensaje = '', resultadoExitoso) {
    resultadoExitoso? tick = 'tick verde': tick = 'tick rojo';
    resultadoExitoso? colorPuntos = 'green' : colorPuntos= 'red';

    contenedorEvaluaciones.innerHTML += `
    <div id="contenedorEvaluacion${idEvaluacion}" class="contenedorEvaluacion">
        <div id="${idEvaluacion}" class="evaluaciones">
        <p class="mensajeEvaluacion">${util.substringSiHaceFalta(mensaje,75)}</p>
        </div>
        <div class="resultadoEvaluacion">
            <img src="../../../assets/images/${tick}.png">
        </div>
    </div>`

    document.getElementById(idEvaluacion).style.border = `1px dotted ${colorPuntos}`
}