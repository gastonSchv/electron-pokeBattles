const Pokemon = require('../Pokemons/Pokemon')
const _ = require('lodash')

const pokemon = new Pokemon({
	nombre:'squartle',
	tipoDePokemon:'agua',
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
module.exports = pokemon