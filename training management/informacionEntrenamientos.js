const vulpix = require('../battle elements/Pokemons/Pokemons enemigos/vulpix') // hacer que se busquen todos los pokemons
const pidgey = require('../battle elements/Pokemons/Pokemons enemigos/pidgey') // hacer que se busquen todos los pokemons
const caterpie = require('../battle elements/Pokemons/Pokemons enemigos/caterpie') // hacer que se busquen todos los pokemons
const psyduck = require('../battle elements/Pokemons/Pokemons enemigos/psyduck') // hacer que se busquen todos los pokemons

const _ = require('lodash')

const pokemones = [vulpix, pidgey, caterpie,psyduck];

module.exports = [{
        id: 'dimeTuNombre',
        titulo: 'DIME TU NOMBRE',
        premios: [{
                habilidad: 'vida',
                valor: 10000
            },
            {
                habilidad: 'defensa',
                valor: 70
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
                valor: 80
            },
            {
                habilidad: 'fuerza',
                valor: 100
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
                valor: 50
            },
            {
                habilidad: 'velocidad',
                valor: 100
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
                valor: 15000
            },
            {
                habilidad: 'energia',
                valor: 90
            }
        ],
        descripcion: 'Genera el metodo "fusionarConPokemon (unPokemon)" mediante el cual tu Pokemon reciba otro pokemon y retorne un objeto con los atributos (nombre,vida, energia, fuerza, defensa, velocidad) suma de los atributos del pokemon evaluado y tu pokemon',
        inputs: _.sample(pokemones)
    },
    {
        id: 'ordenalosPorVida',
        titulo: 'ORDENALOS POR VIDA',
        premios: [{
                habilidad: 'fuerza',
                valor: 60
            },
            {
                habilidad: 'defensa',
                valor: 100
            }
        ],
        descripcion: 'Genera el metodo "ordenarPorVida (unosPokemones)" mediante el cual tu Pokemon reciba una lista de pokemones y retorne dicha lista, ordenada segun la vida del pokemon de manera descendiente',
        inputs: [_.sample(pokemones)]
    },
    {
        id: 'encuentraAlDeFuego',
        titulo: 'ENCUENTRA AL DE FUEGO',
        premios: [{
                habilidad: 'velocidad',
                valor: 40
            },
            {
                habilidad: 'energia',
                valor: 80
            }
        ],
        descripcion: 'Genera el metodo "encontrarAlDeFuego (unPokemon)" mediante el cual tu Pokemon reciba una lista de pokemones y retorne al primer pokemon de fuego que encuentre',
        inputs: [_.sample(pokemones)]
    },
    {
        id: 'dimeCuantoPesa',
        titulo: 'DIME CUANTO PESA',
        premios: [{
                habilidad: 'vida',
                valor: 25000
            },
            {
                habilidad: 'defensa',
                valor: 200
            }
        ],
        descripcion: 'Genera el metodo "cuantoPesa (unPokemon)" mediante el cual tu Pokemon reciba el nombre de un pokemon, consulte la pokeapi y retorne el peso de dicho pokemon',
        inputs: [_.sample(pokemones).nombre]
    },
    {
        id: 'soloAguaYFuego',
        titulo: 'SOLO AGUA Y FUEGO',
        premios: [{
                habilidad: 'fuerza',
                valor: 50
            },
            {
                habilidad: 'defensa',
                valor: 30
            }
        ],
        descripcion: 'Genera el metodo "hallarLosDeAguaYFuego (unoPokemones)" mediante el cual tu Pokemon reciba una lista de Pokemones y retorne solo aquello que son de tipo aguo o fuego',
        inputs: [...pokemones]
    }
]