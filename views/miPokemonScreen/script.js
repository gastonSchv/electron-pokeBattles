const { ipcRenderer } = require('electron')
const _ = require('lodash')


function funcionesDeInicio(){
	pedirRutaConfig()
}

function pedirRutaConfig(){
	ipcRenderer.send('config:pedidoRutaMiPokemon',{})
}
ipcRenderer.on('config:pedidoRutaMiPokemon',(event,data) => {
	let pokemon = require(data.ruta)
	console.log(pokemon)
	completarEstadoPokemon(pokemon)
	completarValoresDeEstadisticas(pokemon)
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