const informacionEvaluaciones = require ('./informacionEvaluaciones')
const comportamientoEvaluaciones = require ('./comportamientoEvaluaciones')
const Evaluacion = require('./Evaluacion')
const _ = require('lodash')

function evaluacionBuilder(evaluacionId){
	const informacionEvaluacion = _.find(informacionEvaluaciones,{id:evaluacionId})
	const comportamientoEvaluacion = _.find(comportamientoEvaluaciones,{id:evaluacionId})
	const {id,mensajeResultadoIncorrecto} = informacionEvaluacion
	const {comparacionResultadosExitosaSync,mensajeResultadoDesigualSync} = comportamientoEvaluacion

	const evaluacion = new Evaluacion(id,mensajeResultadoIncorrecto)
	evaluacion.comparacionResultadosExitosaSync = comparacionResultadosExitosaSync;
	evaluacion.mensajeResultadoDesigualSync = mensajeResultadoDesigualSync;

	return evaluacion
}

module.exports = evaluacionBuilder; 