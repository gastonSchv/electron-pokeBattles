const config = require('./config')
const _ = require('lodash')
const relator = require('./Relator')
const Promise = require('bluebird')

class juezDeBatalla  {	
	constructor(nombre){
		this.nombre = nombre
	}
	verificarEstadoPokemon(unPokemon){
		const pokemonDeVerificacion = _.cloneDeep(unPokemon)
		const __sumaSinMultiplicadores = atributo => {
			return pokemonDeVerificacion[atributo]  / pokemonDeVerificacion.tipoDePokemon.multiplicadorDeAtributo(atributo) 
		}
		const __sumarPuntajes = pokemonDeVerificacion => {
			return _.sumBy(config.atributosDePokemon, atributo => __sumaSinMultiplicadores(atributo))
		}
		if(__sumarPuntajes(pokemonDeVerificacion) > config.puntajeMaximoPermitido() ){
			relator.anunciarExcesoDePuntaje(pokemonDeVerificacion,__sumarPuntajes(pokemonDeVerificacion))
			throw {messageRelator: relator.mensajeFinDeBatalla,messageError:''}
		}
	}
	verificarEstadoPokemones(unosPokemones){
		_.forEach(unosPokemones, pokemon => this.verificarEstadoPokemon(pokemon))
	}
	verificarComportamientoPokemon(unPokemon){
		this.verificarAtaquesDisponibles(unPokemon)
		this.verificarDañoEfectuadoPor(unPokemon,config.ataquesVerificables)
		this.verificarEnergiaConsumidaPor(unPokemon)
	}
	verificarComportamientoPokemones(unosPokemones){
		_.forEach(unosPokemones, pokemon => this.verificarComportamientoPokemon(pokemon))
	}
	verificarAtaquesDisponibles(unPokemon){
		const pokemonDeVerificacion = _.cloneDeep(unPokemon)
		this.__verificarAtaqueBasico(pokemonDeVerificacion)
		this.__verificarEntrenamientos(pokemonDeVerificacion,config.ataquesVerificables)
	}
	__errorDeMetodoNoDeclarado(err) {
		return _.includes(err.message,'is not a function')
	}
	__errorSiEsMetodoNoDeclarado(err,message){
		if (this.__errorDeMetodoNoDeclarado(err)) {
	        throw {message}
	    }
	}
	__errorSiNoEsMetodoNoDeclarado(err,message){
		if (!this.__errorDeMetodoNoDeclarado(err)) {
	        throw {message}
	    }	
	}
	__verificarAtaqueBasico(unPokemon) {
	    try {
	        unPokemon.atacar(unPokemon,'basico')
	    } catch (err) {
	        this.__errorSiEsMetodoNoDeclarado(err,relator.anunciarCondicionesDeAtaqueFaltante(unPokemon, 'basico'))
	        throw {messageRelator: relator.mensajeFinDeBatalla,messageError:err.message}
	    }
	}
	__verificarEntrenamientos (unPokemon,tiposDeAtaque) {
		const verificadoresDeEntrenamiento = {
			fuerte : unPokemon => {
		    //pensarVerificacionesQueObliguenAAprender
			},
			maximo : unPokemon => {
		    //pensarVerificacionesQueObliguenAAprender
			}
		}
		const verificarEntrenamiento = (unPokemon,tipoDeAtaque) => {
			return _.get(verificadoresDeEntrenamiento,tipoDeAtaque)(unPokemon)
		}
		const __verificarEntrenamiento = (unPokemon, tipoDeAtaque) => {
	    	try {
	        	unPokemon.atacar(unPokemon,tipoDeAtaque)
	        	verificarEntrenamiento(unPokemon,tipoDeAtaque)
	    	}catch (err) {
	       		this.__errorSiNoEsMetodoNoDeclarado(err,relator.anunciarEntrenamientoFaltante(unPokemon.nombre,tipoDeAtaque))
	       		throw {messageRelator: relator.mensajeFinDeBatalla,messageError:err.message}
	       	}
	    }
	    _.forEach(tiposDeAtaque, tipoDeAtaque => {
	        __verificarEntrenamiento(unPokemon, tipoDeAtaque)
	    })
	}
	verificarDañoEfectuadoPor(unPokemon,tiposDeAtaque){
		const pokemonsDummy = {};
		const verificaDaño = (pokemonDummy,tipoDeAtaque) => {
			const __dañoDeAtaque = unPokemon => {
				return config.multiplicadorDeAtaque(tipoDeAtaque) * unPokemon.fuerza * unPokemon.factorDeEvolución()
			}
			const __defensaTotal = unPokemon => {
				return unPokemon.defensa * unPokemon.factorDeEvolución()
			}
			return pokemonDummy.dañoRecibido == __dañoDeAtaque(unPokemon) - __defensaTotal(unPokemon)
		}
		const __verificarDaño = (unPokemon,tipoDeAtaque) => {
			pokemonsDummy[tipoDeAtaque] = _.cloneDeep(unPokemon);
			try{
				unPokemon.atacar(pokemonsDummy[tipoDeAtaque],tipoDeAtaque);
				if(!verificaDaño(pokemonsDummy[tipoDeAtaque],tipoDeAtaque)){
					relator.anunciarVerificaciónDeDañoFallida(unPokemon,tipoDeAtaque)
					throw {message: 'No se verifica daño way'}
				}
			}catch(err){
				this.__errorSiNoEsMetodoNoDeclarado(err,err.message)
				throw {messageRelator: relator.mensajeFinDeBatalla,messageError:err.message}
			}
		}
		_.forEach(tiposDeAtaque, tipoDeAtaque => {
			__verificarDaño(unPokemon,tipoDeAtaque)
		})
	}
	verificarEnergiaConsumidaPor(unPokemon){
		const pokemonDeVerificacion = _.cloneDeep(unPokemon)
	}
	ambosPokemonsVivos(unPokemon,otroPokemon){
			return unPokemon.vitalidad() > 0 && otroPokemon.vitalidad() > 0
	}
	ganadorDeBatalla(unPokemon,otroPokemon){
		return _.maxBy([unPokemon,otroPokemon],'vitalidad')
	}
	hayGanador(unPokemon,otroPokemon){
		return !this.ambosPokemonsVivos(unPokemon,otroPokemon)
	}
	definirGanador(unPokemon,otroPokemon){
		return this.hayGanador(unPokemon,otroPokemon)?this.ganadorDeBatalla(unPokemon,otroPokemon):''
	}
	async oficiarBatalla(unPokemon,otroPokemon){
		let i = 1 ;
		while(this.ambosPokemonsVivos(unPokemon,otroPokemon) && i < 50) {
			await this.oficiarRonda(unPokemon,otroPokemon,i);
			i++
		}
		relator.anunciarGanador(unPokemon,otroPokemon,i-1)
	}
	oficiarRonda(unPokemon,otroPokemon,ronda){ // hay que comprobar que no se edite el estado el poquemon oponente salvo por el dañoRecibido.
		const __ordenarTurno = (unPokemon,otroPokemon) => {
			return _.orderBy([unPokemon,otroPokemon],pokemon => 1/pokemon.velocidadDeAtaque())
		}
		let pokemonsOrdenados = __ordenarTurno(unPokemon,otroPokemon)
		pokemonsOrdenados[0].entrenador.ejecutarEstrategia(pokemonsOrdenados[0],pokemonsOrdenados[1])
		if(!this.ambosPokemonsVivos(unPokemon,otroPokemon)) return
		pokemonsOrdenados[1].entrenador.ejecutarEstrategia(pokemonsOrdenados[1],pokemonsOrdenados[0])
		if(!this.ambosPokemonsVivos(unPokemon,otroPokemon)) return
		relator.anunciarResultadosDeRonda(pokemonsOrdenados[0],pokemonsOrdenados[1],ronda)
		return Promise.resolve().delay(0)
	}
}

module.exports = new juezDeBatalla('Rodolfo')
