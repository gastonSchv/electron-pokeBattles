const TipoDePokemon = require('./TipoDePokemon')

module.exports = new TipoDePokemon({
  nombre:'electricidad',
  multiplicadoresDeAtributo: {vida:140,energia:5,fuerza:3,defensa:2,velocidad:2},
  energiaParaAtaques: {basico:250,medio:500,fuerte:750,maximo:1000}
})