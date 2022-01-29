const juan = require('../../entrenadorJuan')
const Pokemon = require('../Pokemon')

 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'oddish',
	tipoDePokemon:'planta',
	evolucion:1,
	vida:700,
	energia:600,
	fuerza:1200,
	defensa:800,
	velocidad:1100
})


module.exports = pokemon