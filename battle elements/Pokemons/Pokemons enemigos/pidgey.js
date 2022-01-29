const juan = require('../../entrenadorJuan')
const Pokemon = require('../Pokemon')

 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'pidgey',
	tipoDePokemon:'volador',
	evolucion:1,
	vida:2600,
	energia:600,
	fuerza:1700,
	defensa:800,
	velocidad:1100
})


module.exports = pokemon