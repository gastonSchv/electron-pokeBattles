const _  = require('lodash')

class Relator {
	constructor(){
		this.mensajeFinDeBatalla = 'Fin de Batalla Pokemon';
	}
	anunciarFalta(unPokemon,condicion){
		return ` \nEl pokemon ${unPokemon.nombre} no ha verificado : ${condicion}`
	}
	anunciarValidacionCorrecta(unPokemon,condicion){
		return ` \nEl pokemon ${unPokemon.nombre} ha verificado ${condicion} con exito!`
	}
	anunciarDesmayoPokemon(unPokemon){
		console.log(` \nEl pokemon ${unPokemon.nombre} se ha desmayado`)	
	}
	estadoPokemon(unPokemon){
		return `${unPokemon.nombre} vida: ${unPokemon.vida} | energia: ${unPokemon.energia} | daño recibido: ${unPokemon.dañoRecibido}`
	}
	anunciarResultadosDeRonda(unPokemon,otroPokemon,ronda){
		const infoDeRonda = pokemon => {
			return `\n\n ${this.estadoPokemon(pokemon)}`
		}
		console.log(`\n Resultados de la Ronda | ${ronda} | !`,infoDeRonda(unPokemon),infoDeRonda(otroPokemon))
	}
	anunciarCondicionesDeAtaqueFaltante(unPokemon,tipoDeAtaque){
		this.anunciarFalta(unPokemon,`Condicion de ataque ${tipoDeAtaque}`)
	}
	anunciarVerificaciónDeDanoFallida(unPokemon,tipoDeAtaque){
		return this.anunciarFalta(unPokemon,`Condicion de daño ${tipoDeAtaque}`)
	}
	anunciarEntrenamientoFaltante(unPokemon,tipoDeAtaque){
		this.anunciarFalta(unPokemon,`Condicion de entrenamiento ${tipoDeAtaque}`)	
	}
	anunciarExcesoDePuntaje(unPokemon,puntajeDelPokemon){
		return this.anunciarFalta(unPokemon,`Exceso de asignacion de puntaje (puntaje : ${puntajeDelPokemon})`)
	}
	anunciarMetodoNoDeclarado(unPokemon,metodo){
		return this.anunciarFalta(unPokemon,`${metodo} no declarado`)
	}
	anunciarEvaluacionCorrecta(unPokemon,tipoDeEvaluacion){
		return this.anunciarValidacionCorrecta(unPokemon,tipoDeEvaluacion)
	}
	anunciarEntrenamientoDesigual(resultadoEsperado,resultadoObtenido){
		return `El entrenamiento no pudo completarse! \nResultado esperado: ${resultadoEsperado}\nResultado obtenido: ${resultadoObtenido}`
	}
	anunciarGanador(unPokemon,otroPokemon,ronda){
		const pokemonGanador = _.find([unPokemon,otroPokemon], pokemon => pokemon.vida > pokemon.dañoRecibido)
		const __estadoFinalPokemones = pokemones => {
			return _.map(pokemones, pokemon => `\n\n ${this.estadoPokemon(pokemon)}`)
		}
		console.log(`\n ** El pokemon ${pokemonGanador.nombre} es el vencedor | ronda ${ronda} |** ${__estadoFinalPokemones([unPokemon,otroPokemon])}`)
	}
}

 
module.exports = new Relator() 