const _ = require('lodash')

module.exports = [
{
	id:'dimeTuNombre',
	resultadoEsperado: function(unPokemon,inputDeEvaluacion){ return unPokemon.nombre},
	resultadoEvaluado: function(unPokemon,inputDeEvaluacion){ return unPokemon.miNombre()},
},
{
	id:'quienEsElMasFuerte',
	resultadoEsperado: function(unPokemon,inputDeEvaluacion){ return _.maxBy(inputDeEvaluacion, pokemon => pokemon.fuerza)},
	resultadoEvaluado: function(unPokemon,inputDeEvaluacion){ return unPokemon.elPokemonMasFuerte(inputDeEvaluacion)},
}
]