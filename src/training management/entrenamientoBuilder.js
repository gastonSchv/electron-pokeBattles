const informacionEntrenamientos = require ('./informacionEntrenamientos')
const comportamientoEntrenamientos = require ('./comportamientoEntrenamientos')
const Entrenamiento = require('./Entrenamiento')
const _ = require('lodash')

function entrenamientoBuilder(entrenamientoId){
	const informacionEntrenamiento = _.find(informacionEntrenamientos,{id:entrenamientoId})
	const comportamientoEntrenamiento = _.find(comportamientoEntrenamientos,{id:entrenamientoId})
	const {id,titulo,premios,descripcion,inputs} = informacionEntrenamiento
	const {resultadoEsperado,resultadoEvaluado} = comportamientoEntrenamiento

	const entrenamiento = new Entrenamiento(id,titulo,premios,descripcion,inputs)
	entrenamiento.resultadoEsperado = resultadoEsperado;
	entrenamiento.resultadoEvaluado = resultadoEvaluado;

	return entrenamiento
}

module.exports = entrenamientoBuilder; 