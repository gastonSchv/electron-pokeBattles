const relator = require('../battle elements/relator')
const Promise = require('bluebird')

class Entrenamiento {
    constructor(id, titulo, premios, descripcion, inputs) {
        this.id = id;
        this.titulo = titulo;
        this.premios = premios;
        this.descripcion = descripcion;
        this.inputs = inputs
    }
    resultadoEsperado(unPokemon, inputDeEvaluacion) {}
    resultadoEvaluado(unPokemon, inputDeEvaluacion) {}
    resultadosIguales(unPokemon) {
        return Promise.props({
            resultadoEsperado: this.resultadoEsperado(unPokemon, this.inputs),
            resultadoEvaluado: this.resultadoEvaluado(unPokemon, this.inputs)
        })
        .then(({resultadoEvaluado, resultadoEsperado}) => _.isEqual(resultadoEvaluado, resultadoEsperado))
    }
    mensajeResultadoDesigual(unPokemon) {
        return Promise.props({
            resultadoEsperado: this.resultadoEsperado(unPokemon, this.inputs),
            resultadoEvaluado: this.resultadoEvaluado(unPokemon, this.inputs)
        })
        .then(({resultadoEsperado, resultadoEvaluado}) => relator.anunciarEntrenamientoDesigual(resultadoEsperado, resultadoEvaluado))
    }
}

module.exports = Entrenamiento;