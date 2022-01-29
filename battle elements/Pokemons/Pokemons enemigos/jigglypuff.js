const juan = require('../../entrenadorJuan')
const Pokemon = require('../Pokemon')

 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'jigglypuff',
	tipoDePokemon:'normal',
	evolucion:1,
	vida:2100,
	energia:600,
	fuerza:1200,
	defensa:800,
	velocidad:1100
})


module.exports = pokemon