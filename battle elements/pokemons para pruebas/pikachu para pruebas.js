const Pokemon = require('../Pokemons/Pokemon')
const gasti = require('../entrenadorGasti')
const _ = require('lodash')

const pokemon = new Pokemon({
	//entrenador: gasti,
	entrenador: 'gasti',
	nombre:'pikachu',
	tipoDePokemon:'electricidad',
	evolucion:1,
	energia:1000,
	vida:1000,
	fuerza:1000,
	defensa:1000,
	velocidad:1000
})
pokemon.miNombre = () => pokemon.nombre
pokemon.elPokemonMasFuerte = unosPokemones => _.maxBy(unosPokemones, pokemon => pokemon.fuerza)
pokemon.obtenerAtributos = pokemon => asd
module.exports = pokemon