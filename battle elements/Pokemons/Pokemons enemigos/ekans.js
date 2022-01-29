const juan = require('../../entrenadorJuan')
const Pokemon = require('../Pokemon')

 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'ekans',
	tipoDePokemon:'veneno',
	evolucion:1,
	vida:1750,
	energia:600,
	fuerza:1500,
	defensa:800,
	velocidad:1100
})


module.exports = pokemon