const juan = require('../../entrenadorJuan')
const Pokemon = require('../Pokemon')

 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'zubat',
	tipoDePokemon:'veneno',
	evolucion:1,
	vida:1500,
	energia:600,
	fuerza:1250,
	defensa:800,
	velocidad:1100
})


module.exports = pokemon