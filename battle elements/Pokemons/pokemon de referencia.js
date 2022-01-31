const Pokemon = require('./Pokemon')

const pokemonDeReferencia =  new Pokemon({
	nombre: "pokemonDeReferencia", 
	tipoDePokemon: "agua", 
	evolucion: 1, 
	vida: 1000, 
	energia: 1000, 
	fuerza: 1000, 
	defensa: 1000, 
	velocidad:1000 ,
	estrategia: "bajaEstrategia"
});


module.exports = pokemonDeReferencia