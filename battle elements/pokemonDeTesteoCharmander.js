const juan = require('./entrenadorJuan')
const Pokemon = require('./Pokemons/Pokemon')
const tipoDePokemon = require('./TiposDePokemon/fuego')

const config = require('./config')
 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'charmander',
	tipoDePokemon,
	evolucion:1,
	vida:100,// hacer pruebas para ver porque rompe por condicion de ataque cuando cambio por otros valores
	energia:1500,
	fuerza:1000,
	defensa:1000,
	velocidad:1000
})


module.exports = pokemon