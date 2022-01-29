const juan = require('../../entrenadorJuan')
const Pokemon = require('../Pokemon')

 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'vulpix',
	tipoDePokemon:'fuego',
	evolucion:1,
	vida:2500,
	energia:600,
	fuerza:1800,
	defensa:800,
	velocidad:1100
})


module.exports = pokemon