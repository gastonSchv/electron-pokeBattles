const TipoDePokemon = require('../TipoDePokemon')

module.exports = new TipoDePokemon({
  nombre:'roca',
  multiplicadoresDeAtributo: {vida:100,energia:1.5,fuerza:4,defensa:6,velocidad:1},
  energiaParaAtaques: {basico:250,medio:500,fuerte:750,maximo:1000},
  energiaDeRecuperacion: 1500
})