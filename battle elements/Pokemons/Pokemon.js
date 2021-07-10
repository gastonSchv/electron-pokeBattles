const _ = require('lodash')
const config = require('../config')
const relator = require('../Relator')

class Pokemon {
	constructor({entrenador,nombre,tipoDePokemon,evolucion,vida,energia,fuerza,defensa,velocidad}){
		this.entrenador = entrenador;
		this.nombre = nombre;
		this.tipoDePokemon = tipoDePokemon;
		this.evolucion = evolucion;
		this.vida = vida * tipoDePokemon.multiplicadorDeAtributo('vida');
		this.energia = energia * tipoDePokemon.multiplicadorDeAtributo('energia');
		this.energiaLimite = energia * tipoDePokemon.multiplicadorDeAtributo('energia');
		this.fuerza = fuerza * tipoDePokemon.multiplicadorDeAtributo('fuerza');
		this.defensa = defensa * tipoDePokemon.multiplicadorDeAtributo('defensa');
		this.velocidad = velocidad * tipoDePokemon.multiplicadorDeAtributo('velocidad');
		this.dañoRecibido = 0;
	}
	factorDeEvolución(){
		return Math.sqrt(this.evolucion)
	}
	vitalidad(){
		return _.max([this.vida - this.dañoRecibido,0])
	}
	dañoDeAtaque(tipoDeAtaque){
		return this.fuerza*config.multiplicadorDeAtaque(tipoDeAtaque)* this.factorDeEvolución()
	}
	energiaSuficiente(tipoDeAtaque){
		return this.energia > this.energiaParaAtaque(tipoDeAtaque)
	}
	energiaParaAtaque(tipoDeAtaque){
		return this.tipoDePokemon.energiaParaAtaque(tipoDeAtaque)
	}
	atacar(unPokemon,tipoDeAtaque){
		if(this.energiaSuficiente(tipoDeAtaque)) {
			this.disminuirEnergia(this.energiaParaAtaque(tipoDeAtaque))
			unPokemon.recibirDaño(this.dañoDeAtaque(tipoDeAtaque))
		}else{
			relator.anunciarDesmayoPokemon(this);
			this.desmayarse();
		}
		
	}
	entrenarAtaqueFuerte(){
		return 'Entrenamiento ataque fuerte completado'
	}
	entrenarAtaqueMaximo(){
		return 'Entrenamiento ataque maximo completado'
	}
	deTipo(propertyPath){
		return _.get(this.tipoDePokemon,propertyPath)
	}
	dañoARecibir(unDaño){
      return unDaño - (this.defensa * this.factorDeEvolución())
  	}
	recibirDaño(unDaño){
   		const __dañoDespuesDeDefensa = unDaño => {
     		return _.max([0,this.dañoARecibir(unDaño)])
    	}
		this.dañoRecibido += __dañoDespuesDeDefensa(unDaño) ;
	}
	disminuirEnergia(unaEnergia){
		this.energia -= unaEnergia
	}
	velocidadDeAtaque(){
		return _.random(0.7,1,0) * this.velocidad
	}
	recuperarEnergia(){
		this.energia = _.min([this.energia+2000,this.energiaLimite]);
	}
	desmayarse(){
		this.energia += _.min([this.energia+750,this.energiaLimite]);
	}
	esAtaqueMortal(pokemonOponente,tipoDeAtaque){
		return pokemonOponente.vitalidad() <= pokemonOponente.dañoARecibir(this.dañoDeAtaque(tipoDeAtaque))
	}
}

module.exports = Pokemon