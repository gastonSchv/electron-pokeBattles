const _ = require('lodash')
const config = require('../config')
const relator = require('../relator')

class Pokemon {
    constructor({ entrenador, nombre, tipoDePokemon, evolucion, vida, energia, fuerza, defensa, velocidad,estrategia}) {
        this.entrenador = entrenador;
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
        console.log(this.fuerza * config.multiplicadorDeAtaque(tipoDeAtaque) * this.factorDeEvolución())
        return this.fuerza * config.multiplicadorDeAtaque(tipoDeAtaque) * this.factorDeEvolución()
    }
    energiaParaAtaque(tipoDeAtaque) {
        return this.tipoDePokemon.energiaParaAtaque(tipoDeAtaque)
    }
    atacar(unPokemon, tipoDeAtaque) {
        this.disminuirEnergia(this.energiaParaAtaque(tipoDeAtaque))
        unPokemon.recibirDaño(this.danoDeAtaque(tipoDeAtaque))
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
    dañoARecibir(unDaño) {
        return unDaño - (this.defensa * this.factorDeEvolución())
    }
    recibirDaño(unDaño) {
        const __dañoDespuesDeDefensa = unDaño => {
            return _.max([0, this.dañoARecibir(unDaño)])
        }
        this.dañoRecibido += __dañoDespuesDeDefensa(unDaño);
    }
    disminuirEnergia(unaEnergia) {
        this.energia -= unaEnergia
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
    numeroDeAtaquesHastaVictoria(tipoDeAtaque,vidaEnemiga){
    	return Math.ceil(vidaEnemiga / this.danoDeAtaque(tipoDeAtaque))
    }
    numeroDeAtaquesHastaDerrota(danoDeAtaqueEnemigo){
    	return Math.ceil(this.vida/danoDeAtaqueEnemigo)
    }
    poderTotal(){ 
        return this.numeroDeAtaquesHastaVictoria('basico',config.referencia.vida) / this.numeroDeAtaquesHastaDerrota(config.referencia.danoBasico) 
    }
}

module.exports = Pokemon