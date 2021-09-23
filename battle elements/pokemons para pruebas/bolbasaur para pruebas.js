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
pokemon.obtenerAtributos = pokemon => asd
pokemon.fusionarConPokemon = unPokemon => {
	const dummyObj = {}   	
    	_.forEach(['nombre','vida','energia','fuerza','defensa','velocidad'], atributo => {
    		console.log(atributo,pokemon[atributo],unPokemon[atributo])
    		dummyObj[atributo] = pokemon[atributo] + unPokemon[atributo]
    	})
    	console.log(dummyObj)
    	return dummyObj 
}
pokemon.cuantoPesa = unNombrePokemon => {
	var options = {
		url:`https://pokeapi.co/api/v2/pokemon/${unNombrePokemon}`
	}
	return request(options)
	.then(pokemon => pokemon)
} 
module.exports = pokemon