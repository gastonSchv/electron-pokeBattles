const _  = require('lodash')

class Relator {
	constructor(){
		this.mensajeFinDeBatalla = 'Fin de Batalla Pokemon';
	}
	stringificarYSepararComas(elemento){
		return JSON.stringify(elemento).replaceAll(',',', ')
	}
	deListaComparacionesAString(listaComparaciones){
		if(_.isEmpty(listaComparaciones)) return '';

		return _.map(listaComparaciones, comparacion => {
			const {nombre,valorEsperado,valorObtenido} = comparacion;
			return `${nombre} => valor esperado: ${valorEsperado} || valorObtenido: ${valorObtenido}`
		})
	}
	anunciarFalta(unPokemon,condicion,listaComparaciones=[]){
		return ` \nEl pokemon ${unPokemon.nombre} no ha verificado : ${condicion}. \n ${this.deListaComparacionesAString(listaComparaciones)}`
	}
	anunciarValidacionCorrecta(unPokemon,condicion){
		return ` \nEl pokemon ${unPokemon.nombre} ha verificado ${condicion} con exito!`
	}
	estadoPokemon(unPokemon){
		return `${unPokemon.nombre} vida: ${unPokemon.vida} | energia: ${unPokemon.energia} | daño recibido: ${unPokemon.dañoRecibido}`
	}
	anunciarCondicionesDeAtaqueFaltante(unPokemon,tipoDeAtaque){
		this.anunciarFalta(unPokemon,`Condicion de ataque ${tipoDeAtaque}`)
	}
	anunciarVerificaciónDeDanoFallida(unPokemon,tipoDeAtaque,listaComparaciones){
		return this.anunciarFalta(unPokemon,`Condicion de daño ${tipoDeAtaque}`,listaComparaciones)
	}
	anunciarEntrenamientoFaltante(unPokemon,tipoDeAtaque){
		this.anunciarFalta(unPokemon,`Condicion de entrenamiento ${tipoDeAtaque}`)	
	}
	anunciarExcesoDePuntaje(unPokemon,puntajeDelPokemon){
		return this.anunciarFalta(unPokemon,`Exceso de asignacion de puntaje. Máximo permitido: 5000 - puntaje del pokemon: ${puntajeDelPokemon}`)
	}
	anunciarMetodoNoDeclarado(unPokemon,metodo){
		return this.anunciarFalta(unPokemon,`${metodo} no declarado`)
	}
	anunciarEvaluacionCorrecta(unPokemon,tipoDeEvaluacion){
		return this.anunciarValidacionCorrecta(unPokemon,tipoDeEvaluacion)
	}
	anunciarEntrenamientoDesigual(resultadoEsperado,resultadoObtenido){
		return `Resultado esperado: ${this.stringificarYSepararComas(resultadoEsperado)} | Resultado obtenido: ${resultadoObtenido}`
	}
}

 
module.exports = new Relator() 