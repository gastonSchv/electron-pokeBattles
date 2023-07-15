const relator = require('../battle elements/relator')
const entrenamientoBuilder  = require('./entrenamientoBuilder')
const _ = require('lodash')


module.exports = [
 entrenamientoBuilder('dimeTuNombre'),
 entrenamientoBuilder('quienEsElMasFuerte'),
 entrenamientoBuilder('encuentraAlDeFuego'),
 entrenamientoBuilder('obtenSusAtributos'),
 entrenamientoBuilder('ordenalosPorVida'),
 entrenamientoBuilder('fusionDePokemones'),
 entrenamientoBuilder('miEntrenador'),
 entrenamientoBuilder('soloAguaYFuego'),
 entrenamientoBuilder('dimeCuantoPesa'),
 //entrenamientoBuilder('armarCadenaDeEvoluciones')

]