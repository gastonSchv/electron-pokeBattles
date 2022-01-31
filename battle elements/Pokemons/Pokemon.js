const _ = require('lodash')
const config = require('../config')
const relator = require('../relator')

class Pokemon {
    constructor({ nombre, tipoDePokemon, evolucion, vida, energia, fuerza, defensa, velocidad,estrategia}) {
        this.nombre = nombre;
        this.tipoDePokemon = require(`../TiposDePokemon/Tipos/${tipoDePokemon}`);
        this.evolucion = evolucion;
        this.vida = vida * this.tipoDePokemon.multiplicadorDeAtributo('vida');
        this.energia = energia * this.tipoDePokemon.multiplicadorDeAtributo('energia');
        this.fuerza = fuerza * this.tipoDePokemon.multiplicadorDeAtributo('fuerza');
        this.defensa = defensa * this.tipoDePokemon.multiplicadorDeAtributo('defensa');
        this.velocidad = velocidad * this.tipoDePokemon.multiplicadorDeAtributo('velocidad');
        this.dañoRecibido = 0;
        this.estrategia = estrategia || "bajaEstrategia"
    }
    miTipo() {
        return this.tipoDePokemon.nombre
    }
    factorDeEvolución() {
        return Math.sqrt(this.evolucion)
    }
    vitalidad() {
        return _.max([this.vida - this.dañoRecibido, 0])
    }
    danoDeAtaque(tipoDeAtaque) {
        return this.fuerza * config.multiplicadorDeAtaque(tipoDeAtaque) * this.factorDeEvolución()
    }
    energiaParaAtaque(tipoDeAtaque) {
        return this.tipoDePokemon.energiaParaAtaque(tipoDeAtaque)
    }
    atacar(unPokemon, tipoDeAtaque) {
        this.disminuirEnergia(tipoDeAtaque)
        unPokemon.recibirDaño(this.danoDeAtaque(tipoDeAtaque))
    }
    resultadoDeAtaque(unDañoDeAtaque,defensaAnteAtaque){
    	return _.max([unDañoDeAtaque*0.1,unDañoDeAtaque - defensaAnteAtaque])
    }
    entrenarAtaqueFuerte() {
        return 'Entrenamiento ataque fuerte completado'
    }
    entrenarAtaqueMaximo() {
        return 'Entrenamiento ataque maximo completado'
    }
    deTipo(propertyPath) {
        return _.get(this.tipoDePokemon, propertyPath)
    }
    defensaAnteAtaque(){
    	return this.defensa * this.factorDeEvolución() * config.multiplicadorDeDefensa
    }
    probabilidadDeEsquivarAtaque(){
    	return _.max([0,(0.1639 * Math.log(this.velocidad) - 0.9925)])
    }
    recibirDaño(unDañoDeAtaque) {
        this.dañoRecibido += this.resultadoDeAtaque(unDañoDeAtaque,this.defensaAnteAtaque())
    }
    disminuirEnergia(tipoDeAtaque) {
        this.energia -= this.energiaParaAtaque(tipoDeAtaque)
    }
    velocidadDeAtaque() {
        return _.random(0.7, 1, 0) * this.velocidad
    }
    recuperarEnergia(energiaLimite) {   
        this.energia = _.min([this.energia + this.tipoDePokemon.energiaDeRecuperacion, energiaLimite]);
    }
    desmayarse(energiaLimite) {
        this.energia = _.min([this.energia + config.energiaDeDesmayo, energiaLimite]);
    }
    esAtaqueMortal(pokemonOponente, tipoDeAtaque) {
        return pokemonOponente.vitalidad() <= pokemonOponente.dañoARecibir(this.danoDeAtaque(tipoDeAtaque))
    }
    numeroDeAtaquesHastaVictoria(tipoDeAtaque){
    	return Math.ceil(config.referencia.vida / this.resultadoDeAtaque(this.danoDeAtaque(tipoDeAtaque),0))
    }
    numeroDeAtaquesHastaDerrota(){
        const danoEquivalente = config.referencia.danoBasico * (1-this.probabilidadDeEsquivarAtaque())
    	return Math.ceil(this.vida / this.resultadoDeAtaque(danoEquivalente,this.defensaAnteAtaque()))
    }
    poderTotal(){
        return 6 * this.danoDeAtaque('maximo') + 1.3 * this.defensaAnteAtaque() / (1-this.probabilidadDeEsquivarAtaque()) + 0.8 * this.vida  
    }
}

module.exports = Pokemon