const juezDeEntrenamiento = require('../../training management/juezDeEntrenamiento')
const pokemon = require('../../battle elements/Pokemons/Pokemons enemigos/bolbasaur')


function funcionesDeInicio(){

}
function constatarEntrenamiento(entrenamiento){
	try{
		juezDeEntrenamiento.constatarEntrenamiento(pokemon,entrenamiento);
		console.log('Entrenamiento completado con exíto')
		/*asignarPuntosDeHabilidades(pokemon,entrenamiento);
		mostrarResultadoExitoso(entrenamiento);*/
	} catch(err){
		console.log('Error! ',err)
		/*mostrarResultadoFallido(entrenamiento,err)*/
	}

}

