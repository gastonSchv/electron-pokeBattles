const juan = require('../../entrenadorJuan')
const Pokemon = require('../Pokemon')

 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'psyduck',
	tipoDePokemon:'agua',
	evolucion:1,
	vida:1500,
	energia:700,
	fuerza:1500,
	defensa:800,
	velocidad:1100
})


module.exports = pokemon