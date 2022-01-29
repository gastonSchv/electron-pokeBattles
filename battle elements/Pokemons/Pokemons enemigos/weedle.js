const juan = require('../../entrenadorJuan')
const Pokemon = require('../Pokemon')

 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'weedle',
	tipoDePokemon:'bicho',
	evolucion:1,
	vida:1800,
	energia:600,
	fuerza:1800,
	defensa:800,
	velocidad:1100
})


module.exports = pokemon