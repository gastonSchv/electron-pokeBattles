const relator = require('../battle elements/relator')

class Entrenamiento {
	constructor(id,titulo,premios,descripcion,inputs){
		this.id = id;
		this.titulo = titulo; 
		this.premios = premios; 
		this.descripcion = descripcion;
		this.inputs = inputs 	
	}
    resultadoEsperado(unPokemon,inputDeEvaluacion){ 
 	}
    resultadoEvaluado(unPokemon, inputDeEvaluacion) {
 	}
    resultadosIguales(unPokemon) {
        return _.isEqual(this.resultadoEsperado(unPokemon,this.inputs), this.resultadoEvaluado(unPokemon, this.inputs))
    }
    mensajeResultadoDesigual(unPokemon) {
        const resultadoEsperado = JSON.stringify(this.resultadoEsperado(unPokemon,this.inputs))
        const resultadoEvaluado = JSON.stringify(this.resultadoEvaluado(unPokemon, this.inputs))
        return relator.anunciarEntrenamientoDesigual(resultadoEsperado, resultadoEvaluado)
    }
}

module.exports = Entrenamiento;