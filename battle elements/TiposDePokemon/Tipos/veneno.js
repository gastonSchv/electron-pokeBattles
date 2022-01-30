const TipoDePokemon = require('../TipoDePokemon')

module.exports = new TipoDePokemon({
  nombre:'veneno',
  multiplicadoresDeAtributo: {vida:110,energia:3,fuerza:3,defensa:1,velocidad:2},
  energiaParaAtaques: {basico:250,medio:500,fuerte:750,maximo:1000},
  energiaDeRecuperacion: 1500
})