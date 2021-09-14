const TipoDePokemon = require('./TipoDePokemon')

module.exports = new TipoDePokemon({
  nombre:'hada',
  multiplicadoresDeAtributo: {vida:220,energia:2,fuerza:1,defensa:2,velocidad:2},
  energiaParaAtaques: {basico:250,medio:500,fuerte:750,maximo:1000}
})