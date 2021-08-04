const bolbasaur = require('../battle elements/Pokemons/Pokemons enemigos/bolbasaur') // hacer que se busquen todos los pokemons
const squirtle = require('../battle elements/Pokemons/Pokemons enemigos/squirtle') // hacer que se busquen todos los pokemons
const caterpie = require('../battle elements/Pokemons/Pokemons enemigos/caterpie') // hacer que se busquen todos los pokemons

const pokemones = [bolbasaur,squirtle,caterpie];

module.exports = [
	{
        id: 'dimeTuNombre',
        titulo: 'DIME TU NOMBRE',
        premios: [{
                habilidad: 'fuerza',
                valor: 500
            },
            {
                habilidad: 'defensa',
                valor: 200
            }
        ],
        descripcion: 'Genera que tu Pokemon pueda retornar una string con su nombre cuando se invoca su metodo miNombre()',
        inputs: []
    },
	{
        id: 'quienEsElMasFuerte',
        titulo: 'QUIEN ES EL MAS FUERTE',
        premios: [{
                habilidad: 'vida',
                valor: 1000
            },
            {
                habilidad: 'defensa',
                valor: 400
            }
        ],
        descripcion: 'Genera que tu Pokemon pueda recibir un listado de pokemones y retornar el que tenga mas fuerza cuando se invoca su metodo elPokemonMasFuerte (unosPokemones)',
        inputs: [...pokemones]
    }
]