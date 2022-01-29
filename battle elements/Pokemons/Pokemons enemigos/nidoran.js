const juan = require('../../entrenadorJuan')
const Pokemon = require('../Pokemon')

 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'nidoran',
	tipoDePokemon:'veneno',
	evolucion:1,
	vida:1300,
	energia:600,
	fuerza:1300,
	defensa:800,
	velocidad:1100
})


module.exports = pokemon