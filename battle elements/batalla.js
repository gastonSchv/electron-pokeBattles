const juezDeBatalla = require('./juezDeBatalla')
const pokemonDeTesteoJaneleker = require('./pokemonDeTesteoJaneleker')
const pokemonDeTesteoLatoGara = require('./pokemonDeTesteoLatoGara')

try {
	juezDeBatalla.verificarEstadoPokemones([pokemonDeTesteoJaneleker,pokemonDeTesteoLatoGara])
	juezDeBatalla.verificarComportamientoPokemones([pokemonDeTesteoJaneleker,pokemonDeTesteoLatoGara])
  juezDeBatalla.oficiarBatalla(pokemonDeTesteoJaneleker,pokemonDeTesteoLatoGara)
}catch(err){
	console.log('\n** Partida finalizada por fallas **')
}
	