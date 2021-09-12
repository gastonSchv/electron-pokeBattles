const TipoDePokemon = require('./TipoDePokemon')

module.exports = new TipoDePokemon({
  nombre:'normal',
  multiplicadoresDeAtributo: {vida:100,energia:3,fuerza:2,defensa:3,velocidad:2},
  energiaParaAtaques: {basico:150,medio:300,fuerte:450,maximo:600}
})