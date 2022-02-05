    const config = require('../battle elements/config')
    const _ = require('lodash')
    const util = require('../views/utils/util')

    function sumarPuntajes(unPokemon, tipoDePokemon) {
        return _.sumBy(config.atributosDePokemon, atributo => {
            return _.divide(_.get(unPokemon,atributo)?_.get(unPokemon,atributo):0,tipoDePokemon.multiplicadoresDeAtributo[atributo])
    })}

    function propertiesConTiposIncorrectos(unPokemon) {
        return _.filter(config.listaAtributosEstado, property => {
            return _.get(config.tiposDeDatoPorAtributo, property) !== typeof _.get(unPokemon, property)
        })
    }

    function propertiesConValorIncorrecto(unPokemon) {
        return _.filter(config.listaAtributosEstado, property => {
            const propertyType = typeof _.get(unPokemon, property)
            return propertyType == 'number' ? _.get(unPokemon, property) > 0 : true
        })
    }

    function propertiesConValoresNoPermitidos(unPokemon) {
        return _.uniq(propertiesConTiposIncorrectos(unPokemon).concat(propertiesConValorIncorrecto(unPokemon)))
    }

    function atributosInalteradosExcepto(atributos, pokemonInicial, pokemonFinal) {
        const valoresDeAtributos = pokemonIncialSoloConAtributosParaComparacion => {
            return _.map(config.listaAtributosEstado, atributo => _.get(pokemonIncialSoloConAtributosParaComparacion, atributo))
        }
        return _.isEqual(valoresDeAtributos(_.omit(pokemonInicial, atributos)), valoresDeAtributos(_.omit(pokemonFinal, atributos)))
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
                return relator.anunciarAtributosConValorNoPermitido(unPokemon, propertiesConValoresNoPermitidos(unPokemon))
            }
        },
        {
            id: 'puntoDeAtributosMaximoPermitido',
            comparacionResultadosExitosaInicial: function(unPokemon) {
                const tipoDePokemon = require(`../battle elements/TiposDePokemon/Tipos/${unPokemon.miTipo()}`)
                return sumarPuntajes(unPokemon, tipoDePokemon) <= config.puntajeMaximoPermitido()
            },
            mensajeResultadoDesigualInicial: function(unPokemon) {
                const tipoDePokemon = require(`../battle elements/TiposDePokemon/Tipos/${unPokemon.miTipo()}`)
                return relator.anunciarExcesoDePuntaje(unPokemon, sumarPuntajes(unPokemon, tipoDePokemon))
            }
        },
        {
            id: 'metodosNecesarios',
            comparacionResultadosExitosaInicial: function(unPokemon) {
                unPokemon.vitalidad();
                unPokemon.recuperarEnergia();
                unPokemon.atacar(unPokemon, 'basico');
                unPokemon.recibirDaño(1000);
                unPokemon.miTipo();
                unPokemon.desmayarse();
                return true
            },
            mensajeResultadoDesigualInicial: function(unPokemon) {
                return relator.anunciarMetodoNoDeclarado(unPokemon, '')
            }
        },
        {
            id: 'retornoVitalidadCorrecto',
            comparacionResultadosExitosaInicial: function(unPokemon) {
                return vitalidadCorrecta = unPokemon.vitalidad() == unPokemon.vida - unPokemon.dañoRecibido;

            },
            mensajeResultadoDesigualInicial: function(unPokemon) {
                return relator.anunciarResultadoInesperadoEnMetodo('vitalidad()', unPokemon.vida - unPokemon.dañoRecibido, unPokemon.vitalidad())
            }
        },
        {
            id: 'retornoMiTipoValido',
            comparacionResultadosExitosaInicial: function(unPokemon) {
                return util.esTipoAceptado(unPokemon.miTipo())

            },
            mensajeResultadoDesigualInicial: function(unPokemon) {
                return relator.anunciarResultadoInesperadoEnMetodo('miTipo()', config.tiposDePokemonAceptados, unPokemon.miTipo())
            }
        },
        {
            id: 'dañoDeAtaquesDisponiblesCorrecto',
            comparacionResultadosExitosaInicial: function(unPokemon) {
                return _.isEmpty(juezDeBatalla.ataquesConDañoIncorrecto(unPokemon)) && !_.isEmpty(juezDeBatalla.ataquesDisponibles(unPokemon))
            },
            mensajeResultadoDesigualInicial: function(unPokemon) {
                return relator.anunciarAtaquesConDañoIncorrecto(unPokemon, juezDeBatalla.ataquesConDañoIncorrecto(unPokemon))
            }
        },
        {
            id: 'energiaConsumidaPorAtaqueCorrecto',
            comparacionResultadosExitosaInicial: function(unPokemon) {
                return _.isEmpty(juezDeBatalla.ataquesConConsumoEnergiaIncorrecto(unPokemon)) && !_.isEmpty(juezDeBatalla.ataquesDisponibles(unPokemon))
            },
            mensajeResultadoDesigualInicial: function(unPokemon) {
                return relator.anunciarAtaquesConConsumoEnergiaIncorrecto(unPokemon, juezDeBatalla.ataquesConConsumoEnergiaIncorrecto(unPokemon))
            }
        },
        {
            id: 'desmayarseCorrectamente',
            comparacionResultadosExitosaInicial: function(unPokemon) {
                const energiaParaComparacion = 100;
                const pokemonDummy = _.cloneDeep(unPokemon);
                const otroPokemonDummy = _.cloneDeep(unPokemon);
                pokemonDummy.energia = energiaParaComparacion;
                pokemonDummy.desmayarse(9999);
                const recuperaEnergiaAdecuada = pokemonDummy.energia - energiaParaComparacion == config.energiaDeDesmayo;
                otroPokemonDummy.energia = energiaParaComparacion;
                otroPokemonDummy.desmayarse(110)
                const recuperarHastaElLimite = otroPokemonDummy.energia == 110

                return recuperaEnergiaAdecuada && atributosInalteradosExcepto(['energia'], unPokemon, pokemonDummy) && recuperarHastaElLimite
            },
            mensajeResultadoDesigualInicial: function(unPokemon) {
                return relator.anunciarDesmayoIncorrecto(unPokemon)
            }
        }, {
            id: 'recuperarEnergiaCorrectamente',
            comparacionResultadosExitosaInicial: function(unPokemon) {
                const energiaParaComparacion = 100;
                const pokemonDummy = _.cloneDeep(unPokemon);
                const otroPokemonDummy = _.cloneDeep(unPokemon);
                pokemonDummy.energia = energiaParaComparacion;
                pokemonDummy.recuperarEnergia(9999);
                
                const recuperaEnergiaAdecuada = pokemonDummy.energia - energiaParaComparacion == juezDeBatalla.tipoDePokemon(pokemonDummy).energiaDeRecuperacion;
                otroPokemonDummy.energia = energiaParaComparacion;
                otroPokemonDummy.recuperarEnergia(110)
                const recuperarHastaElLimite = otroPokemonDummy.energia == 110
                
                return recuperaEnergiaAdecuada && atributosInalteradosExcepto(['energia'], unPokemon, pokemonDummy) && recuperarHastaElLimite
            },
            mensajeResultadoDesigualInicial: function(unPokemon) {
                return relator.anunciarRecuperacionEnergiaIncorrecto(unPokemon)
            }
        }
    ]