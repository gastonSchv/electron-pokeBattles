const relator = require('../battle elements/relator')
const _ = require('lodash')

module.exports = [
{
	entrenamiento:'devolverNombre',
	input:function(){ return 'bolbasaur'},
	resultadoEsperado: function(input){return input},
	resultadoEvaluado:function(unPokemon,inputDeEvaluacion){return unPokemon.miNombre()},
	resultadosIguales: function(unPokemon){
		const inputDeEvaluacion = this.input()
		return _.isEqual(this.resultadoEsperado(inputDeEvaluacion), this.resultadoEvaluado(unPokemon,inputDeEvaluacion))
	},
	mensajeResultadoDesigual:function(unPokemon){
		const inputDeEvaluacion = this.input()
		return relator.anunciarEntrenamientoDesigual(this.resultadoEsperado(inputDeEvaluacion), this.resultadoEvaluado(unPokemon,inputDeEvaluacion))
	}
}
]