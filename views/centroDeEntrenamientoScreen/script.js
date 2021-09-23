const juezDeEntrenamiento = require('../../training management/juezDeEntrenamiento')
const util = require('../utils/util')
const entrenamientos = require('../../training management/entrenamientos')
const _ = require('lodash')
const { ipcRenderer } = require('electron')
let pokemon = {}

function funcionesDeInicio() {
    util.crearBotonCerradoConEstilo(contenedor)
    agregarEntrenamientos();
    pedirRutaConfig();
}

function pedirRutaConfig() {
    ipcRenderer.send('config:pedidoRutaCentroDeEntrenamiento', {})
}
ipcRenderer.on('config:pedidoRutaCentroDeEntrenamiento', (event, data) => {
    pokemon = require(data.ruta)

})

function agregarEntrenamientos() {
    _.forEach(entrenamientos, agregarEntrenamiento)
}

function cerrarPantalla() {
    window.close()
}

function premioshtml(premios) {
    const __premioEntrenamientoHtml = premio => {
        const { habilidad, valor } = premio;
        return `<div class="premioEntrenamiento">
				<div class="tituloPremioDiv">
				    <p class="tituloPremio">${habilidad.toUpperCase()}</p>
				</div>
				<div class="valorPremioDiv">
				    <p class="valorPremio">+${valor}</p>
				</div>
			</div>`
    }
    return _.map(premios, __premioEntrenamientoHtml).join("")
}

function agregarEntrenamiento(entrenamiento) {
    const { id, titulo, premios, descripcion } = entrenamiento
    entrenamientosGrid.innerHTML += `<div id="${entrenamiento.id}" class="entrenamiento">
                <div class="tituloEntrenamientoDiv">
                    <p class="tituloEntrenamiento">${titulo}</p>
                </div>
                <div class="premiosEntrenamientoGrid">
                    ${premioshtml(premios)}
                </div>
                <div class="descripcionEntrenamientoDiv">
                    <p class="descripcionEntrenamiento">${util.substringSiHaceFalta(descripcion,85)}</p>
                    <div id="cartelEntrenamientoExitoso${id}" class="cartelEntrenamientoExitoso">
                        ENTRENAMIENTO EXITOSO!
                    </div>
                    <div class="descripcionPopover">
                    ${descripcion}
                    </div>
                </div>
                <div id="boton${entrenamiento.id}Div" class="botonEntrenamientoDiv">
                    <button id="boton${entrenamiento.id}" onclick="constatarEntrenamiento('${entrenamiento.id}')" class="btn btn-primary">
                        Realizar entrenamiento
                    </button>
                </div>
            </div>`
    if (juezDeEntrenamiento.hizoElEntrenamiento(entrenamiento.id)) {
    	cambiarEntrenamientoRealizado(entrenamiento.id)
    }
}
function cambiarEntrenamientoRealizado(entrenamientoId){
	cambiarBloqueoEntrenamiento(entrenamientoId)
    cambiarBotonAccionEnTarjeta(entrenamientoId)
}
function cambiarBotonAccionEnTarjeta(entrenamientoId) {
    const botonEntrenamientoDiv = document.getElementById(`boton${entrenamientoId}Div`)
    if (juezDeEntrenamiento.hizoElEntrenamiento(entrenamientoId)) {
        botonEntrenamientoDiv.innerHTML = `
		<button id="botonBorrar${entrenamientoId}" onclick="borrarEntrenamientoDeStore('${entrenamientoId}')" class="btn btn-danger">
    	    Restaurar entrenamiento
   		 </button>`
    }else{
    	botonEntrenamientoDiv.innerHTML = `
    	<button id="boton${entrenamientoId}" onclick="constatarEntrenamiento('${entrenamientoId}')" class="btn btn-primary">
        	Realizar entrenamiento
        </button>`
    }
}
function cambiarBloqueoEntrenamiento(entrenamientoId){
	const botonRealizarEntrenamiento = document.getElementById(`boton${entrenamientoId}`)
    const entrenamiento = document.getElementById(entrenamientoId)
	if(juezDeEntrenamiento.hizoElEntrenamiento(entrenamientoId)){
		entrenamiento.style.opacity = 0.3
    	botonRealizarEntrenamiento.opacity = 0
    	botonRealizarEntrenamiento.disabled = true
	}else{
		entrenamiento.style.opacity = 1
    	botonRealizarEntrenamiento.opacity = 1
    	botonRealizarEntrenamiento.disabled = false
	}
}
function guardarEntrenamientoExistoso(nombrePokemon, entrenamientoId) {
    juezDeEntrenamiento.guardarEntrenamientoExistoso({ nombrePokemon, entrenamientoId })
}

function borrarEntrenamientoDeStore(entrenamientoId) {
    juezDeEntrenamiento.borrarEntrenamientoRealizado({ entrenamientoId })
    cambiarBotonAccionEnTarjeta(entrenamientoId)
    cambiarBloqueoEntrenamiento(entrenamientoId)
}
function habilitarDetalleResultadoFallido(entrenamientoId,err){
    const botonEntrenamientoDiv = document.getElementById(`boton${entrenamientoId}Div`)
    botonEntrenamientoDiv.innerHTML +=`
    <button id="botonError${entrenamientoId}" onclick="mostrarDetalleError('${err.prettyMessage()}','${err.recommendations()}','${err.message()}')" class="botonDetalleError">
        detalle error
    </button>` 
}
function mostrarDetalleError(errMessage,recommendations,originalErrorMessage){
    const botonEntrenamientoDiv = document.getElementById(`botonErrorobtenSusAtributos`)
    ipcRenderer.send('detalleDeError',{errMessage,recommendations,originalErrorMessage})
}
function  constatarEntrenamiento(entrenamientoId) {
    const cartelEntrenamientoExitoso = document.getElementById(`cartelEntrenamientoExitoso${entrenamientoId}`)
    
    juezDeEntrenamiento.constatarEntrenamiento(pokemon, entrenamientoId)
    .then(() => {
        guardarEntrenamientoExistoso(pokemon.nombre, entrenamientoId);
        cambiarEntrenamientoRealizado(entrenamientoId);
        sonidoEntrenamientoCorrecto.play();
        util.aparecerYDesvanecer(cartelEntrenamientoExitoso,0.1)
    })
    .catch(err => {
        sonidoEntrenamientoIncorrecto.play()
        habilitarDetalleResultadoFallido(entrenamientoId,err)
    })

}