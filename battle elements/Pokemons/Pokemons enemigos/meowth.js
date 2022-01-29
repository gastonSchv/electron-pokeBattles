const juan = require('../../entrenadorJuan')
const Pokemon = require('../Pokemon')

 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'meowth',
	tipoDePokemon:'normal',
	evolucion:1,
	vida:2000,
	energia:600,
	fuerza:2300,
	defensa:800,
	velocidad:1100
})


module.exports = pokemon