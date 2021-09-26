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
function agregarRecomendaciones(recomendaciones){
	const recomendacionesList = recomendaciones.split('*')
	_.forEach(recomendacionesList, agregarRecomendacion)
}
ipcRenderer.on('detalleDeError',(event,data) => {
	 agregarError(data.errMessage)
	 agregarRecomendaciones(data.recommendations)
})

