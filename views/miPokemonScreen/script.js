const { ipcRenderer } = require('electron');
const _ = require('lodash');
const largoBarraEstadistica = 550;
const valorMaxVida = 300000;
const valorMaxOtrasEstadisticas = 10000;
const util = require('../utils/util')

function funcionesDeInicio(){
	pedirRutaConfig()
	util.crearBotonCerradoConEstilo(contenedor)
}
function cerrarPantalla(){
	window.close()
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
function completarValorBarraEstadistica(div,valorAtributo){
	div.innerHTML = `<div class="valorAtributoDentroDeBarra"> ${valorAtributo} </div>`
}
function completarValorBarraEstadisticaModificada(div,valorAtributo){
	div.innerHTML = `<div class="valorAtributoDentroDeBarraModificada"> ${valorAtributo} </div>`
}
function adaptarBarraEstadistica(estadisticaIncial,estadisticaPorEntrenamiento,atributo,unPokemon){
	const valorAtributo = _.get(unPokemon,atributo);
	const valorAtributoModificado = util.valorModificacionAtributo(atributo,unPokemon);

	estadisticaIncial.style.width = `${largoDeBarra(atributo,valorAtributo)}px`
	estadisticaPorEntrenamiento.style.width = `${largoDeBarra(atributo,valorAtributoModificado)}px`
	completarValorBarraEstadistica(estadisticaIncial,valorAtributo)
	if(valorAtributoModificado > 0 ){
		completarValorBarraEstadisticaModificada(estadisticaPorEntrenamiento,valorAtributoModificado)
	}
}
function modificarLargoBarrasEstadisticas(unPokemon){	
	adaptarBarraEstadistica(estadisticaVidaIncial,estadisticaVidaPorEntrenamiento,'vida',unPokemon)
	adaptarBarraEstadistica(estadisticaEnergiaIncial,estadisticaEnergiaPorEntrenamiento,'energia',unPokemon)
	adaptarBarraEstadistica(estadisticaFuerzaIncial,estadisticaFuerzaPorEntrenamiento,'fuerza',unPokemon)
	adaptarBarraEstadistica(estadisticaDefensaIncial,estadisticaDefensaPorEntrenamiento,'defensa',unPokemon)
	adaptarBarraEstadistica(estadisticaVelocidadIncial,estadisticaVelocidadPorEntrenamiento,'velocidad',unPokemon)
}