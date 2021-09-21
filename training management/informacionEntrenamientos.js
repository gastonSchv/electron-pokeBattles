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
                valor: 10000
            },
            {
                habilidad: 'defensa',
                valor: 300
            }
        ],
        descripcion: 'Genera el metodo miNombre() mediante el cual tu Pokemon pueda retornar una string con su nombre',
        inputs: []
    },
    {
        id: 'quienEsElMasFuerte',
        titulo: 'QUIEN ES EL MAS FUERTE',
        premios: [{
                habilidad: 'velocidad',
                valor: 200
            },
            {
                habilidad: 'fuerza',
                valor: 150
            }
        ],
        descripcion: 'Genera el metodo "elPokemonMasFuerte (unosPokemones)" mediante el cual tu Pokemon reciba un listado de pokemones y retorne el que tenga mas fuerza',
        inputs: [...pokemones]
    },
    {
        id: 'obtenSusAtributos',
        titulo: 'OBTEN SUS ATRIBUTOS',
        premios: [{
                habilidad: 'energia',
                valor: 200
            },
            {
                habilidad: 'velocidad',
                valor: 150
            }
        ],
        descripcion: 'Genera el metodo "obtenerAtributos(unPokemon)" mediante el cual tu Pokemon reciba otro pokemon y retorne un objeto con los atributos y valores (vida, energia, fuerza, defensa, velocidad) para dicho pokemon',
        inputs: _.sample(pokemones)
    },
    {
        id: 'fusionDePokemones',
        titulo: 'FUSION DE POKEMONES',
        premios: [{
                habilidad: 'vida',
                valor: 30000
            },
            {
                habilidad: 'energia',
                valor: 1000
            }
        ],
        descripcion: 'Genera el metodo "fusionarConPokemon (unPokemon)" mediante el cual tu Pokemon reciba otro pokemon y retorne un objeto con los atributos (nombre,vida, energia, fuerza, defensa, velocidad) suma de los atributos del pokemons evaluado y tu pokemon',
        inputs: _.sample(pokemones)
    }
]