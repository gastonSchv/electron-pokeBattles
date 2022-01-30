const TipoDePokemon = require('../TipoDePokemon')

module.exports = new TipoDePokemon({
  nombre:'volador',
  multiplicadoresDeAtributo: {vida:150,energia:3,fuerza:2,defensa:2,velocidad:3},
  energiaParaAtaques: {basico:250,medio:500,fuerte:750,maximo:1000},
  energiaDeRecuperacion: 1500
})