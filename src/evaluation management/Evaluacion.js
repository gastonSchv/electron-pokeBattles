const Promise = require('bluebird')

class Evaluacion {
	constructor(id,mensajeResultadoIncorrecto){
		this.id = id
		this.mensajeResultadoIncorrecto = mensajeResultadoIncorrecto
	}
	comparacionResultadosExitosaInicial(unPokemon){

	}
	comparacionResultadosExitosa(unPokemon){
		const pokemonDummy = _.cloneDeep(unPokemon)

		try {
			this.comparacionResultadosExitosaInicial(pokemonDummy)
			return Promise.resolve(this.comparacionResultadosExitosaInicial(pokemonDummy))
		} catch(err) {
			return Promise.reject(this.comparacionResultadosExitosaInicial(pokemonDummy))
		}
	}
	mensajeResultadoDesigualInicial(unPokemon){

	}
	mensajeResultadoDesigual(unPokemon){
		const pokemonDummy = _.cloneDeep(unPokemon)

		return Promise.resolve(this.mensajeResultadoDesigualInicial(pokemonDummy))
	}
}

module.exports = Evaluacion;