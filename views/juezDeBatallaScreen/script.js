const juezDeBatalla = require('../../battle elements/juezDeBatalla')
const { ipcRenderer } = require('electron')
const relator = require('../../battle elements/Relator')
const util = require('../utils/util')

function funcionesDeInicio() {
    const contenedorEvaluaciones = document.getElementById('contenedorEvaluaciones');
    pedirRutaConfig()
	// prenderPitidoArbitro() por ahora apagado hasta solucionar que suena cuando esta oculta
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
     const __substringSiHaceFalta = mensaje => {
        return mensaje.length > 220? `${mensaje.substring(0,220)}...`:mensaje
     }
     contenedorEvaluaciones.innerHTML += `
    <div class="contenedorEvaluacion">
        <div id="${tipoDeEvaluacion}" class="evaluaciones">
        <p class="mensajeEvaluacion">${__substringSiHaceFalta(mensaje)}</p>
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
    }
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
})