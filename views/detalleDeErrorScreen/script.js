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
	const mensajeDeError = esErrorDeResultado(errMessage)? mensajeErrorDeResultado(errMessage):errMessage
	tituloDeError.innerHTML += mensajeDeError
}
function mensajeErrorDeResultado(errMessage){
	return `<p>${errMessage}</p>`.replace('|','<br>')
}
function esErrorDeResultado(errMessage){
	return _.includes(errMessage,'Resultado esperado')
}
function agregarRecomendacion(recomendacion){
	listaDeRecomendaciones.innerHTML += `
			<li class="recomendacion">
			 ${recomendacion}	
			</li>			
	`
}
function agregarRecomendacionesTipicas(recomendaciones){
	const recomendacionesList = recomendaciones.split('*')
	_.forEach(recomendacionesList, agregarRecomendacion)
}
function agregarRecomendacionDeLocacion(localization){
	const [linea,columna,ruta] = localization.split('*')
	agregarRecomendacion(`Revisa la linea ${linea} y columna ${columna} del archivo ${ruta} , al parecer ahí está el problema`)
}
ipcRenderer.on('detalleDeError',(event,data) => {
	 agregarError(data.errMessage)
	 agregarRecomendacionesTipicas(data.recommendations)
	 //agregarRecomendacionDeLocacion(data.localization)
})

