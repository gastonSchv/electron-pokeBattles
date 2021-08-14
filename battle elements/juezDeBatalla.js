const config = require('./config')
const _ = require('lodash')
const relator = require('./relator')
const Promise = require('bluebird')
const centroDeEntrenamiento = require('../training management/juezDeEntrenamiento')
const Store = require('electron-store')
const store = new Store()

class juezDeBatalla {
    constructor(nombre) {
        this.nombre = nombre
    }
    verificarEstadoPokemon(unPokemon) {
        const pokemonDeVerificacion = _.cloneDeep(unPokemon)
        const __sumaSinMultiplicadores = atributo => {
            return pokemonDeVerificacion[atributo] / pokemonDeVerificacion.tipoDePokemon.multiplicadorDeAtributo(atributo)
        }
        const __sumarPuntajes = pokemonDeVerificacion => {
            return _.sumBy(config.atributosDePokemon, atributo => __sumaSinMultiplicadores(atributo))
        }
        if (__sumarPuntajes(pokemonDeVerificacion) > config.puntajeMaximoPermitido()) {
            throw { message: relator.anunciarExcesoDePuntaje(pokemonDeVerificacion, __sumarPuntajes(pokemonDeVerificacion)) }
        }
    }
    verificarEstadoPokemones(unosPokemones) {
        _.forEach(unosPokemones, pokemon => this.verificarEstadoPokemon(pokemon))
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
    constatarEntrenamiento(unPokemon, ataqueExistente) {
        return centroDeEntrenamiento.constatarEntrenamientoAtaques(unPokemon, ataqueExistente)
    }
    ataquesDisponibles(unPokemon) {
        return _(this.ataquesExistentes(unPokemon))
            .filter(ataqueExistente => this.constatarEntrenamiento(unPokemon, ataqueExistente))
            .value()
    }
    __errorDeMetodoNoDeclarado(errMessage) {
        return _.includes(errMessage, 'is not a function')
    }
    traducirErrorDeMetodoNoDeclarado(errMessage, unPokemon) {
        if (this.__errorDeMetodoNoDeclarado(errMessage)) {
            throw { message: relator.anunciarMetodoNoDeclarado(unPokemon, 'ataque basico') }
        } else {
            throw { message: errMessage }
        }
    }
    verificarAtaqueBasico(unPokemon) {
        const pokemonDummyAtacado = _.cloneDeep(unPokemon)
        const pokemonDummyAtacante = _.cloneDeep(unPokemon)

        try {
            pokemonDummyAtacante.atacar(pokemonDummyAtacado, 'basico')
            this.verificarDano(unPokemon, 'basico')
        } catch (err) {
            this.traducirErrorDeMetodoNoDeclarado(err.message, pokemonDummyAtacado)
        }
    }
    verificarDano = (unPokemon, tipoDeAtaque) => {
        const pokemonDummyAtacado = _.cloneDeep(unPokemon);
        const pokemonDummyAtacante = _.cloneDeep(unPokemon)
        pokemonDummyAtacado.energia = 99999;
        pokemonDummyAtacante.energia = 99999;
        const __danoDeAtaque = pokemonDummyAtacante => {
            return config.multiplicadorDeAtaque(tipoDeAtaque) * pokemonDummyAtacante.fuerza * pokemonDummyAtacante.factorDeEvolución()
        }
        const __defensaTotal = pokemonDummyAtacado => {
            return pokemonDummyAtacado.defensa * pokemonDummyAtacado.factorDeEvolución()
        }
        const verificaDano = (pokemonDummyAtacante, pokemonDummyAtacado, tipoDeAtaque) => {
            return pokemonDummyAtacado.dañoRecibido == __danoDeAtaque(pokemonDummyAtacante) - __defensaTotal(pokemonDummyAtacado)
        }
        try {
            pokemonDummyAtacante.atacar(pokemonDummyAtacado, tipoDeAtaque);
            if (!verificaDano(pokemonDummyAtacante, pokemonDummyAtacado, tipoDeAtaque)) {
                const listaComparaciones = [
                {
                    nombre:'Daño Recibido',
                    valorEsperado:__danoDeAtaque(pokemonDummyAtacante)-__defensaTotal(pokemonDummyAtacado),
                    valorObtenido: pokemonDummyAtacado.dañoRecibido
                }
                ]
                throw { message: relator.anunciarVerificaciónDeDanoFallida(pokemonDummyAtacante, tipoDeAtaque,listaComparaciones) }
            }
        } catch (err) {
            throw { message: err.message }
        }
    }
    verificarDanoDeAtaquesDisponibles(unPokemon) {
        const ataquesDisponibles = this.ataquesDisponibles(unPokemon)
        _.forEach(ataquesDisponibles, tipoDeAtaque => {
            this.verificarDano(unPokemon, tipoDeAtaque)
        })
    }
    verificarEnergiaConsumidaPor(unPokemon) {
        const pokemonDeVerificacion = _.cloneDeep(unPokemon)
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
    oficiarRonda(unPokemon, otroPokemon, ronda) { // hay que comprobar que no se edite el estado el poquemon oponente salvo por el danoRecibido.
        const __ordenarTurno = (unPokemon, otroPokemon) => {
            return _.orderBy([unPokemon, otroPokemon], pokemon => 1 / pokemon.velocidadDeAtaque())
        }
        let pokemonsOrdenados = __ordenarTurno(unPokemon, otroPokemon)
        pokemonsOrdenados[0].entrenador.ejecutarEstrategia(pokemonsOrdenados[0], pokemonsOrdenados[1])
        if (!this.ambosPokemonsVivos(unPokemon, otroPokemon)) return
        pokemonsOrdenados[1].entrenador.ejecutarEstrategia(pokemonsOrdenados[1], pokemonsOrdenados[0])
        if (!this.ambosPokemonsVivos(unPokemon, otroPokemon)) return
        relator.anunciarResultadosDeRonda(pokemonsOrdenados[0], pokemonsOrdenados[1], ronda)
        return Promise.resolve().delay(0)
    }
    pokemonesDerrotadosActuales(){
        return store.get('pokemonesDerrotados') || []
    }
    guardarPokemonDerrotado(nombrePokemonDerrotado){
    	const __ListadoPokemonesDerrotadosCon = nombrePokemonDerrotado => {
    		const yaSeEncuentraEnListado = _.some(this.pokemonesDerrotadosActuales(),nombrePokemon => _.isEqual(nombrePokemon,nombrePokemonDerrotado))
    		return yaSeEncuentraEnListado? this.pokemonesDerrotadosActuales() : this.pokemonesDerrotadosActuales().concat(nombrePokemonDerrotado)
    	}
        console.log('deberia guardar el pokemon derrotado',nombrePokemonDerrotado,'y generar el listado',__ListadoPokemonesDerrotadosCon(nombrePokemonDerrotado))
    	store.set('pokemonesDerrotados',__ListadoPokemonesDerrotadosCon(nombrePokemonDerrotado))
    }
    borrarPokemonDerrotado(nombrePokemonDerrotado){
        const __ListadoPokemonesDerrotadosSin = nombrePokemonDerrotado => {
            return _.filter(this.pokemonesDerrotadosActuales(), pokemon => !_.isEqual(pokemon,nombrePokemonDerrotado))
        }
        store.set('pokemonesDerrotados',__ListadoPokemonesDerrotadosSin(nombrePokemonDerrotado))
    }
    borrarTodosLosPokemonesDerrotados(){
    	store.set('pokemonesDerrotados',[])
    }
}

module.exports = new juezDeBatalla('Rodolfo')