const _ = require('lodash')

class config {
    constructor() {
        this.tiposDeAtaque = ['basico','medio','fuerte', 'maximo'];
        this.ataquesVerificables = ['basico','medio','fuerte', 'maximo'];
        this.multiplicadoresDeAtaque = {
            basico: 15,
            medio: 16,
            fuerte: 23,
            maximo: 25
        };
        this.multiplicadorDeDefensa = 15;
        this.atributosDePokemon = ['vida', 'energia', 'fuerza', 'defensa', 'velocidad'];
        this.puntajePorAtributo = 1000;
        this.tiposDeDatoPorAtributo = {
            nombre: 'string',
            evolucion: 'number',
            vida: 'number',
            energia: 'number',
            fuerza: 'number',
            defensa: 'number',
            velocidad: 'number',
            dañoRecibido: 'number'
        }
        this.listaAtributosEstado = [
            'nombre',
            'evolucion',
            'vida',
            'energia',
            'fuerza',
            'defensa',
            'velocidad',
            'dañoRecibido'
        ];
        this.energiaDeDesmayo = 750;
        this.tiposDePokemonAceptados = ['agua','fuego','electricidad','planta'];
    }
    puntajeMaximoPermitido() {
        return this.atributosDePokemon.length * this.puntajePorAtributo
    }
    multiplicadorDeAtaque(tipoDeAtaque) {
        return _.get(this.multiplicadoresDeAtaque, tipoDeAtaque)
    }
}

module.exports = new config()