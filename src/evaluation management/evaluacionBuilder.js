const informacionEvaluaciones = require ('./informacionEvaluaciones')
const comportamientoEvaluaciones = require ('./comportamientoEvaluaciones')
const Evaluacion = require('./Evaluacion')
const _ = require('lodash')

function evaluacionBuilder(evaluacionId){
	const informacionEvaluacion = _.find(informacionEvaluaciones,{id:evaluacionId})
	const comportamientoEvaluacion = _.find(comportamientoEvaluaciones,{id:evaluacionId})
	const {id,mensajeResultadoIncorrecto} = informacionEvaluacion
	const {comparacionResultadosExitosaInicial,mensajeResultadoDesigualInicial} = comportamientoEvaluacion

	const evaluacion = new Evaluacion(id,mensajeResultadoIncorrecto)
	evaluacion.comparacionResultadosExitosaInicial = comparacionResultadosExitosaInicial;
	evaluacion.mensajeResultadoDesigualInicial = mensajeResultadoDesigualInicial;

	return evaluacion
}

module.exports = evaluacionBuilder; 