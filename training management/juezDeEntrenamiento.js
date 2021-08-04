const _ = require('lodash')
const entrenamientos = require('./entrenamientos')

class JuezDeEntrenamiento {
    constructor() {

    }
    traducirErrorDeSistema(err) {
    	return `Error de sistema: ${JSON.stringify(err)}`
    }
    constatarEntrenamiento(unPokemon, entrenamiento) {
        const entrenamientoSeleccionado = _.find(entrenamientos, { id:entrenamiento });

        try {
            if (!entrenamientoSeleccionado.resultadosIguales(unPokemon)) {
                throw { message: entrenamientoSeleccionado.mensajeResultadoDesigual(unPokemon)}
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
}

module.exports = new JuezDeEntrenamiento()