const Pokemon = require('../Pokemons/Pokemon')
const tipoDePokemon = require('../TiposDePokemon/agua')
const gasti = require('../entrenadorGasti')
const _ = require('lodash')

const pokemon = new Pokemon({
	entrenador: gasti,
	nombre:'squartle',
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
module.exports = pokemon