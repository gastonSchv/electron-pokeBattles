const config = require('../battle elements/config')
const _ = require('lodash')

function sumarPuntajes(unPokemon) {
    const tipoDePokemon = require(`../battle elements/TiposDePokemon/${unPokemon.miTipo()}`)
    return _.sumBy(config.atributosDePokemon, atributo => unPokemon[atributo] / tipoDePokemon.multiplicadoresDeAtributo[atributo])
}

function propertiesConTiposIncorrectos(unPokemon) {
    return _.filter(config.listaPropiedadesDeEstado, property => {
        return _.get(config.tiposDeDatoPorAtributo, property) !== typeof _.get(unPokemon, property)
    })
}

module.exports = [{
        id: 'atributosNecesarios',
        comparacionResultadosExitosaInicial: function(unPokemon) {
            const __tieneValorAceptado = property => property === 'dañoRecibido' && unPokemon[property] === 0 ? true : unPokemon[property]
            return _.every(config.listaPropiedadesDeEstado, __tieneValorAceptado)
        },
        mensajeResultadoDesigualInicial: function(unPokemon) {
            const __tieneValorAceptado = property => property === 'dañoRecibido' && unPokemon[property] === 0 ? true : unPokemon[property]
            const atributosConValorValido = _.filter(_.keys(unPokemon), __tieneValorAceptado)
            const atributosFaltantes = _.difference(config.listaPropiedadesDeEstado, atributosConValorValido);

            return relator.anunciarAtributosFaltantes(unPokemon, atributosFaltantes)
        }
    },
    {
        id: 'atributosConValoresPermitidos',
        comparacionResultadosExitosaInicial: function(unPokemon) {
            return _.isEmpty(propertiesConTiposIncorrectos(unPokemon))
        },
        mensajeResultadoDesigualInicial: function(unPokemon) {
            return relator.anunciarAtributosConTipoDeDatoErroneo(unPokemon, propertiesConTiposIncorrectos(unPokemon))
        }
    },
    {
        id: 'puntoDeAtributosMaximoPermitido',
        comparacionResultadosExitosaInicial: function(unPokemon) {
            return sumarPuntajes(unPokemon) <= config.puntajeMaximoPermitido()
        },
        mensajeResultadoDesigualInicial: function(unPokemon) {
            return relator.anunciarExcesoDePuntaje(unPokemon, sumarPuntajes(unPokemon))
        }
    }
]