const _ = require('lodash')
const config = require('../battle elements/config')
const request = require('request-promise')
const pokemonApi = require('./PokemonApi')
const CreatedError = require('../error management/CreatedError')

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
        return _.find(inputDeEvaluacion, unPokemon => unPokemon.miTipo() == 'fuego')
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
    id: 'miEntrenador',
    resultadoEsperado:function(unPokemon,inputDeEvaluacion){
    	const entrenador = unPokemon.entrenador;	 
    
        if(!entrenador){
            throw new CreatedError({
                message:"No se ha encontrado al entrenador Pokemon",
                stopPrettify:true,
                recommendations:[
                {
                    titulo: "Campo faltante",
                    descripcion: "Es necesario la propiedad entrenador forme parte del estado de tu Pokemon"
                }
            ]})
        }
    	if(_.isObject(entrenador) || !_.isString(entrenador.nombre)){
    		throw new CreatedError({
    			message:"No se ha encontrado un nombre de entrenador valido",
    			stopPrettify:true,
                recommendations:[
    			{
    				titulo: "Tipo de dato incorrecto en entrenador",
    				descripcion: "Verifica que el entrenador sea un objeto"
    			},
                {
                    titulo: "Tipo de dato incorrecto en nombre del entrenador",
                    descripcion: "Verifica que el nombre del entrenador sea una string"
                }
    		]})
    	}
	
    	return entrenador.nombre
    },
    resultadoEvaluado: function(unPokemon,inputDeEvaluacion){return unPokemon.entrenador.nombre}
},
{
    id: 'soloAguaYFuego',
    resultadoEsperado:function(unPokemon,inputDeEvaluacion){       
        return _.filter(inputDeEvaluacion, pokemon => pokemon.miTipo() == 'agua' || pokemon.miTipo() == 'fuego')
    },
    resultadoEvaluado: function(unPokemon,inputDeEvaluacion){return unPokemon.entrenador.hallarLosDeAguaYFuego(inputDeEvaluacion)}

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
    resultadoEvaluado: function(unPokemon,inputDeEvaluacion){return unPokemon.entrenador.cuantoPesa(inputDeEvaluacion)}

},
{
    id: 'armarCadenaDeEvoluciones',
    resultadoEsperado:function(unPokemon,inputDeEvaluacion){
        const pokemonVolume = pokemon => {
/*            const {weight,height}
*/            return ""
        }       
        return pokemonApi.getPokemonList(inputDeEvaluacion)
        .then(pokemonList => _.max(pokemonList,pokemonVolume))
    },
    resultadoEvaluado: function(unPokemon,inputDeEvaluacion){return }

}
]