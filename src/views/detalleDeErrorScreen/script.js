const util = require('../utils/util')
const { ipcRenderer } = require('electron')
const _ = require('lodash')
let index = 0

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
function agregarRecomendacion(titulo,descripcion){
	listaDeRecomendaciones.innerHTML += `
			<li class="recomendacion">
			 ${acordeon(titulo,descripcion)}	
			</li>					
	`
}
function acordeon(titulo,descripcion) {
	index++;
	return `<div class="accordion" id="${index}">
	  <div class="accordion-item">
	    <h2 class="accordion-header" id="heading${index}">
	      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
	        ${titulo}
	      </button>
	    </h2>
	    <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#${index}">
	      <div class="accordion-body">
	        ${descripcion}
	      </div>
	    </div>
	  </div>
	</div>`	
}
function agregarRecomendacionesTipicas(recomendacionesString){
	const recomendacionesCupla = recomendacionesString.split('<>')
	const recomendacionesList = _.map(recomendacionesCupla,recomendacionCupla => {
		const [titulo,descripcion] = recomendacionCupla.split('*')
		return {
			titulo,
			descripcion
		}
	} )
	_.forEach(recomendacionesList,recomendacion => {
		const {titulo,descripcion} = recomendacion; 
		agregarRecomendacion(titulo,descripcion)	
	})
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

