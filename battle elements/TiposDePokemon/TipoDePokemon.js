const _  = require ('lodash')

class TipoDePokemon {
	constructor({nombre,multiplicadoresDeAtributo,energiaParaAtaques,energiaDeRecuperacion}){
		this.nombre = nombre;
		this.multiplicadoresDeAtributo = multiplicadoresDeAtributo;
		this.energiaParaAtaques = energiaParaAtaques;
		this.energiaDeRecuperacion = energiaDeRecuperacion;
	}
	multiplicadorDeAtributo(atributo){
		return _.get(this.multiplicadoresDeAtributo,atributo)
	}
	energiaParaAtaqueEspecial(pokemon){
		return pokemon.energia	
	}
	energiaParaAtaque(tipoDeAtaque,pokemon){
		if(tipoDeAtaque == 'especial'){
			return this.energiaParaAtaqueEspecial(pokemon)
		}
		return _.get(this.energiaParaAtaques,tipoDeAtaque)
	}
}

module.exports = TipoDePokemon