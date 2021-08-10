const juezDeEntrenamiento = require('../../training management/juezDeEntrenamiento')
const util = require('../utils/util')
const entrenamientos = require('../../training management/entrenamientos')
const _ = require('lodash')
/*const Store = require('electron-store')
const store = new Store()*/
const {ipcRenderer} = require('electron')
let pokemon = {}

function funcionesDeInicio() {
    util.crearBotonCerradoConEstilo(contenedor)
    agregarEntrenamientos();
    pedirRutaConfig();
}
function pedirRutaConfig(){
    ipcRenderer.send('config:pedidoRutaCentroDeEntrenamiento',{})
}
ipcRenderer.on('config:pedidoRutaCentroDeEntrenamiento',(event,data) => {
    pokemon = require(data.ruta)

})
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
function guardarEntrenamientoExistoso(nombrePokemon,entrenamientoId){
	ipcRenderer.send('guardarEntrenamiento',{nombrePokemon,entrenamientoId}) 
}
function constatarEntrenamiento(entrenamientoId) {
    try {
        juezDeEntrenamiento.constatarEntrenamiento(pokemon, entrenamientoId);
        guardarEntrenamientoExistoso(pokemon.nombre,entrenamientoId);
        /*mostrarResultadoExitoso(entrenamiento);*/
    } catch (err) {
        console.log('Error! ', err)
        /*mostrarResultadoFallido(entrenamiento,err)*/
    }

}
//const entrenamientosRealizados = store.get('entrenamientosRealizados')
