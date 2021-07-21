const TipoDePokemon = require('./TipoDePokemon')

module.exports = new TipoDePokemon({
  nombre:'bicho',
  multiplicadoresDeAtributo: {vida:180,energia:2.5,fuerza:2,defensa:5,velocidad:2},
  energiaParaAtaques: {basico:500,fuerte:750,maximo:1000}
})