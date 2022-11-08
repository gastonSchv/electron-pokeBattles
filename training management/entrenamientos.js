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
 entrenamientoBuilder('soloAguaYFuego'),
 entrenamientoBuilder('miEntrenador'),
 entrenamientoBuilder('dimeCuantoPesa'),
 //entrenamientoBuilder('armarCadenaDeEvoluciones')

]