const TipoDePokemon = require('./TipoDePokemon')

module.exports = new TipoDePokemon({
  nombre:'fuego',
	multiplicadoresDeAtributo: {vida:150,energia:3,fuerza:4,defensa:1,velocidad:2},
	energiaParaAtaques: {basico:500,fuerte:750,maximo:1000}
})