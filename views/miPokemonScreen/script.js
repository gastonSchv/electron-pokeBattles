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

function completarValorDeDato(div,campo,unPokemon){
	if(_.get(unPokemon,`${campo}.nombre`)){campo = `${campo}.nombre`}   
	div.innerHTML = `<span class="textoDatoPokemon">${_.get(unPokemon,campo)}</span>`
}
function completarValoresDeDato(unPokemon){
	completarValorDeDato(nombre,'nombre',unPokemon)
	completarValorDeDato(entrenador,'entrenador',unPokemon)
	completarValorDeDato(tipoDePokemon,'tipoDePokemon',unPokemon)
	completarValorDeDato(evolucion,'evolucion',unPokemon)
}
function completarValorDeEstadistica(div,campo,unPokemon){
	div.innerHTML = _.get(unPokemon,campo)
}
function completarValoresDeEstadisticas(unPokemon){
	completarValorDeEstadistica(valorVida,'vida',unPokemon)
	completarValorDeEstadistica(valorEnergia,'energia',unPokemon)
	completarValorDeEstadistica(valorFuerza,'fuerza',unPokemon)
	completarValorDeEstadistica(valorDefensa,'defensa',unPokemon)
	completarValorDeEstadistica(valorVelocidad,'velocidad',unPokemon)
}
function modificarLargoDeBarrasEstadistica(estadisticaIncial,estadisticaPorEntrenamiento,campo,unPokemon){
	const max = campo == 'vida'?valorMaxVida:valorMaxOtrasEstadisticas;
	estadisticaIncial.style.width = `${util.largoDeBarra(largoBarraEstadistica,max,_.get(unPokemon,campo))}px`
	estadisticaPorEntrenamiento.style.width = `${_.random(50,150)}px`
}
function modificarLargoBarrasEstadisticas(unPokemon){
	modificarLargoDeBarrasEstadistica(estadisticaVidaIncial,estadisticaVidaPorEntrenamiento,'vida',unPokemon)
	modificarLargoDeBarrasEstadistica(estadisticaEnergiaIncial,estadisticaEnergiaPorEntrenamiento,'energia',unPokemon)
	modificarLargoDeBarrasEstadistica(estadisticaFuerzaIncial,estadisticaFuerzaPorEntrenamiento,'fuerza',unPokemon)
	modificarLargoDeBarrasEstadistica(estadisticaDefensaIncial,estadisticaDefensaPorEntrenamiento,'defensa',unPokemon)
	modificarLargoDeBarrasEstadistica(estadisticaVelocidadIncial,estadisticaVelocidadPorEntrenamiento,'velocidad',unPokemon)
}