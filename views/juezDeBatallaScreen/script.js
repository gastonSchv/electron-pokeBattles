const juezDeBatalla = require('../../battle elements/juezDeBatalla')

function funcionesDeInicio() {
    console.log('asda')
    const contenedorEvaluaciones = document.getElementById('contenedorEvaluaciones');
    agregarEvalucion('pistola');
    agregarEvalucion('pistola');
	agregarEvalucion('pistola');
}

function agregarEvalucion(tipoDeEvaluacion) {
    contenedorEvaluaciones.innerHTML += `
    <div class="contenedorEvaluacion">
        <div id="${tipoDeEvaluacion}" class="evaluaciones">
        </div>
        <div class="resultadoEvaluacion">
        </div>
	</div>`
}