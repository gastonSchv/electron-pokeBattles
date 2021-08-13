const _ = require('lodash')
const entrenamientos = require('./entrenamientos')
const Store = require('electron-store')
const store = new Store();
const config = require('../battle elements/config')
const unPokemon = require('../battle elements/bolbasaur para pruebas')


class JuezDeEntrenamiento {
    constructor() {

    }
    traducirErrorDeSistema(err) {
        return `Error de sistema: ${err.message}`
    }
    constatarEntrenamiento(unPokemon, entrenamiento) {
        const entrenamientoSeleccionado = _.find(entrenamientos, { id: entrenamiento });
        try {
            if (!entrenamientoSeleccionado.resultadosIguales(unPokemon)) {
                throw { message: entrenamientoSeleccionado.mensajeResultadoDesigual(unPokemon) }
            }
        } catch (err) {

            throw { message: this.traducirErrorDeSistema(err) }
        }
    }
    constatarEntrenamientoAtaques(unPokemon, ataqueExistente) {
        if (ataqueExistente == 'fuerte') {
            return unPokemon.entrenarAtaqueFuerte() == 'Entrenamiento ataque fuerte completado'
        } else if (ataqueExistente == 'maximo') {
            return unPokemon.entrenarAtaqueMaximo() == 'Entrenamiento ataque maximo completado'
        } else {
            throw { message: `Ataque ${ataqueExistente} desconocido` }
        }
    }
    tieneModificacionDeEstadisticas(unPokemon) {
        return _.some(this.entrenamientosRealizados(unPokemon), entrenamiento => _.isEqual(unPokemon.nombre, entrenamiento.nombrePokemon))
    }
    entrenamientosRealizadosGlobal(){
        return store.get('entrenamientosRealizados') || [] 
    }
    entrenamientosRealizados(unPokemon) {
        return _.filter(this.entrenamientosRealizadosGlobal(), ({ nombrePokemon }) => _.isEqual(nombrePokemon, unPokemon.nombre))
    }
    obtenerInformacionEntrenamientosRealizados(unPokemon) {
        return _(this.entrenamientosRealizados(unPokemon))
            .map(entrenamientoRealizado => _.find(entrenamientos, { id: entrenamientoRealizado.entrenamientoId }))
            .value()
    }
    modificacionEstadisticasPorEntrenamiento(unPokemon) { // devuelve array de objetitos con dos properties . atributo : 'defensa' , valor:100
        const atributos = _.map(config.atributosDePokemon, atributo => {
            return { atributo, valor: 0 }
        })
        const __sumarModificacion = (premios) => {
            _.forEach(premios, ({ habilidad, valor }) => _.find(atributos, atributo => _.isEqual(atributo.atributo, habilidad)).valor += valor)
        }
        _.forEach(this.obtenerInformacionEntrenamientosRealizados(unPokemon), ({ premios }) => __sumarModificacion(premios))

        return atributos.concat({ atributo: 'energiaLimite', valor: _.find(atributos, ({ atributo }) => _.isEqual(atributo, 'energia')).valor })
    }
    hizoElEntrenamiento(unEntrenamientoId) {
        return _.some(this.entrenamientosRealizadosGlobal(), ({ entrenamientoId }) => _.isEqual(entrenamientoId, unEntrenamientoId))
    }
    tieneModificacionDeAtributo(unPokemon, atributoEvaluado) {
        atributoEvaluado == 'energiaLimite' ? atributoEvaluado = 'energia' : atributoEvaluado;

        return _.some(this.obtenerInformacionEntrenamientosRealizados(unPokemon), ({ premios }) => {
            return _.some(premios, premio => _.isEqual(premio.habilidad, atributoEvaluado))
        })
    }
    entrenamientoPreexistente(entrenamiento) {
        return _.some(this.entrenamientosRealizadosGlobal(), ({ entrenamientoId }) => _.isEqual(entrenamientoId, entrenamiento.entrenamientoId))
    }
    guardarEntrenamientoExistoso(entrenamiento) {
        if (!this.entrenamientoPreexistente(entrenamiento)) {
            store.set('entrenamientosRealizados', this.entrenamientosRealizadosGlobal().concat(entrenamiento))
        }
    }
    borrarEntrenamientoRealizado(entrenamiento) {
        const __ListadoEntrenamientosRealizadosSin = entrenamiento => {
            return _.filter(this.entrenamientosRealizadosGlobal(),({entrenamientoId}) => !_.isEqual(entrenamiento.entrenamientoId,entrenamientoId))
        }
        if (this.entrenamientoPreexistente(entrenamiento)){
            console.log('deberia borrar el entrenamiento',entrenamiento.entrenamientoId)
            store.set('entrenamientosRealizados',__ListadoEntrenamientosRealizadosSin(entrenamiento))
        }
    }
}

module.exports = new JuezDeEntrenamiento()