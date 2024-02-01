const Pokemon = require('../Pokemons/Pokemon')
const _ = require('lodash')

const pokemon = new Pokemon({
	nombre:'pikachu',
	tipoDePokemon:'electricidad',
	evolucion:1,
	energia:1000,
	vida:1000,
	fuerza:1000,
	defensa:1000,
	velocidad:1000
})

pokemon.miNombre = () => pokemon.nombre
pokemon.elPokemonMasFuerte = unosPokemones => _.maxBy(unosPokemones, pokemon => pokemon.fuerza)
pokemon.encontrarAlDeFuego = unosPokemones => _.find(unosPokemones, unPokemon => unPokemon.miTipo() == "fuego")
pokemon.obtenerAtributos = pokemon => asd
pokemon.hallarLosDeAguaYFuego = unosPokemones => _.filter(unosPokemones, pokemon => pokemon.miTipo() == 'agua' || pokemon.miTipo() == 'asd' )
module.exports = pokemon


