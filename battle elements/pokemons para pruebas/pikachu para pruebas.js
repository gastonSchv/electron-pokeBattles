const Pokemon = require('../Pokemons/Pokemon')
const _ = require('lodash')

const pokemon = new Pokemon({
	nombre:'pikachu' //hacer que si hay un error desconocido te diga el error original si no encuentra prettifier e indentar agregar location y archivo
	tipoDePokemon:'electricidad',
	evolucion:1,
	energia:1000,
	vida:1000,
	fuerza:1000,
	defensa:1000,
	velocidad:1000
})
pokemon.miNombre = () => "pokemon.nombre"
pokemon.elPokemonMasFuerte = unosPokemones => _.maxBy(unosPokemones, pokemon => pokemon.fuerza)
pokemon.obtenerAtributos = pokemon => asd
module.exports = pokemon