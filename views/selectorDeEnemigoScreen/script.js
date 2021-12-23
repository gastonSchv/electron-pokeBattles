const {ipcRenderer} = require('electron')
const path = require('path')
const _ = require('lodash')
const carpetaPokemonsEnemigos = path.join(__dirname,'..','..','battle elements','Pokemons','Pokemons enemigos')
const util = require('../utils/util')
const juezDeBatalla = require('../../evaluation management/juezDeBatalla')

function getButton(button){
	ipcRenderer.send('screens:battleScreen',{enemigoSeleccionado:button.id})
}
function funcionesDeInicio(){
 	util.hacerConNombresDeArchivos(carpetaPokemonsEnemigos,crearBotonEnemigo)
	util.crearBotonCerradoConEstilo(contenedor)
	pedirPokemonesDerrotados()
}
function pedirPokemonesDerrotados(){
	ipcRenderer.send('pedidoPokemonesDerrotados',{})
}
function cerrarPantalla(){
	window.close()
}
function crearBotonEnemigo(nombrePokemonEnemigo){
	enemigosGrid.innerHTML +=  `<button onclick="getButton(this)" id="${nombrePokemonEnemigo}" class="enemigo">
	<img class="imagenEnemigo" src="../../../assets/images/pokemones enemigos/${nombrePokemonEnemigo}.png">
	</button>`
}
function cambiarBotonPokemonDerrotado(nombrePokemonDerrotado){
	const boton = document.getElementById(nombrePokemonDerrotado)
	boton.className = "pokemonDerrotado"
}
ipcRenderer.on('pokemonesDerrotados',(event,data) => {
	const {pokemonesDerrotados} = data;
	if(!_.isEmpty(pokemonesDerrotados)){
		_.forEach(pokemonesDerrotados,cambiarBotonPokemonDerrotado)
	}
})
ipcRenderer.on('avisoPokemonDerrotado',(event,data) => {
	cambiarBotonPokemonDerrotado(data.nombrePokemonDerrotado)
})