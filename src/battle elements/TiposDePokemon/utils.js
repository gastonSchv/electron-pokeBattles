const _ = require('lodash')
const util = require('../../views/utils/util')

const obtenerTipo = nombreDeTipo => {
	const tipoDePokemon = require(`./Tipos/${nombreDeTipo}`)
	return tipoDePokemon
}
const obtenerTodosLosTipos = () => {
	return _.map(util.obtenerNombresDeArchivos(`${__dirname}/Tipos`), obtenerTipo)
}

module.exports = {
		obtenerTipo,
		obtenerTodosLosTipos
}