const TipoDePokemon = require('../TipoDePokemon')

module.exports = new TipoDePokemon({
  nombre:'planta',
  multiplicadoresDeAtributo: {vida:200,energia:3,fuerza:2,defensa:3,velocidad:2},
  energiaParaAtaques: {basico:250,medio:500,fuerte:750,maximo:1000},
  energiaDeRecuperacion: 1500
})