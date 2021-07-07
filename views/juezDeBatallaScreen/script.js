const juezDeBatalla = require('../../battle elements/juezDeBatalla')
const { ipcRenderer } = require('electron')
const relator = require('../../battle elements/Relator')

function funcionesDeInicio() {
    const contenedorEvaluaciones = document.getElementById('contenedorEvaluaciones');
    pedirRutaConfig()
    prenderPitidoArbitro()
}

function pedirRutaConfig() {
    ipcRenderer.send('config:pedidoRutaJuezDeBatallaScreen', {})
}
function prenderPitidoArbitro(){
    const pitidoArbitro = document.getElementById('pitidoArbitro')
    pitidoArbitro.volume = 0.5
    pitidoArbitro.play()
}
function agregarEvaluacion(tipoDeEvaluacion, mensaje = '',tick) {
     contenedorEvaluaciones.innerHTML += `
    <div class="contenedorEvaluacion">
        <div id="${tipoDeEvaluacion}" class="evaluaciones">
        ${mensaje}
        </div>
        <div class="resultadoEvaluacion">
            <img src="../../../assets/images/${tick}.png">
        </div>
	</div>`
}

function evaluar(tipoDeEvaluacion, unPokemon, evaluacionDeJuez) {
    try {
        evaluacionDeJuez(unPokemon);
        agregarEvaluacion(tipoDeEvaluacion, relator.anunciarEvaluacionCorrecta(unPokemon,tipoDeEvaluacion),'tick verde')
    } catch (err) {
        agregarEvaluacion(tipoDeEvaluacion, err.message,'tick rojo')
    }
}

function evaluarEstadoPokemon(unPokemon) {
    evaluar('evaluacionEstado', unPokemon, () => juezDeBatalla.verificarEstadoPokemon(unPokemon))
}
function evaluarAtaqueBasico(unPokemon){
	evaluar('evaluacionAtaqueBasico',unPokemon,() => juezDeBatalla.verificarAtaqueBasico(unPokemon))
}

ipcRenderer.on('config:ruta', (event, data) => {
    const unPokemon = require(`${data.ruta}`)
    evaluarEstadoPokemon(unPokemon)
    evaluarAtaqueBasico(unPokemon)
})