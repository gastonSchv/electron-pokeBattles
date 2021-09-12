const TipoDePokemon = require('./TipoDePokemon')

module.exports = new TipoDePokemon({
  nombre:'tierra',
  multiplicadoresDeAtributo: {vida:120,energia:2,fuerza:1,defensa:5,velocidad:2},
  energiaParaAtaques: {basico:250,medio:500,fuerte:750,maximo:1000}
})