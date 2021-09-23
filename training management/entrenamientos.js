const relator = require('../battle elements/relator')
const entrenamientoBuilder  = require('./entrenamientoBuilder')
const _ = require('lodash')


module.exports = [
 entrenamientoBuilder('dimeTuNombre'),
 entrenamientoBuilder('quienEsElMasFuerte'),
 entrenamientoBuilder('obtenSusAtributos'),
 entrenamientoBuilder('fusionDePokemones'),
 entrenamientoBuilder('dimeCuantoPesa')

]