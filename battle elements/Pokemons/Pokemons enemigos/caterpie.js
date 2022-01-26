const juan = require('../../entrenadorJuan')
const Pokemon = require('../Pokemon')

 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'caterpie',
	tipoDePokemon:'bicho',
	evolucion:1,
	vida:300,
	energia:1100,
	fuerza:1000,
	defensa:2000,
	velocidad:600
})


module.exports = pokemon