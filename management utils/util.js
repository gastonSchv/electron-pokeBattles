const CreatedError = require('../error management/CreatedError')
const SystemError = require('../error management/SystemError')
const _ = require('lodash')

class ManagementUtil {
    constructor() {}

    constatarAccion(unPokemon, listaDeAcciones, accionId) {
        try {
            const accionSeleccionada = _.find(listaDeAcciones, { id: accionId });
            return accionSeleccionada.comparacionResultadosExitosa(unPokemon)
                .then(comparacionResultadosExitosa => {
                    if (!comparacionResultadosExitosa) {
                        return accionSeleccionada.mensajeResultadoDesigual(unPokemon)
                            .then(mensaje => { throw new CreatedError({ message: mensaje }) })
                    }
                })
                .catch(err => {
                    if (err.isCreatedError) {
                        throw err
                    }
                    throw new SystemError(err);
                })
        } catch (err) {
            if (err.isCreatedError) {
                return Promise.reject(err)
            }
            return Promise.reject(new SystemError(err))
        }
    }
}

module.exports = new ManagementUtil();