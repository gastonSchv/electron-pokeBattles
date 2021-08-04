const relator = require('../battle elements/relator')

class Entrenamiento {
	constructor(id,titulo,premios,descripcion,inputs){
		this.id = id;
		this.titulo = titulo; 
		this.premios = premios; 
		this.descripcion = descripcion;
		this.inputs = inputs 	
	}
	input(){
	 return 'bolbasaur' 
	}
    resultadoEsperado(unPokemon,inputDeEvaluacion){ 
 	}
    resultadoEvaluado(unPokemon, inputDeEvaluacion) {
 	}
    resultadosIguales(unPokemon) {
        const inputDeEvaluacion = this.input()
        return _.isEqual(this.resultadoEsperado(unPokemon,inputDeEvaluacion), this.resultadoEvaluado(unPokemon, inputDeEvaluacion))
    }
    mensajeResultadoDesigual(unPokemon) {
        const inputDeEvaluacion = this.input()
        return relator.anunciarEntrenamientoDesigual(this.resultadoEsperado(unPokemon,inputDeEvaluacion), this.resultadoEvaluado(unPokemon, inputDeEvaluacion))
    }
}

module.exports = Entrenamiento;