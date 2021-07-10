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
	completarEstadoPokemon(pokemon)
})

function completarEstadoPokemon(unPokemon){
	completarValoresDeDato(unPokemon)
}

function completarValorDeDato(div,campo,unPokemon){
	console.log(campo,_.get(unPokemon,`${campo}.nombre`),campo.nombre)
	if(_.get(unPokemon,`${campo}.nombre`)){campo = `${campo}.nombre`}   
	div.innerHTML = `<span class="textoDatoPokemon">${_.get(unPokemon,campo)}</span>`
}
function completarValoresDeDato(unPokemon){
	const nombre = document.getElementById('nombre')
	const entrenador = document.getElementById('entrenador')
	const tipoDePokemon = document.getElementById('tipoDePokemon')
	const evolucion = document.getElementById('evolucion')
	
	console.log(nombre,entrenador,tipoDePokemon,evolucion)
	
	completarValorDeDato(nombre,'nombre',unPokemon)
	completarValorDeDato(entrenador,'entrenador',unPokemon)
	completarValorDeDato(tipoDePokemon,'tipoDePokemon',unPokemon)
	completarValorDeDato(evolucion,'evolucion',unPokemon)
}