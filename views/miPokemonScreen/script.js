const { ipcRenderer } = require('electron');
const _ = require('lodash');
const largoBarraEstadistica = 550;
const valorMaxVida = 300000;
const valorMaxOtrasEstadisticas = 10000;
const util = require('../utils/util')

function funcionesDeInicio(){
	pedirRutaConfig()
}

function pedirRutaConfig(){
	ipcRenderer.send('config:pedidoRutaMiPokemon',{})
}
ipcRenderer.on('config:pedidoRutaMiPokemon',(event,data) => {
	let pokemon = require(data.ruta)
	completarEstadoPokemon(pokemon)
	completarValoresDeEstadisticas(pokemon)
	modificarLargoBarrasEstadisticas(pokemon)
})

function completarEstadoPokemon(unPokemon){
	completarValoresDeDato(unPokemon)
}

function completarValorDeDato(div,atributo,unPokemon){
	if(_.get(unPokemon,`${atributo}.nombre`)){atributo = `${atributo}.nombre`}   
	div.innerHTML = `<span class="textoDatoPokemon">${_.get(unPokemon,atributo)}</span>`
}
function completarValoresDeDato(unPokemon){
	completarValorDeDato(nombre,'nombre',unPokemon)
	completarValorDeDato(entrenador,'entrenador',unPokemon)
	completarValorDeDato(tipoDePokemon,'tipoDePokemon',unPokemon)
	completarValorDeDato(evolucion,'evolucion',unPokemon)
}
function completarValorDeEstadistica(div,atributo,unPokemon){
	div.innerHTML = _.get(unPokemon,atributo) + util.valorModificacionAtributo(atributo,unPokemon)
}
function completarValoresDeEstadisticas(unPokemon){
	completarValorDeEstadistica(valorVida,'vida',unPokemon)
	completarValorDeEstadistica(valorEnergia,'energia',unPokemon)
	completarValorDeEstadistica(valorFuerza,'fuerza',unPokemon)
	completarValorDeEstadistica(valorDefensa,'defensa',unPokemon)
	completarValorDeEstadistica(valorVelocidad,'velocidad',unPokemon)
}
function largoDeBarra(atributo,valorAtributo){
	const max = atributo == 'vida'?valorMaxVida:valorMaxOtrasEstadisticas;
	return util.largoDeBarra(largoBarraEstadistica,max,valorAtributo)
}
function modificarLargoDeBarrasEstadistica(estadisticaIncial,estadisticaPorEntrenamiento,atributo,unPokemon){
	estadisticaIncial.style.width = `${largoDeBarra(atributo,_.get(unPokemon,atributo))}px`
	estadisticaPorEntrenamiento.style.width = `${largoDeBarra(atributo,util.valorModificacionAtributo(atributo,unPokemon))}px`
}
function modificarLargoBarrasEstadisticas(unPokemon){	
	modificarLargoDeBarrasEstadistica(estadisticaVidaIncial,estadisticaVidaPorEntrenamiento,'vida',unPokemon)
	modificarLargoDeBarrasEstadistica(estadisticaEnergiaIncial,estadisticaEnergiaPorEntrenamiento,'energia',unPokemon)
	modificarLargoDeBarrasEstadistica(estadisticaFuerzaIncial,estadisticaFuerzaPorEntrenamiento,'fuerza',unPokemon)
	modificarLargoDeBarrasEstadistica(estadisticaDefensaIncial,estadisticaDefensaPorEntrenamiento,'defensa',unPokemon)
	modificarLargoDeBarrasEstadistica(estadisticaVelocidadIncial,estadisticaVelocidadPorEntrenamiento,'velocidad',unPokemon)
}