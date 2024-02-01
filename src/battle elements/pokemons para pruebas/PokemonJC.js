const _ = require('lodash')

var arrayPokemones = [{
    nombre: 'juan',
    fuerza: 200,
    vida:3000,
    tipoDePokemon:'agua'
}, {
    nombre: 'ernesto',
    fuerza: 500,
    vida:2500,
    tipoDePokemon: 'fuego'
}, {
    nombre: 'patri',
    fuerza: 500,
    vida:4000,
    tipoDePokemon:'planta'
}]

var SoloUnPokemon = {
    nombre: 'juan',
    fuerza: 200,
    vida: 3000,
    energia:800,
    defensa:500,
    velocidad:500,
    tipoDePokemon:'agua'
}

const Raichu = {
    nombre: 'Raichu',
    tipoDePokemon: 'electricidad',
    vida:3000 *90,
    energia:500 *3.5,
    fuerza:350 * 3,
    defensa:350 * 2 ,
    velocidad:800 * 2,
    evolucion:1,
    deterioroRecibido:0,

    // METODOS GENERALES
    
    miTipo: function(){
        return this.tipoDePokemon
    },
    vitalidad: function(){
        return this.vida - this.deterioroRecibido
    },
    recuperarEnergia: function(energíaLimite){
        const energiaFinal = this.energia + 1500
        if(energiaFinal > energíaLimite){
            return this.energia = energíaLimite
        }
        else{
            return this.energia = energiaFinal
        }
    },
    recibirDeterioro: function(unDeterioroDeAtaque){
        const deterioroFinal = unDeterioroDeAtaque - (this.defensa * 15)
        if(deterioroFinal < 0.1*unDeterioroDeAtaque){
            return this.deterioroRecibido += 0.1*unDeterioroDeAtaque
        }
        else{
            return this.deterioroRecibido = deterioroFinal
        }
    },
    desmayarse: function(energíaLimite){
        const energiaFinal = this.energia + 750
        if(energiaFinal > energíaLimite){
            return this.energia = energíaLimite
        }
        else{
            return this.energia = energiaFinal
        }
    },
    disminuirEnergia: function(tipoDeAtaque){
        const energiaPorTipo = {
            basico: 250,
            fuerte: 750,
            maximo:1000
        }
        this.energia = this.energia - energiaPorTipo[tipoDeAtaque]
        return this.energia
    },
    impactoDeAtaque: function(tipoDeAtaque){
        const multiplicador = {
            basico: 15,
            fuerte: 23,
            maximo:25
        }
        return this.fuerza*multiplicador[tipoDeAtaque]
    },
    atacar: function(pokemonEnemigo,tipoDeAtaque){
        
        this.disminuirEnergia(tipoDeAtaque)
        
        const impacto = this.impactoDeAtaque(tipoDeAtaque)

        pokemonEnemigo.recibirDeterioro(impacto)
    },

    //METODOS DE ENTRENAMIENTO

    miNombre: function(){
        return this.nombre
    },
    elPokemonMasFuerte: function(unosPokemones){ 
        const maximaFuerza = Math.max.apply(null,unosPokemones.map(i => i.fuerza))
        const masFuerte = _.filter(unosPokemones,{fuerza: maximaFuerza})
        
        return masFuerte
    },
    encuentraAlDeFuego: function(unosPokemones){
        const elDeFuego = _.find(unosPokemones,{tipoDePokemon: 'fuego'})
        return elDeFuego
    },
    obtenerAtributos: function(unPokemon){
        const atributos = {
            vida: unPokemon.vida,
            energia: unPokemon.energia,
            fuerza: unPokemon.fuerza,
            defensa: unPokemon.defensa,
            velocidad: unPokemon.velocidad
        }
        return atributos
    },
    ordenarPorVida: function(unosPokemones){
        const ordenados = _.sortBy(unosPokemones,['vida'])
        return ordenados.reverse()
    },
    fusionarConPokemon: function(unPokemon){
        const fusion = {
            nombre: this.nombre + unPokemon.nombre,
            vida: unPokemon.vida + this.vida,
            energia: unPokemon.energia + this.energia,
            fuerza: unPokemon.fuerza + this.fuerza,
            defensa: unPokemon.defensa + this.defensa,
            velocidad: unPokemon.velocidad + this.velocidad
        }
        console.log("fusion",fusion)
        return fusion
    },
    hallarLosDeAguaYFuego: function(unosPokemones){
        const fuegoYAgua = _.filter(unosPokemones,({tipoDePokemon: 'agua'},{tipoDePokemon: 'fuego'}))
        return fuegoYAgua
    }
}



module.exports = Raichu