const _  = require ('lodash')

class TipoDePokemon {
	constructor({nombre,multiplicadoresDeAtributo,energiaParaAtaques}){
		this.nombre = nombre;
		this.multiplicadoresDeAtributo = multiplicadoresDeAtributo;
		this.energiaParaAtaques = energiaParaAtaques; 
	}
	multiplicadorDeAtributo(atributo){
		return _.get(this.multiplicadoresDeAtributo,atributo)
	}
	energiaParaAtaque(tipoDeAtaque){
		return _.get(this.energiaParaAtaques,tipoDeAtaque)
	}
}

module.exports = TipoDePokemon