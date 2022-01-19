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
	_.forEach(crearListadoOrdenadoPorPoder(),crearBotonEnemigo)
	renderizarBotonesEnemigos()
	util.crearBotonCerradoConEstilo(contenedor)
}
function renderizarBotonesEnemigos(){
	ipcRenderer.send('renderizarBotonesEnemigos',{})
}
function cerrarPantalla(){
	window.close()
}
function obtenerPokemon(pokemonName){
	return require(`${carpetaPokemonsEnemigos}/${pokemonName}`)
}
function crearListadoOrdenadoPorPoder(){
	return _(util.obtenerNombresDeArchivos(carpetaPokemonsEnemigos))
	.map(obtenerPokemon)
	.sortBy(p => {console.log(p.vida,p.danoDeAtaque('basico'),p.defensa);return p.poderTotal()})
	.map(pokemon => pokemon.nombre)
	.value()
}
function crearBotonEnemigo(nombrePokemonEnemigo){
	enemigosGrid.innerHTML +=  `<button onclick="getButton(this)" id="${nombrePokemonEnemigo}" class="enemigo enemigoRestringido" disabled>
	<img class="imagenEnemigo" src="../../../assets/images/pokemones enemigos/${nombrePokemonEnemigo}.png">
	</button>`
}
function cambiarBotonPokemonDerrotado(nombrePokemonDerrotado){
	const boton = document.getElementById(nombrePokemonDerrotado)
	boton.disabled = false
	boton.className = "enemigo pokemonDerrotado"
}
function cambiarBotonProximoPokemon(proximoPokemon){
	const boton = document.getElementById(proximoPokemon)
	boton.disabled = false
	boton.className = "enemigo proximoEnemigo"
}
ipcRenderer.on('renderizarBotonesEnemigos',(event,data) => {
	const {pokemonesDerrotados} = data;
	const pokemonsTotalesOrdenadosPorPoder = crearListadoOrdenadoPorPoder()
	const _proximoPokemon = () => {
		return _.find(pokemonsTotalesOrdenadosPorPoder, pokemon =>{
			return !_.includes(pokemonesDerrotados,pokemon)
		})
	}

	if(!_.isEmpty(pokemonesDerrotados)){
		_.forEach(pokemonesDerrotados,cambiarBotonPokemonDerrotado)
	}
	cambiarBotonProximoPokemon(_proximoPokemon())
})