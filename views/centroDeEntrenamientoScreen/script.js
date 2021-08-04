const juezDeEntrenamiento = require('../../training management/juezDeEntrenamiento')
const pokemon = require('../../battle elements/Pokemons/Pokemons enemigos/bolbasaur')
const util = require('../utils/util')
const entrenamientos = require('../../training management/entrenamientos')
const _ = require('lodash')

function funcionesDeInicio() {
    util.crearBotonCerradoConEstilo(contenedor)
    agregarEntrenamiento('dimeTuNombre')
}

function cerrarPantalla() {
    window.close()
}

function obtenerEntrenamiento(entrenamientoId) {
    return _.find(entrenamientos, { id: entrenamientoId })
}

function premioshtml(premios) {
    const __premioEntrenamientoHtml = premio => {
    	const {habilidad,valor} = premio;
    	return `<div class="premioEntrenamiento">
				<div class="tituloPremioDiv">
				    <p class="tituloPremio">${habilidad.toUpperCase()}</p>
				</div>
				<div class="valorPremioDiv">
				    <p class="valorPremio">+${valor}</p>
				</div>
			</div>`
    }
    return _.map(premios,__premioEntrenamientoHtml).join("")
}

function agregarEntrenamiento(entrenamientoId) {
    const { titulo, premios, descripcion } = obtenerEntrenamiento(entrenamientoId)
    entrenamientosGrid.innerHTML += `<div id="${entrenamientoId}" class="entrenamiento">
                <div class="tituloEntrenamientoDiv">
                    <p class="tituloEntrenamiento">${titulo}</p>
                </div>
                <div class="premiosEntrenamientoGrid">
                    ${premioshtml(premios)}
                </div>
                <div class="descripcionEntrenamientoDiv">
                    <p class="descripcionEntrenamiento">${descripcion}</p>
                </div>
                <div class="botonEntrenamientoDiv">
                    <button onclick="constatarEntrenamiento('${entrenamientoId}')" class="btn btn-primary">
                        Realizar entrenamiento
                    </button>
                </div>
            </div>`
}

function constatarEntrenamiento(entrenamiento) {
    try {
        juezDeEntrenamiento.constatarEntrenamiento(pokemon, entrenamiento);
        console.log('Entrenamiento completado con exíto')
        /*asignarPuntosDeHabilidades(pokemon,entrenamiento);
        mostrarResultadoExitoso(entrenamiento);*/
    } catch (err) {
        console.log('Error! ', err)
        /*mostrarResultadoFallido(entrenamiento,err)*/
    }

}