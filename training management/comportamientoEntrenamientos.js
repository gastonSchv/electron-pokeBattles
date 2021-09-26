const _ = require('lodash')
const config = require('../battle elements/config')
const request = require('request-promise')

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
    id: 'encuentraAlDeFuego',
    resultadoEsperado:function(unPokemon,inputDeEvaluacion){
        return _.find(inputDeEvaluacion, ({tipoDePokemon}) => tipoDePokemon.nombre == 'fuego')
    },
    resultadoEvaluado: function(unPokemon,inputDeEvaluacion){return unPokemon.encontrarAlDeFuego(inputDeEvaluacion)}

},
{
    id: 'ordenalosPorVida',
    resultadoEsperado:function(unPokemon,inputDeEvaluacion){       
        const pokemonesOrdenados = _.sortBy(inputDeEvaluacion, pokemon => 1/(pokemon.vida+10000000))
        return pokemonesOrdenados
    },
    resultadoEvaluado: function(unPokemon,inputDeEvaluacion){return unPokemon.ordenarPorVida(inputDeEvaluacion)}
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

},
{
    id: 'dimeCuantoPesa',
    resultadoEsperado:function(unPokemon,inputDeEvaluacion){
        var options = {
            url:`https://pokeapi.co/api/v2/pokemon/${inputDeEvaluacion}`,
            json:true
        }       
        return request(options)
        .then(pokemon => pokemon.weight) 
    },
    resultadoEvaluado: function(unPokemon,inputDeEvaluacion){return unPokemon.cuantoPesa(inputDeEvaluacion)}

}
]