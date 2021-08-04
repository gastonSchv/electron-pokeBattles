const juezDeEntrenamiento = require('../../training management/juezDeEntrenamiento')
const pokemon = require('../../battle elements/Pokemons/Pokemons enemigos/bolbasaur')
const util = require('../utils/util')
const entrenamientos = require('../../training management/entrenamientos')
const _ = require('lodash')

function funcionesDeInicio() {
    util.crearBotonCerradoConEstilo(contenedor)
    agregarEntrenamientos();
}

function agregarEntrenamientos(){
    _.forEach(entrenamientos,agregarEntrenamiento)
}

function cerrarPantalla() {
    window.close()
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

function agregarEntrenamiento(entrenamiento) {
    const { titulo, premios, descripcion } = entrenamiento
    entrenamientosGrid.innerHTML += `<div id="${entrenamiento.id}" class="entrenamiento">
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
                    <button onclick="constatarEntrenamiento('${entrenamiento.id}')" class="btn btn-primary">
                        Realizar entrenamiento
                    </button>
                </div>
            </div>`
}

function constatarEntrenamiento(entrenamientoId) {
    try {
        juezDeEntrenamiento.constatarEntrenamiento(pokemon, entrenamientoId);
        console.log('Entrenamiento completado con exíto')
        /*asignarPuntosDeHabilidades(pokemon,entrenamiento);
        mostrarResultadoExitoso(entrenamiento);*/
    } catch (err) {
        console.log('Error! ', err)
        /*mostrarResultadoFallido(entrenamiento,err)*/
    }

}