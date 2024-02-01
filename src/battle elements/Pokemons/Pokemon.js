const _ = require('lodash')
const config = require('../config')
const relator = require('../relator')

class Pokemon {
    constructor({ nombre, tipoDePokemon, evolucion, vida, energia, fuerza, defensa, velocidad,estrategia}) {
        this.nombre = nombre;
        this.tipoDePokemon = tipoDePokemon;
        this.tipoDePokemonInternalUse = require(`../TiposDePokemon/Tipos/${tipoDePokemon}`);
        this.evolucion = evolucion;
        this.vida = vida * this.tipoDePokemonInternalUse.multiplicadorDeAtributo('vida');
        this.energia = energia * this.tipoDePokemonInternalUse.multiplicadorDeAtributo('energia');
        this.fuerza = fuerza * this.tipoDePokemonInternalUse.multiplicadorDeAtributo('fuerza');
        this.defensa = defensa * this.tipoDePokemonInternalUse.multiplicadorDeAtributo('defensa');
        this.velocidad = velocidad * this.tipoDePokemonInternalUse.multiplicadorDeAtributo('velocidad');
        this.deterioroRecibido = 0;
        this.estrategia = estrategia || "bajaEstrategia"
    }
    miTipo() {
        return this.tipoDePokemonInternalUse.nombre
    }
    vitalidad() {
        return _.max([this.vida - this.deterioroRecibido, 0])
    }
    impactoDeAtaque(tipoDeAtaque) {
        return this.fuerza * config.multiplicadorDeAtaque(tipoDeAtaque)
    }
    energiaParaAtaque(tipoDeAtaque) {
        return this.tipoDePokemonInternalUse.energiaParaAtaque(tipoDeAtaque,this)
    }
    atacar(unPokemon, tipoDeAtaque) {
        this.disminuirEnergia(tipoDeAtaque)
        unPokemon.recibirDeterioro(this.impactoDeAtaque(tipoDeAtaque))
    }
    resultadoDeAtaque(unDeterioroDeAtaque,defensaAnteAtaque){
        return _.max([unDeterioroDeAtaque*0.1,unDeterioroDeAtaque - defensaAnteAtaque])
    }
    atacarEspecial(unPokemon){
        this.tipoDePokemonInternalUse.atacarEspecial(unPokemon,this)
    }
    deTipo(propertyPath) {
        return _.get(this.tipoDePokemonInternalUse, propertyPath)
    }
    defensaAnteAtaque(){
    	return this.defensa * config.multiplicadorDeDefensa
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
    recuperarEnergia(energiaLimite) { // raro que reciba el límite por parámetro   
        this.energia = _.min([this.energia + this.tipoDePokemonInternalUse.energiaDeRecuperacion, energiaLimite]);
    }
    desmayarse(energiaLimite) { // raro que reciba el límite por parámetro
        this.energia = _.min([this.energia + config.energiaDeDesmayo, energiaLimite]);
    }
    esAtaqueMortal(pokemonOponente, tipoDeAtaque) {
        return pokemonOponente.vitalidad() <= pokemonOponente.deterioroARecibir(this.impactoDeAtaque(tipoDeAtaque))
    }
    poderTotal(){
        return 2.5 * this.impactoDeAtaque('maximo') + 1.4 * this.defensaAnteAtaque() / (1-this.probabilidadDeEsquivarAtaque()) + 0.8 * this.vida  
    }
}

module.exports = Pokemon