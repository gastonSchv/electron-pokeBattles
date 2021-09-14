const juan = require('../../entrenadorJuan')
const Pokemon = require('../Pokemon')
const tipoDePokemon = require('../../TiposDePokemon/planta')

 const pokemon = new Pokemon({
	entrenador: juan,
	nombre:'oddish',
	tipoDePokemon,
	evolucion:1,
	vida:2000,
	energia:600,
	fuerza:500,
	defensa:800,
	velocidad:1100
})


module.exports = pokemon