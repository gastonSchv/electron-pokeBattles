const juezDeBatalla = require('../../evaluation management/juezDeBatalla')
const { ipcRenderer } = require('electron')
const relator = require('../../battle elements/relator')
const util = require('../utils/util')

function funcionesDeInicio() {
    const contenedorEvaluaciones = document.getElementById('contenedorEvaluaciones');
    pedirRutaConfig()
    util.crearBotonCerradoConEstilo(contenedor)
}
function cerrarPantalla(){
    window.close()
}
function pedirRutaConfig() {
    ipcRenderer.send('config:pedidoRutaJuezDeBatallaScreen', {})
}
function prenderPitidoArbitro(){
    pitidoArbitro.volume = 0.5
    pitidoArbitro.play()
}
function agregarEvaluacion(tipoDeEvaluacion, mensaje = '',tick) {
     	contenedorEvaluaciones.innerHTML += `
    <div id="botonError${tipoDeEvaluacion}" class="contenedorEvaluacion">
        <div id="${tipoDeEvaluacion}" class="evaluaciones">
        <p class="mensajeEvaluacion">${util.substringSiHaceFalta(mensaje,200)}</p>
        </div>
        <div class="resultadoEvaluacion">
            <img src="../../../assets/images/${tick}.png">
        </div>
	</div>`
}
function deshabilitarBotonesDeJuego(booleano){
	ipcRenderer.send('bloqueoBotonesDeJuego:juezDeBatalla',{deshabilitarBotones:booleano})
}
function evaluar(tipoDeEvaluacion, unPokemon, evaluacionDeJuez) {
    try {
        evaluacionDeJuez(unPokemon);
        agregarEvaluacion(tipoDeEvaluacion, relator.anunciarEvaluacionCorrecta(unPokemon,tipoDeEvaluacion),'tick verde')
    } catch (err) {
        agregarEvaluacion(tipoDeEvaluacion, err.message,'tick rojo')
        deshabilitarBotonesDeJuego(true)
        habilitarDetalleResultadoFallido(tipoDeEvaluacion,err)
    }
}
function habilitarDetalleResultadoFallido(tipoDeEvaluacion,err){
		const contenedorEvaluacion = document.getElementById(`botonError${tipoDeEvaluacion}`)
     	contenedorEvaluacion.innerHTML += `
	     <button id="botonError${tipoDeEvaluacion}" onclick="mostrarDetalleError('${err.prettyMessage()}','${err.recommendations()}','${err.message()}')" class="botonDetalleError">
        	detalle error
        </button>`
}
function evaluarEstadoPokemon(unPokemon) {
    evaluar('evaluacionEstado', unPokemon, () => juezDeBatalla.verificarEstadoPokemon(unPokemon))
}
function evaluarAtaqueBasico(unPokemon){
	evaluar('evaluacionAtaqueBasico',unPokemon,() => juezDeBatalla.verificarAtaqueBasico(unPokemon))
}
function evaluarDanoDeAtaquesDisponibles(unPokemon){
	evaluar('evaluacionDanoDeAtaquesDisponibles',unPokemon,() => juezDeBatalla.verificarDanoDeAtaquesDisponibles(unPokemon))
}
function realizarEvaluacionesNecesarias(unPokemon){
	evaluarEstadoPokemon(unPokemon)
    evaluarAtaqueBasico(unPokemon)
 	evaluarDanoDeAtaquesDisponibles(unPokemon)
}
ipcRenderer.on('config:pedidoRutaJuezDeBatallaScreen', (event, data) => {

    const unPokemon = require(`${data.ruta}`)
    deshabilitarBotonesDeJuego(false)
    realizarEvaluacionesNecesarias(unPokemon)    
	window.visualViewport.width > 400? prenderPitidoArbitro():''
})