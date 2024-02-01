const TipoDePokemon = require('../TipoDePokemon')

module.exports = new TipoDePokemon({
  nombre:'dragon',
  multiplicadoresDeAtributo: {vida:125,energia:3,fuerza:2.5,defensa:2.5,velocidad:3.5},
  energiaParaAtaques: {basico:250,medio:500,fuerte:750,maximo:1000},
  energiaDeRecuperacion: 1500
})