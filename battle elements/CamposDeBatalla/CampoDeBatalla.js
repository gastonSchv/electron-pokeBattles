const _ = require('lodash')

class CampoDeBatalla {
	constructor(tipo,pokemonsBeneficiados,pokemonsPerjudicados){
		this.tipo = tipo ;
		this.pokemonsBeneficiados = pokemonsBeneficiados;
		this.pokemonsPerjudicados = pokemonsPerjudicados;

	}
	alterarPorCampo(unPokemon){
		if(_.includes(pokemonsBeneficiados,unPokemon.tipo)){
			return beneficiar(unPokemon)
		}
		if(_.includes(pokemonsPerjudicados,unPokemon.tipo)){
			return perjudicar(unPokemon)
		}
		return unPokemon  		
	}
	beneficiar(unPokemon){

	}
	perjudicar(unPokemon){

	}
}