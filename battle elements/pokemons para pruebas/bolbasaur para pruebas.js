const Pokemon = require('../Pokemons/Pokemon')
const tipoDePokemon = require('../TiposDePokemon/planta')
const gasti = require('../entrenadorGasti')
const _ = require('lodash')
const request = require('request-promise')

const pokemon = new Pokemon({
	entrenador: gasti,
	nombre:'bolbasaurDePrueba',
	tipoDePokemon,
	evolucion:1,
	vida:1000,
	energia:1000,
	fuerza:1000,
	defensa:1000,
	velocidad:1000
})
pokemon.miNombre = () => pokemon.nombre
pokemon.elPokemonMasFuerte = unosPokemones => _.maxBy(unosPokemones, pokemon => pokemon.fuerza)
pokemon.obtenerAtributos = function(){return asd}
pokemon.fusionarConPokemon = unPokemon => {
	const dummyObj = {}   	
    	_.forEach(['nombre','vida','energia','fuerza','defensa','velocidad'], atributo => {
    		dummyObj[atributo] = pokemon[atributo] + unPokemon[atributo]
    	})
    	return 123123 
}
pokemon.cuantoPesa = unNombrePokemon => {
	var options = {
		url:`https://pokeapi.co/api/v2/pokemon/${unNombrePokemon}`,
		json:true
	}
	return request(options)
	.then(pokemon => pokemon.height)
} 
module.exports = pokemon