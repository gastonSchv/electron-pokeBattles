const bolbasaur = require('../battle elements/Pokemons/Pokemons enemigos/ekans') // hacer que se busquen todos los pokemons
const squirtle = require('../battle elements/Pokemons/Pokemons enemigos/pidgey') // hacer que se busquen todos los pokemons
const caterpie = require('../battle elements/Pokemons/Pokemons enemigos/caterpie') // hacer que se busquen todos los pokemons
const _ = require('lodash')

const pokemones = [bolbasaur, squirtle, caterpie];

module.exports = [{
        id: 'dimeTuNombre',
        titulo: 'DIME TU NOMBRE',
        premios: [{
                habilidad: 'vida',
                valor: 60000
            },
            {
                habilidad: 'defensa',
                valor: 3000
            }
        ],
        descripcion: 'Genera que tu Pokemon pueda retornar una string con su nombre cuando se invoca su metodo miNombre()',
        inputs: []
    },
    {
        id: 'quienEsElMasFuerte',
        titulo: 'QUIEN ES EL MAS FUERTE',
        premios: [{
                habilidad: 'velocidad',
                valor: 3000
            },
            {
                habilidad: 'fuerza',
                valor: 1000
            }
        ],
        descripcion: 'Genera el metodo "elPokemonMasFuerte (unosPokemones)" en tu Pokemon que reciba un listado de pokemones y retorne el que tenga mas fuerza',
        inputs: [...pokemones]
    },
    {
        id: 'obtenSusAtributos',
        titulo: 'OBTEN SUS ATRIBUTOS',
        premios: [{
                habilidad: 'energia',
                valor: 3000
            },
            {
                habilidad: 'velocidad',
                valor: 1000
            }
        ],
        descripcion: 'Genera el metodo "obtenerAtributos(unPokemon)" en tu Pokemon que reciba otro pokemon y retorne un objeto con los atributos (vida, energia, fuerza, defensa, velocidad) y valores para dicho pokemon',
        inputs: _.sample(pokemones)
    }
]