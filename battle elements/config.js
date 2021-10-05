const _ = require('lodash')

class config {
    constructor() {
        this.tiposDeAtaque = ['basico', 'fuerte', 'maximo'];
        this.ataquesVerificables = ['fuerte', 'maximo'];
        this.multiplicadoresDeAtaque = {
            basico: 5,
            medio: 10,
            fuerte: 15,
            maximo: 25
        };
        this.atributosDePokemon = ['vida', 'energia', 'fuerza', 'defensa', 'velocidad'];
        this.puntajePorAtributo = 1000;
        this.tiposDeDatoPorAtributo = {
            entrenador: 'string',
            nombre: 'string',
            evolucion: 'number',
            vida: 'number',
            energia: 'number',
            energiaLimite: 'number',
            fuerza: 'number',
            defensa: 'number',
            velocidad: 'number',
            dañoRecibido: 'number'
        }
        this.listaAtributosEstado = [
            'entrenador',
            'nombre',
            'evolucion',
            'vida',
            'energia',
            'energiaLimite',
            'fuerza',
            'defensa',
            'velocidad',
            'dañoRecibido'
        ];
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