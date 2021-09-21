const _ = require('lodash')
const config = require('../battle elements/config')

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
},
{
	id:'obtenSusAtributos',
	resultadoEsperado: function(unPokemon,inputDeEvaluacion){ return _.pick(inputDeEvaluacion,config.atributosDePokemon)},
	resultadoEvaluado: function(unPokemon,inputDeEvaluacion){ return unPokemon.obtenerAtributos(inputDeEvaluacion)},
},
{
    id: 'fusionDePokemones',
    resultadoEsperado:function(unPokemon,inputDeEvaluacion){
    	const dummyObj = {}
    	
    	_.forEach(config.atributosDePokemon.concat('nombre'), atributo => {
    		dummyObj[atributo] = unPokemon[atributo] + inputDeEvaluacion[atributo]
    	})

    	return dummyObj 
    },
    resultadoEvaluado: function(unPokemon,inputDeEvaluacion){return unPokemon.fusionarConPokemon(inputDeEvaluacion)}

}
]