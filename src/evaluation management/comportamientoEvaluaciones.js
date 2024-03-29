    const config = require('../battle elements/config')
    const _ = require('lodash')
    const managementUtil = require('../management utils/util')
    const createdError = require('../error management/CreatedError')

    function sumarPuntajes(unPokemon, tipoDePokemon) {
        return _.sumBy(config.atributosDePokemon, atributo => {
            const division = _.divide(_.get(unPokemon,atributo)?_.get(unPokemon,atributo):0,tipoDePokemon.multiplicadoresDeAtributo[atributo]);
            return division
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
                const __tieneValorAceptado = property => property === 'deterioroRecibido' && unPokemon[property] === 0 ? true : unPokemon[property]
                return _.every(config.listaAtributosEstado, __tieneValorAceptado)
            },
            mensajeResultadoDesigualInicial: function(unPokemon) {
                const __tieneValorAceptado = property => property === 'deterioroRecibido' && unPokemon[property] === 0 ? true : unPokemon[property]
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
                if(!managementUtil.esTipoValido(unPokemon.miTipo())){
                    throw createdError({message:`Tipo de Pokemon ${unPokemon.miTipo()}
                    inválido. Los tipos válidos son: ${config.tiposDePokemonAceptados}`})    
                }
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
                unPokemon.recibirDeterioro(1000);
                unPokemon.miTipo();
                unPokemon.desmayarse();
                unPokemon.atacar(unPokemon, 'basico');
                return true
            },
            mensajeResultadoDesigualInicial: function(unPokemon) {
                return relator.anunciarMetodoNoDeclarado(unPokemon, '')
            }
        },
        {
            id: 'retornoVitalidadCorrecto',
            comparacionResultadosExitosaInicial: function(unPokemon) {
                return vitalidadCorrecta = unPokemon.vitalidad() == unPokemon.vida - unPokemon.deterioroRecibido;

            },
            mensajeResultadoDesigualInicial: function(unPokemon) {
                return relator.anunciarResultadoInesperadoEnMetodo('vitalidad()', unPokemon.vida - unPokemon.deterioroRecibido, unPokemon.vitalidad())
            }
        },
        {
            id: 'retornoMiTipoValido',
            comparacionResultadosExitosaInicial: function(unPokemon) {
                return managementUtil.esTipoValido(unPokemon.miTipo())

            },
            mensajeResultadoDesigualInicial: function(unPokemon) {
                return relator.anunciarResultadoInesperadoEnMetodo('miTipo()', config.tiposDePokemonAceptados, unPokemon.miTipo())
            }
        },
        {
            id: 'deterioroDeAtaquesDisponiblesCorrecto',
            comparacionResultadosExitosaInicial: function(unPokemon) {
                return _.isEmpty(juezDeBatalla.ataquesConDeterioroIncorrecto(unPokemon)) && !_.isEmpty(juezDeBatalla.ataquesDisponibles(unPokemon))
            },
            mensajeResultadoDesigualInicial: function(unPokemon) {
                return relator.anunciarAtaquesConDeterioroIncorrecto(unPokemon, juezDeBatalla.ataquesConDeterioroIncorrecto(unPokemon))
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
        }, {
            id: 'recibirDeterioroCorrecto',
            comparacionResultadosExitosaInicial: function(unPokemon) {
                const tipoDeAtaque = config.tiposDeAtaque[0]
                const pokemonDummy = _.cloneDeep(unPokemon);
                const otroPokemonDummy = _.cloneDeep(unPokemon);
                const impactoDeAtaque = pokemonDummy.fuerza * config.multiplicadorDeAtaque(tipoDeAtaque)
                const defensaDeAtaque = otroPokemonDummy.defensa * config.multiplicadorDeDefensa
                
                const resultadoDeAtaque = _.max([impactoDeAtaque*0.1,impactoDeAtaque - defensaDeAtaque])
                let isEqual = true;
                let index = 1;
                let recibirDeterioroConEfecto = true;

                while (otroPokemonDummy.vitalidad() - resultadoDeAtaque  > 0 && recibirDeterioroConEfecto && index < 100){
                    const vitalidadAntes = otroPokemonDummy.vitalidad();
                    otroPokemonDummy.recibirDeterioro(impactoDeAtaque);

                    const vitalidadDespues = otroPokemonDummy.vitalidad();
                    recibirDeterioroConEfecto = vitalidadAntes != vitalidadDespues;
                    isEqual = otroPokemonDummy.deterioroRecibido == resultadoDeAtaque * index;

                    index ++;
                } 
                
                return isEqual
            },
            mensajeResultadoDesigualInicial: function(unPokemon) {
                return relator.anunciarRecepcionDeDeterioroIncorrecta(unPokemon)
            }
        }
    ]