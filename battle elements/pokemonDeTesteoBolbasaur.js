const Pokemon = require('./Pokemons/Pokemon')
const tipoDePokemon = require('./TiposDePokemon/planta')
const gasti = require('./entrenadorGasti')

 const pokemon = new Pokemon({
	entrenador: gasti,
	nombre:'bolbasaur',
	tipoDePokemon,
	evolucion:1,
	vida:10000,
	energia:1000,
	fuerza:1000,
	defensa:1000,
	velocidad:1000
})


module.exports = pokemon