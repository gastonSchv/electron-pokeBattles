const juan = require('../../entrenadorJuan')
const Pokemon = require('../Pokemon')
const tipoDePokemon = require('../../TiposDePokemon/fuego')

 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'charmander',
	tipoDePokemon,
	evolucion:1,
	vida:500,// hacer pruebas para ver porque rompe por condicion de ataque cuando cambio por otros valores
	energia:1000,
	fuerza:1000,
	defensa:1000,
	velocidad:1000
})


module.exports = pokemon