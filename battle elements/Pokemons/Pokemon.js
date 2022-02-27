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
        this.deterioroRecibido = 0;
        this.estrategia = estrategia || "bajaEstrategia"
    }
    miTipo() {
        return this.tipoDePokemon.nombre
    }
    factorDeEvolución() {
        return Math.sqrt(this.evolucion)
    }
    vitalidad() {
        return _.max([this.vida - this.deterioroRecibido, 0])
    }
    danoDeAtaque(tipoDeAtaque) {
        return this.fuerza * config.multiplicadorDeAtaque(tipoDeAtaque) * this.factorDeEvolución()
    }
    energiaParaAtaque(tipoDeAtaque) {
        return this.tipoDePokemon.energiaParaAtaque(tipoDeAtaque,this)
    }
    atacar(unPokemon, tipoDeAtaque) {
        this.disminuirEnergia(tipoDeAtaque)
        unPokemon.recibirDeterioro(this.danoDeAtaque(tipoDeAtaque))
    }
    resultadoDeAtaque(unDeterioroDeAtaque,defensaAnteAtaque){
        return _.max([unDeterioroDeAtaque*0.1,unDeterioroDeAtaque - defensaAnteAtaque])
    }
    atacarEspecial(unPokemon){
        this.tipoDePokemon.atacarEspecial(unPokemon,this)
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
    recibirDeterioro(unDeterioroDeAtaque) {
        this.deterioroRecibido += this.resultadoDeAtaque(unDeterioroDeAtaque,this.defensaAnteAtaque())

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
        return pokemonOponente.vitalidad() <= pokemonOponente.deterioroARecibir(this.danoDeAtaque(tipoDeAtaque))
    }
    poderTotal(){
        return 2.5 * this.danoDeAtaque('maximo') + 1.4 * this.defensaAnteAtaque() / (1-this.probabilidadDeEsquivarAtaque()) + 0.8 * this.vida  
    }
}

module.exports = Pokemon