const {ipcRenderer} = require('electron')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const carpetaPokemonsEnemigos = path.join(__dirname,'..','..','battle elements','Pokemons','Pokemons enemigos')
const util = require('../utils/util')

function getButton(button){
	ipcRenderer.send('screens:battleScreen',{enemigoSeleccionado:button.id})	
}
function funcionesDeInicio(){
	crearTodosLosBotonesEnemigos();
	util.crearBotonCerradoConEstilo(contenedor)
}
function cerrarPantalla(){
	window.close()
}
function crearBotonEnemigo(nombrePokemonEnemigo){
	console.log(nombrePokemonEnemigo);
	enemigosGrid.innerHTML +=  `<button onclick="getButton(this)" id="${nombrePokemonEnemigo}" class="enemigo">
	<img class="imagenEnemigo" src="../../../assets/images/${nombrePokemonEnemigo}.png">
	</button>`

	console.log(enemigosGrid)
}
function obtenerNombrePokemonDesdeNombreArchivo(nombreArchivo){
	return _.head(_.split(nombreArchivo,'.'))
}
function crearTodosLosBotonesEnemigos(){
 	fs.readdir(carpetaPokemonsEnemigos, (err, archivos) => {
	  	archivos.forEach(archivo => {
	  		crearBotonEnemigo(obtenerNombrePokemonDesdeNombreArchivo(archivo))
	  	});
	});
}
