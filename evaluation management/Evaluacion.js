const Promise = require('bluebird')

class Evaluacion {
	constructor(id,mensajeResultadoIncorrecto){
		this.id = id
		this.mensajeResultadoIncorrecto = mensajeResultadoIncorrecto
	}
	comparacionResultadosExitosaSync(unPokemon){

	}
	comparacionResultadosExitosa(unPokemon){
		return Promise.resolve(this.comparacionResultadosExitosaSync(unPokemon))
	}
	mensajeResultadoDesigualSync(unPokemon){

	}
	mensajeResultadoDesigual(unPokemon){
		return Promise.resolve(this.mensajeResultadoDesigualSync(unPokemon))
	}
}

module.exports = Evaluacion;