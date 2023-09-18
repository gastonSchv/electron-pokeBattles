const config = require('../battle elements/config')
const _ = require('lodash')
const relator = require('../battle elements/relator')
const Promise = require('bluebird')
const Store = require('electron-store')
const store = new Store()
const util = require('../management utils/util')
const evaluaciones = require('./evaluaciones')
const {obtenerTodosLosTipos} = require('../battle elements/TiposDePokemon/utils')
const pokemonDeReferencia = require('../battle elements/Pokemons/pokemon de referencia.js')

class juezDeBatalla {
    constructor(nombre) {
        this.nombre = nombre
    }
    constatarEvaluacion(unPokemon, evaluacionId) {
        return util.constatarAccion(unPokemon, evaluaciones, evaluacionId)
    }
    obtenerEvaluaciones() {
        return evaluaciones
    }
    pasaEvaluacion(unPokemon, evaluacionId) {
        return this.constatarEvaluacion(unPokemon, evaluacionId)
            .then(() => true)
            .catch(() => false)
    }
    pasaTodasLasEvaluaciones(unPokemon) {
        return Promise.map(evaluaciones, ({ id }) => this.pasaEvaluacion(unPokemon, id))
            .then(results => _.every(results, e => e))
    }
    constatarTodasLasEvaluaciones(unPokemon) {
        return Promise.map(this.obtenerEvaluaciones(), evaluacion => {
            return this.constatarEvaluacion(unPokemon, evaluacion.id)
        })
    }
    obtenerResultadoEvaluaciones(unPokemon) {
        return Promise.props({
            evaluacionesCorrectas: Promise.filter(evaluaciones, evaluacion => this.pasaEvaluacion(unPokemon, evaluacion.id)),
            evaluacionesIncorrectas: Promise.filter(evaluaciones, evaluacion => this.pasaEvaluacion(unPokemon, evaluacion.id).then(a => !a))
        })
    }
    existeAtaque(unPokemon, unAtaque) {
        const pokemonDummy = _.cloneDeep(unPokemon)
        try {
            unPokemon.atacar(pokemonDummy, unAtaque)
            return true
        } catch (err) {
            return false
        }
    }
    ataquesExistentes(unPokemon) {
        return _(config.ataquesVerificables)
            .filter(ataque => this.existeAtaque(unPokemon, ataque))
            .value()
    }
    ataquesDisponibles(unPokemon) {
        return _(this.ataquesExistentes(unPokemon))
            .filter(ataqueExistente => ataqueExistente) // por ahora no se controla de ninguna manera cuales de los ataques existentes estan disponibles
            .value()
    }
    haceElDeterioroEsperado = (unPokemon, tipoDeAtaque) => {
        const pokemonDummyAtacado = _.cloneDeep(pokemonDeReferencia);
        const pokemonDummyAtacante = _.cloneDeep(unPokemon);
        pokemonDummyAtacado.energia = 99999;
        pokemonDummyAtacante.energia = 99999;

        const __impactoDeAtaque = pokemonDummyAtacante => {
            return config.multiplicadorDeAtaque(tipoDeAtaque) * pokemonDummyAtacante.fuerza 
        }
        const __defensaTotal = pokemonDummyAtacado => {
            return pokemonDummyAtacado.defensa  * config.multiplicadorDeDefensa
        }
        const verificaDano = (pokemonDummyAtacante, pokemonDummyAtacado, tipoDeAtaque) => {
            const deteriorioEsperado = _.max([__impactoDeAtaque(pokemonDummyAtacante)*0.1,__impactoDeAtaque(pokemonDummyAtacante) - __defensaTotal(pokemonDummyAtacado)])
            return pokemonDummyAtacado.deterioroRecibido == deteriorioEsperado
        }
        
        pokemonDummyAtacante.atacar(pokemonDummyAtacado, tipoDeAtaque)
        
        const valorEsperado = pokemonDeReferencia.resultadoDeAtaque(__impactoDeAtaque(pokemonDummyAtacante), __defensaTotal(pokemonDummyAtacado))
        const valorObtenido = pokemonDummyAtacado.deterioroRecibido
        return valorEsperado == valorObtenido
    }
    filtrarAtaquesDisponiblesPor(unPokemon, condicionDeFiltro) {
        return _.filter(this.ataquesDisponibles(unPokemon), ataqueDisponible => {
            return !condicionDeFiltro(unPokemon, ataqueDisponible)
        })
    }
    ataquesConDeterioroIncorrecto(unPokemon) {
        const __haceElDeterioroEsperado = (unPokemon, tipoDeAtaque) => {
            return this.haceElDeterioroEsperado(unPokemon, tipoDeAtaque)
        }
        return this.filtrarAtaquesDisponiblesPor(unPokemon, __haceElDeterioroEsperado)
    }
    tipoDePokemon(unPokemon) {
        return _.find(obtenerTodosLosTipos(), tipoDePokemon => {
            return unPokemon.miTipo() == tipoDePokemon.nombre
        })
    }
    consumoEnergeticoEsperado(unPokemon, tipoDeAtaque) {
        const tipoDePokemon = this.tipoDePokemon(unPokemon)
        return tipoDePokemon.energiaParaAtaque(tipoDeAtaque, unPokemon)
    }
    consumeLaEnergiaEsperada(unPokemon, tipoDeAtaque, tipoDePokemon) {
        const pokemonDummyAtacado = _.cloneDeep(unPokemon);
        const pokemonDummyAtacante = _.cloneDeep(unPokemon)
        const energiaInicial = 99999
        pokemonDummyAtacado.energia = energiaInicial;
        pokemonDummyAtacante.energia = energiaInicial;

        const _consumoEnergeticoEsperado = (tipoDeAtaque) => { // ver como evitar repeticion de logica sin romper el this por lambda
            return _.get(tipoDePokemon.energiaParaAtaques, tipoDeAtaque)
        }
        pokemonDummyAtacante.atacar(pokemonDummyAtacado, tipoDeAtaque)
        return energiaInicial - pokemonDummyAtacante.energia == _consumoEnergeticoEsperado(tipoDeAtaque)

    }
    ataquesConConsumoEnergiaIncorrecto(unPokemon) {
        const _consumeLaEnergiaEsperada = (unPokemon, tipoDeAtaque) => {
            return this.consumeLaEnergiaEsperada(unPokemon, tipoDeAtaque, this.tipoDePokemon(unPokemon))
        }
        return this.filtrarAtaquesDisponiblesPor(unPokemon, _consumeLaEnergiaEsperada)
    }
    energiaSuficiente(unPokemon, tipoDeAtaque) {
        return unPokemon.energia >= this.consumoEnergeticoEsperado(unPokemon, tipoDeAtaque)
    }
    energiaDeRecuperacion(tipoDePokemon) {
        return _.find(tiposDePokemon, ({ nombre }) => tipoDePokemon == nombre).energiaDeRecuperacion
    }
    ambosPokemonsVivos(unPokemon, otroPokemon) {
        return unPokemon.vitalidad() > 0 && otroPokemon.vitalidad() > 0
    }
    ganadorDeBatalla(unPokemon, otroPokemon) {
        return _.maxBy([unPokemon, otroPokemon], pokemon => pokemon.vitalidad())
    }
    hayGanador(unPokemon, otroPokemon) {
        return !this.ambosPokemonsVivos(unPokemon, otroPokemon)
    }
    definirGanador(unPokemon, otroPokemon) {
        return this.hayGanador(unPokemon, otroPokemon) ? this.ganadorDeBatalla(unPokemon, otroPokemon) : ''
    }
    async oficiarBatalla(unPokemon, otroPokemon) {
        let i = 1;
        while (this.ambosPokemonsVivos(unPokemon, otroPokemon) && i < 50) {
            await this.oficiarRonda(unPokemon, otroPokemon, i);
            i++
        }
        relator.anunciarGanador(unPokemon, otroPokemon, i - 1)
    }
    oficiarRonda(unPokemon, otroPokemon, ronda) {
        const __ordenarTurno = (unPokemon, otroPokemon) => {
            return _.orderBy([unPokemon, otroPokemon], pokemon => 1 / pokemon.velocidadDeAtaque())
        }
        let pokemonsOrdenados = __ordenarTurno(unPokemon, otroPokemon)
        pokemonsOrdenados[0].ejecutarEstrategia(pokemonsOrdenados[0], pokemonsOrdenados[1])
        if (!this.ambosPokemonsVivos(unPokemon, otroPokemon)) return
        pokemonsOrdenados[1].ejecutarEstrategia(pokemonsOrdenados[1], pokemonsOrdenados[0])
        if (!this.ambosPokemonsVivos(unPokemon, otroPokemon)) return
        relator.anunciarResultadosDeRonda(pokemonsOrdenados[0], pokemonsOrdenados[1], ronda)
        return Promise.resolve().delay(0)
    }
    pokemonesDerrotadosActuales() {
        return store.get('pokemonesDerrotados') || []
    }
    guardarPokemonDerrotado(nombrePokemonDerrotado) {
        const __ListadoPokemonesDerrotadosCon = nombrePokemonDerrotado => {
            const yaSeEncuentraEnListado = _.some(this.pokemonesDerrotadosActuales(), nombrePokemon => _.isEqual(nombrePokemon, nombrePokemonDerrotado))
            return yaSeEncuentraEnListado ? this.pokemonesDerrotadosActuales() : this.pokemonesDerrotadosActuales().concat(nombrePokemonDerrotado)
        }
        store.set('pokemonesDerrotados', __ListadoPokemonesDerrotadosCon(nombrePokemonDerrotado))
    }
    borrarPokemonDerrotado(nombrePokemonDerrotado) {
        const __ListadoPokemonesDerrotadosSin = nombrePokemonDerrotado => {
            return _.filter(this.pokemonesDerrotadosActuales(), pokemon => !_.isEqual(pokemon, nombrePokemonDerrotado))
        }
        store.set('pokemonesDerrotados', __ListadoPokemonesDerrotadosSin(nombrePokemonDerrotado))
    }
    borrarTodosLosPokemonesDerrotados() {
        store.set('pokemonesDerrotados', [])
    }
    probabilidadDeEsquivarAtaque(personajeAtacado){
        return _.max([0,(0.1639 * Math.log(personajeAtacado.velocidad) - 0.9925)])
    }
    ataqueEsquivado(personajeAtacado) {
        return _.random(1, true) <= this.probabilidadDeEsquivarAtaque(personajeAtacado)
    }
}

module.exports = new juezDeBatalla('Rodolfo')