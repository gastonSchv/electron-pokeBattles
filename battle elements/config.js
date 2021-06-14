const _ = require('lodash')

class config {
	constructor(){
	this.tiposDeAtaque = ['basico','fuerte','maximo'];	
	this.ataquesVerificables = ['fuerte','maximo'];
	this.multiplicadoresDeAtaque = {
		basico : 10,
		fuerte : 15,
		maximo : 25
	}
	this.atributosDePokemon  =  ['vida','energia','fuerza','defensa','velocidad'];
	this.puntajePorAtributo = 1000 ; 	
	}
	puntajeMaximoPermitido(){
		return this.atributosDePokemon.length * this.puntajePorAtributo
	}
	multiplicadorDeAtaque(tipoDeAtaque){
		return _.get(this.multiplicadoresDeAtaque,tipoDeAtaque)
	}
}

module.exports = new config()