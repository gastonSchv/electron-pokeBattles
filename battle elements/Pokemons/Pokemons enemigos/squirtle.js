const juan = require('../../entrenadorJuan')
const Pokemon = require('../Pokemon')
const tipoDePokemon = require('../../TiposDePokemon/agua')

 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'squirtle',
	tipoDePokemon,
	evolucion:1,
	vida:1500,
	energia:500,
	fuerza:1000,
	defensa:1200,
	velocidad:800
})


module.exports = pokemon