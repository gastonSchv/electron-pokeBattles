const TipoDePokemon = require('./TipoDePokemon')

module.exports = new TipoDePokemon({
  nombre:'agua',
  multiplicadoresDeAtributo: {vida:250,energia:1.5,fuerza:2,defensa:2,velocidad:1.5},
  energiaParaAtaques: {basico:250,medio:500,fuerte:750,maximo:1000}
})