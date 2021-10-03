const Promise = require('bluebird')

class Evaluacion {
	constructor(id,mensajeResultadoIncorrecto){
		this.id = id
		this.mensajeResultadoIncorrecto = mensajeResultadoIncorrecto
	}
	comparacionResultadosExitosaInicial(unPokemon){

	}
	comparacionResultadosExitosa(unPokemon){
		return Promise.resolve(this.comparacionResultadosExitosaInicial(unPokemon))
	}
	mensajeResultadoDesigualInicial(unPokemon){

	}
	mensajeResultadoDesigual(unPokemon){
		return Promise.resolve(this.mensajeResultadoDesigualInicial(unPokemon))
	}
}

module.exports = Evaluacion;