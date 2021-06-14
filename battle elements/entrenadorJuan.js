const Entrenador = require('./Entrenadores/Entrenador')

const gasti =  new Entrenador({nombre:'Juan'})

gasti.ejecutarEstrategia = (miPokemon,pokemonOponente) => {
	if (miPokemon.energia > 200) return miPokemon.atacar(pokemonOponente,'maximo')
	miPokemon.descansar()	
}

module.exports = gasti