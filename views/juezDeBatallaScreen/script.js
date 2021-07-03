const juezDeBatalla = require('../../battle elements/juezDeBatalla')
const { ipcRenderer } = require('electron')

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

function mensajeEvaluacionCorrecta(tipoDeEvaluacion){
    return `LA EVALUACION ${tipoDeEvaluacion} A SIDO EXITOSA!`
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

function evaluar(tipoDeEvaluacion, pokemon, evaluacionDeJuez) {
    try {
        evaluacionDeJuez(pokemon);
        agregarEvaluacion(tipoDeEvaluacion, mensajeEvaluacionCorrecta(tipoDeEvaluacion),'tick verde')
    } catch (err) {
        agregarEvaluacion(tipoDeEvaluacion, err.message,'tick rojo')
    }
}

function evaluarEstadoPokemon(pokemon) {
    evaluar('evaluacionEstado', pokemon, juezDeBatalla.verificarEstadoPokemon)
}

ipcRenderer.on('config:ruta', (event, data) => {
    const pokemon = require(`${data.ruta}`)
    evaluarEstadoPokemon(pokemon)
})