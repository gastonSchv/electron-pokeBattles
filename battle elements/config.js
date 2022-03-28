const _ = require('lodash')

class config {
    constructor() {
        this.tiposDeAtaque = ['basico','fuerte', 'maximo'];
        this.ataquesVerificables = ['basico','fuerte', 'maximo'];
        this.multiplicadoresDeAtaque = {
            basico: 15,
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
            deterioroRecibido: 'number'
        }
        this.listaAtributosEstado = [
            'nombre',
            'evolucion',
            'vida',
            'energia',
            'fuerza',
            'defensa',
            'velocidad',
            'deterioroRecibido'
        ];
        this.energiaDeDesmayo = 750;
        this.tiposDePokemonAceptados = ['agua','fuego','electricidad','planta'];
        this.adicionalDeDefensa = {
            Baja:500,
            Media: 700,
            Alta: 1000
        };
        this.energiaPorDefensa = {
            Baja:0,
            Media: 300,
            Alta: 500
        }
    }
    puntajeMaximoPermitido() {
        return this.atributosDePokemon.length * this.puntajePorAtributo
    }
    multiplicadorDeAtaque(tipoDeAtaque) {
        return _.get(this.multiplicadoresDeAtaque, tipoDeAtaque)
    }
    defensaAdicionalPorEstrategia(tipoDeDefensa){
        return _.get(this.adicionalDeDefensa,tipoDeDefensa)
    }
    consumoEnergiaPorDefensa(tipoDeDefensa){
        return _.get(this.energiaPorDefensa,tipoDeDefensa)
    }
}

module.exports = new config()