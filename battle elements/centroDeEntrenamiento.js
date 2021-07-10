
class CentroDeEntrenamiento{
	constructor(){

	}
	constatarEntrenamiento(unPokemon,ataqueExistente){
		if(ataqueExistente == 'fuerte'){
			return unPokemon.entrenarAtaqueFuerte() == 'Entrenamiento ataque fuerte completado'
		}else if(ataqueExistente == 'maximo'){
			return unPokemon.entrenarAtaqueMaximo() == 'Entrenamiento ataque maximo completado'
		}else{
			throw {message: `Ataque ${ataqueExistente} desconocido`}
		}
	}
}

module.exports = new CentroDeEntrenamiento()