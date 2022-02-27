const _ = require('lodash')
const informacionEvaluaciones = require('../evaluation management/informacionEvaluaciones')
const config = require('./config')

class Relator {
    constructor() {
        this.mensajeFinDeBatalla = 'Fin de Batalla Pokemon';
    }
    stringificarYSepararComas(elemento) {
        return JSON.stringify(elemento).replaceAll(',', ', ')
    }
    deListaComparacionesAString(listaComparaciones) {
        if (_.isEmpty(listaComparaciones)) return '';

        return _.map(listaComparaciones, comparacion => {
            const { nombre, valorEsperado, valorObtenido } = comparacion;
            return `${nombre} => valor esperado: ${valorEsperado} || valorObtenido: ${valorObtenido}`
        })
    }
    anunciarFalta(unPokemon, condicion, listaComparaciones = []) {
        return ` \nEl pokemon ${unPokemon.nombre} no ha verificado : ${condicion}. \n ${this.deListaComparacionesAString(listaComparaciones)}`
    }
    estadoPokemon(unPokemon) {
        return `${unPokemon.nombre} vida: ${unPokemon.vida} | energia: ${unPokemon.energia} | deterioro recibido: ${unPokemon.deterioroRecibido}`
    }
    anunciarCondicionesDeAtaqueFaltante(unPokemon, tipoDeAtaque) {
        this.anunciarFalta(unPokemon, `Condicion de ataque ${tipoDeAtaque}`)
    }
    anunciarEntrenamientoFaltante(unPokemon, tipoDeAtaque) {
        this.anunciarFalta(unPokemon, `Condicion de entrenamiento ${tipoDeAtaque}`)
    }
    anunciarExcesoDePuntaje(unPokemon, puntajeDelPokemon) {
        return `Tu pokemon supera el límite de puntos de atributos permitidos por ${puntajeDelPokemon-config.puntajeMaximoPermitido()} puntos`
    }
    anunciarMetodoNoDeclarado(unPokemon, metodo) {
        return metodo ? `El metodo ${metodo}no se ha encontrado` : 'No se ha encontrado un metodo utilizado'
    }
    anunciarEvaluacionCorrecta(unPokemon, idEvaluacion) {
        const informacionEvaluacion = _.find(informacionEvaluaciones, { id: idEvaluacion })
        return informacionEvaluacion.mensajeResultadoCorrecto
    }
    anunciarEvaluacionIncorrecta(unPokemon, idEvaluacion) {
        const informacionEvaluacion = _.find(informacionEvaluaciones, { id: idEvaluacion })
        return informacionEvaluacion.mensajeResultadoIncorrecto
    }
    anunciarEntrenamientoDesigual(resultadoEsperado, resultadoObtenido) {
        return `Resultado esperado: ${this.stringificarYSepararComas(resultadoEsperado)} | Resultado obtenido: ${resultadoObtenido}`
    }
    anunciarAtributosFaltantes(unPokemon, atributosFaltantes) {
        return `Tu pokemon no cuenta con los atributos requeridos, debe incorporar los siguientes: ${atributosFaltantes.join(', ')}`
    }
    anunciarAtributosConValorNoPermitido(unPokemon, propertiesConTiposIncorrectos) {
        return `Tu pokemon no cuenta con el tipo de dato correcto en todos sus atributos o cuenta con valores no permitidos, se deben modificar los siguientes:\
		 ${propertiesConTiposIncorrectos.join(', ')}`
    }
    anunciarResultadoInesperadoEnMetodo(metodo, resultadoEsperado, resultadoObtenido) {
        return `El metodo ${metodo} ha retornado un valor inesperado\
		${this.anunciarEntrenamientoDesigual(resultadoEsperado,resultadoObtenido)}
		`
    }
    anunciarAtaquesConDeterioroIncorrecto(unPokemon, ataquesConDeterioroIncorrecto) {
        return `Tu pokemon no realiza el deterioro adecuado en los ataques: ${ataquesConDeterioroIncorrecto}`
    }
    anunciarAtaquesConConsumoEnergiaIncorrecto(unPokemon, ataquesConConsumoEnergiaIncorrecto) {
        return `Tu pokemon no consume correctamenta la energia en los ataques: ${ataquesConConsumoEnergiaIncorrecto.join(', ')}`
    }
    anunciarDesmayoIncorrecto(unPokemon) {
        return `Tu pokemon no se desmaya correctamente`
    }
    anunciarRecuperacionEnergiaIncorrecto(unPokemon) {
        return `Tu pokemon no recuperar energia de manera correcta`
    }
}


module.exports = new Relator()