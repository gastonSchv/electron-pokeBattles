const juezDeBatalla = require('../../battle elements/juezDeBatalla')
const { ipcRenderer } = require('electron')

function funcionesDeInicio() {
    const contenedorEvaluaciones = document.getElementById('contenedorEvaluaciones');
    pedirRutaConfig()
}

function pedirRutaConfig() {
    ipcRenderer.send('config:pedidoRutaJuezDeBatallaScreen', {})
}

function agregarEvaluacion(tipoDeEvaluacion, mensajeDeError = '') {
    console.log(tipoDeEvaluacion,'4')
	
	const tick = 'tick verde';
     contenedorEvaluaciones.innerHTML += `
    <div class="contenedorEvaluacion">
        <div id="${tipoDeEvaluacion}" class="evaluaciones">
        ${mensajeDeError}
        </div>
        <div class="resultadoEvaluacion">
            <img src="../../../assets/images/${tick}.png">
        </div>
	</div>`
}

function evaluar(tipoDeEvaluacion, pokemon, evaluacionDeJuez) {
    console.log(pokemon.nombre,'3')
    
    try {
        evaluacionDeJuez(pokemon);
        agregarEvaluacion(tipoDeEvaluacion)
    } catch (err) {
        agregarEvaluacion(tipoDeEvaluacion, err.message)
    }
}

function evaluarEstadoPokemon(pokemon) {
    console.log(pokemon.nombre,'2')
    evaluar('evaluacionEstado', pokemon, juezDeBatalla.verificarEstadoPokemon)
}

ipcRenderer.on('config:ruta', (event, data) => {
    const pokemon = require(`${data.ruta}`)
    console.log(pokemon.nombre,'1')
    evaluarEstadoPokemon(pokemon)
})