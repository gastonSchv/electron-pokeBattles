const Entrenador = require('./Entrenadores/Entrenador')
const {tiposDeAtaque} = require('./config')
const gasti =  new Entrenador({nombre:'gasti'})
const _ = require('lodash')

gasti.ejecutarEstrategia = (miPokemon,pokemonOponente) => {
  const ataqueVencedor = () => {
    return _.find(tiposDeAtaque, tipoDeAtaque => {
      return  miPokemon.esAtaqueMortal(pokemonOponente,tipoDeAtaque) && miPokemon.energiaSuficiente(tipoDeAtaque)
      }
    )
  }
  if(ataqueVencedor()){
    return miPokemon.atacar(pokemonOponente,ataqueVencedor())
  }  
	if (miPokemon.energia > 200) return miPokemon.atacar(pokemonOponente,'maximo')
	miPokemon.descansar()	
}

module.exports = gasti