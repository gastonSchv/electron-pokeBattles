const juan = require('../../entrenadorJuan')
const Pokemon = require('../Pokemon')
const tipoDePokemon = require('../../TiposDePokemon/agua')

 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'squirtle',
	tipoDePokemon,
	evolucion:1,
	vida:1500,
	energia:1500,
	fuerza:500,
	defensa:500,
	velocidad:1000
})


module.exports = pokemon