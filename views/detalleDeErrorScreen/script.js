const util = require('../utils/util')
const { ipcRenderer } = require('electron')
const _ = require('lodash')

function funcionesDeInicio(){
    util.crearBotonCerradoConEstilo(contenedor)

}

function cerrarPantalla(){
    window.close()
}
function agregarError(errMessage){
	tituloDeError.innerHTML = errMessage
}
function agregarRecomendacion(recomendacion){
	listaDeRecomendaciones.innerHTML += `
			<li class="recomendacion">
			 ${recomendacion}	
			</li>			
	`
}
function agregarRecomendaciones(recomendaciones){
	const recomendacionesList = recomendaciones.split('*')
	_.forEach(recomendacionesList, agregarRecomendacion)
}
ipcRenderer.on('detalleDeError',(event,data) => {
	 agregarError(data.errMessage)
	 agregarRecomendaciones(data.recommendations)
})

