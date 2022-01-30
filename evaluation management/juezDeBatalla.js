const config = require('../battle elements/config')
const _ = require('lodash')
const relator = require('../battle elements/relator')
const Promise = require('bluebird')
const Store = require('electron-store')
const store = new Store()
const util = require('../management utils/util')
const evaluaciones = require('./evaluaciones')
const tiposDePokemon = require('../battle elements/TiposDePokemon/todos')
const Pokemon  = require('../battle elements/Pokemons/Pokemon.js')

const pokemonDeReferencia = new Pokemon({
    nombre:'clefairy',
    tipoDePokemon:'hada',
    evolucion:1,
    vida:1600,
    energia:600,
    fuerza:1300,
    defensa:800,
    velocidad:1100
});

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
    obtenerResultadoEvaluaciones(unPokemon) {
        console.log(evaluaciones)
        return Promise.props({
            evaluacionesCorrectas: Promise.filter(evaluaciones, evaluacion => evaluacion.comparacionResultadosExitosa(unPokemon)) ,
            evaluacionesIncorrectas: Promise.filter(evaluaciones, evaluacion => {
                return evaluacion.comparacionResultadosExitosa(unPokemon)
                .then(result => !result)
            })
        }).tap(console.log)
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
    haceElDañoEsperado = (unPokemon, tipoDeAtaque) => {
        const pokemonDummyAtacado = _.cloneDeep(unPokemon);
        const pokemonDummyAtacante = _.cloneDeep(unPokemon)
        pokemonDummyAtacado.energia = 99999;
        pokemonDummyAtacante.energia = 99999;

        const factorDeEvolución = unPokemon => {
            return Math.sqrt(unPokemon.evolucion)
        }
        const __danoDeAtaque = pokemonDummyAtacante => {
            return config.multiplicadorDeAtaque(tipoDeAtaque) * pokemonDummyAtacante.fuerza * factorDeEvolución(pokemonDummyAtacante)
        }
        const __defensaTotal = pokemonDummyAtacado => {
            return pokemonDummyAtacado.defensa * factorDeEvolución(pokemonDummyAtacado) * config.multiplicadorDeDefensa
        }
        const verificaDano = (pokemonDummyAtacante, pokemonDummyAtacado, tipoDeAtaque) => {
            return pokemonDummyAtacado.dañoRecibido == __danoDeAtaque(pokemonDummyAtacante) - __defensaTotal(pokemonDummyAtacado)
        }
        pokemonDummyAtacante.atacar(pokemonDummyAtacado, tipoDeAtaque)
        const valorEsperado = pokemonDeReferencia.resultadoDeAtaque(__danoDeAtaque(pokemonDummyAtacante),__defensaTotal(pokemonDummyAtacado)) 
        const valorObtenido = pokemonDummyAtacado.dañoRecibido

        console.log(valorEsperado,valorObtenido,tipoDeAtaque)
        return valorEsperado == valorObtenido
    }
    filtrarAtaquesDisponiblesPor(unPokemon, condicionDeFiltro) {
        return _.filter(this.ataquesDisponibles(unPokemon), ataqueDisponible => {
            return !condicionDeFiltro(unPokemon, ataqueDisponible)
        })
    }
    ataquesConDañoIncorrecto(unPokemon) {
        return this.filtrarAtaquesDisponiblesPor(unPokemon, this.haceElDañoEsperado)
    }
    tipoDePokemon(unPokemon) {
        return _.find(tiposDePokemon, tipoDePokemon => {
            return unPokemon.miTipo() == tipoDePokemon.nombre
        })
    }
    consumoEnergeticoEsperado(unPokemon, tipoDeAtaque) {
        const tipoDePokemon = this.tipoDePokemon(unPokemon)
        return _.get(tipoDePokemon.energiaParaAtaques, tipoDeAtaque)
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
    ataqueEsquivado(personajeAtacado){
        const random = _.random(1,true)
        console.log(random,personajeAtacado.probabilidadDeEsquivarAtaque(),random <= personajeAtacado.probabilidadDeEsquivarAtaque())
        return random <= personajeAtacado.probabilidadDeEsquivarAtaque()
    }
}

module.exports = new juezDeBatalla('Rodolfo')