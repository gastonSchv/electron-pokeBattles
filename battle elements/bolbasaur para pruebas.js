const Pokemon = require('./Pokemons/Pokemon')
const tipoDePokemon = require('./TiposDePokemon/planta')
const gasti = require('./entrenadorGasti')

 const pokemon = new Pokemon({
	entrenador: gasti,
	nombre:'bolbasaur',
	tipoDePokemon,
	evolucion:1,
	vida:1000,
	energia:10000,
	fuerza:1000,
	defensa:1000,
	velocidad:1000
})
pokemon.miNombre = () => pokemon.nombre
pokemon.elPokemonMasFuerte = unosPokemones => _.maxBy(unosPokemones, pokemon => pokemon.fuerza)
module.exports = pokemon