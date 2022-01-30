const TipoDePokemon = require('../TipoDePokemon')

module.exports = new TipoDePokemon({
  nombre:'agua',
  multiplicadoresDeAtributo: {vida:200,energia:2.5,fuerza:2.5,defensa:3,velocidad:1.5},
  energiaParaAtaques: {basico:250,medio:500,fuerte:750,maximo:1000},
  energiaDeRecuperacion: 1500
})