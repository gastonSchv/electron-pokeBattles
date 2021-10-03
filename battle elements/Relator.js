const _  = require('lodash')
const informacionEvaluaciones = require('../evaluation management/informacionEvaluaciones')
const config = require('./config')

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
		return `Tu pokemon supera el límite de puntos de atributos permitidos por ${puntajeDelPokemon-config.puntajeMaximoPermitido()} puntos`
	}
	anunciarMetodoNoDeclarado(unPokemon,metodo){
		return this.anunciarFalta(unPokemon,`${metodo} no declarado`)
	}
	anunciarEvaluacionCorrecta(unPokemon,idEvaluacion){
		const informacionEvaluacion = _.find(informacionEvaluaciones,{id:idEvaluacion})
		return informacionEvaluacion.mensajeResultadoCorrecto
	}
	anunciarEntrenamientoDesigual(resultadoEsperado,resultadoObtenido){
		return `Resultado esperado: ${this.stringificarYSepararComas(resultadoEsperado)} | Resultado obtenido: ${resultadoObtenido}`
	}
	anunciarAtributosFaltantes(unPokemon,atributosFaltantes){
		return `Tu pokemon no cuenta con los atributos requeridos, debe incorporar los siguientes: ${atributosFaltantes.join(', ')}`
	}
	anunciarAtributosConTipoDeDatoErroneo(unPokemon, propertiesConTiposIncorrectos){
		return `Tu pokemon no cuenta con el tipo de dato correcto en todos sus atributos, se deben modificar los siguientes:\
		 ${propertiesConTiposIncorrectos.join(', ')}`
	}
}

 
module.exports = new Relator() 