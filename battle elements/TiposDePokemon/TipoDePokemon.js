const _  = require ('lodash')

class TipoDePokemon {
	constructor({nombre,multiplicadoresDeAtributo,energiaParaAtaques,energiaDeRecuperacion}){
		this.nombre = nombre;
		this.multiplicadoresDeAtributo = multiplicadoresDeAtributo;
		this.energiaParaAtaques = energiaParaAtaques;
		this.energiaDeRecuperacion = energiaDeRecuperacion;
	}
	multiplicadorDeAtributo(atributo){
		return _.get(this.multiplicadoresDeAtributo,atributo)
	}
	energiaParaAtaqueEspecial(pokemon){
		return pokemon.energia	
	}
	atacarEspecial(pokemonEnemigo, miPokemon) {
        const correctorPorEnergiaBaja = miPokemon.energia / this.energiaParaAtaques.maximo <= 1 ? 0.7 : 1
        const _multiplicadorPorEnergia = () => {
            return (1.15 + 1.03 * Math.log(miPokemon.energia / this.energiaParaAtaques.maximo)) * correctorPorEnergiaBaja
        }
        const _deterioroDeAtaqueEspecial = () => {
            return _.round(_.max([0, miPokemon.danoDeAtaque('maximo') * _multiplicadorPorEnergia()]))
        }
        pokemonEnemigo.recibirDeterioro(_deterioroDeAtaqueEspecial())
        miPokemon.disminuirEnergia('especial')
    }
	energiaParaAtaque(tipoDeAtaque,pokemon){
		if(tipoDeAtaque == 'especial'){
			return this.energiaParaAtaqueEspecial(pokemon)
		}
		return _.get(this.energiaParaAtaques,tipoDeAtaque)
	}
}

module.exports = TipoDePokemon