const config = require('../battle elements/config')
const _ = require('lodash')
const util = require('../views/utils/util')

function sumarPuntajes(unPokemon,tipoDePokemon) {
    return _.sumBy(config.atributosDePokemon, atributo => unPokemon[atributo] / tipoDePokemon.multiplicadoresDeAtributo[atributo])
}

function propertiesConTiposIncorrectos(unPokemon) {
    return _.filter(config.listaAtributosEstado, property => {
        return _.get(config.tiposDeDatoPorAtributo, property) !== typeof _.get(unPokemon, property)
    })
}

module.exports = [{
        id: 'atributosNecesarios',
        comparacionResultadosExitosaInicial: function(unPokemon) {
            const __tieneValorAceptado = property => property === 'dañoRecibido' && unPokemon[property] === 0 ? true : unPokemon[property]
            return _.every(config.listaAtributosEstado, __tieneValorAceptado)
        },
        mensajeResultadoDesigualInicial: function(unPokemon) {
            const __tieneValorAceptado = property => property === 'dañoRecibido' && unPokemon[property] === 0 ? true : unPokemon[property]
            const atributosConValorValido = _.filter(_.keys(unPokemon), __tieneValorAceptado)
            const atributosFaltantes = _.difference(config.listaAtributosEstado, atributosConValorValido);

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
            const tipoDePokemon = require(`../battle elements/TiposDePokemon/${unPokemon.miTipo()}`)
            return sumarPuntajes(unPokemon,tipoDePokemon) <= config.puntajeMaximoPermitido()
        },
        mensajeResultadoDesigualInicial: function(unPokemon) {
        	const tipoDePokemon = require(`../battle elements/TiposDePokemon/${unPokemon.miTipo()}`)
            return relator.anunciarExcesoDePuntaje(unPokemon, sumarPuntajes(unPokemon,tipoDePokemon))
        }
    },
    {
        id: 'metodosNecesarios',
        comparacionResultadosExitosaInicial: function(unPokemon) {
           unPokemon.vitalidad() ;
           unPokemon.recuperarEnergia() ;
           unPokemon.atacar(unPokemon,'basico') ;
           unPokemon.recibirDaño(1000) ;
           unPokemon.miTipo();
           return true 
        },
        mensajeResultadoDesigualInicial: function(unPokemon) {
            return relator.anunciarMetodoNoDeclarado(unPokemon,'')
        }
    },
        {
        id: 'retornoVitalidadCorrecto',
        comparacionResultadosExitosaInicial: function(unPokemon) {
           return vitalidadCorrecta = unPokemon.vitalidad() == unPokemon.vida - unPokemon.dañoRecibido;
 
        },
        mensajeResultadoDesigualInicial: function(unPokemon) {
            return relator.anunciarEntrenamientoDesigual(unPokemon.vida - unPokemon.dañoRecibido,unPokemon.vitalidad())
        }
    }
]