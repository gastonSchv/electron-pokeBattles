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
	energiaParaAtaque(tipoDeAtaque){
		return _.get(this.energiaParaAtaques,tipoDeAtaque)
	}
}

module.exports = TipoDePokemon