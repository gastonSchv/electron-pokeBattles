const config = require('../battle elements/config')
const _ = require('lodash')

function sumarPuntajes(unPokemon){
		const tipoDePokemon = require(`../battle elements/TiposDePokemon/${unPokemon.miTipo()}`)
		return _.sumBy(config.atributosDePokemon, atributo => unPokemon[atributo]/tipoDePokemon.multiplicadoresDeAtributo[atributo])
}

module.exports = [
{	id:'atributosNecesarios',
	comparacionResultadosExitosaSync: function(unPokemon){
		const __tieneValorAceptado = property => property === 'dañoRecibido' && unPokemon[property] === 0 ? true: unPokemon[property]
		return _.every(config.listaPropiedadesDeEstado,__tieneValorAceptado)
	},
	mensajeResultadoDesigualSync:function(unPokemon){
		const __tieneValorAceptado = property => property === 'dañoRecibido' && unPokemon[property] === 0 ? true: unPokemon[property]
		const atributosConValorValido = _.filter(_.keys(unPokemon),__tieneValorAceptado)
		const atributosFaltantes = _.difference(config.listaPropiedadesDeEstado,atributosConValorValido);
			
		return relator.anunciarAtributosFaltantes(unPokemon,atributosFaltantes)
	}
},
{	id:'puntoDeAtributosMaximoPermitido',
	comparacionResultadosExitosaSync: function(unPokemon){
		return sumarPuntajes(unPokemon) <= config.puntajeMaximoPermitido()
	},
	mensajeResultadoDesigualSync:function(unPokemon){
		return relator.anunciarExcesoDePuntaje(unPokemon, sumarPuntajes(unPokemon))
	}
}
]