const pokemonCarlito = {
    "nombre": "Carlito",
    "tipoDePokemon": "agua",
    "vida": 1500,
    "evolucion":1,
    "energia": 500,
    "fuerza": 1500,
    "defensa": 1000,
    "velocidad": 500,
    "deterioroRecibido": 0,
    miTipo: function(){return this.tipoDePokemon},
    vitalidad: function(){
    if (this.vida >= this.deterioroRecibido){
        vitalidad = this.vida-this.deterioroRecibido}
    else vitalidad = 0
           return vitalidad 
    },
    recuperarEnergia: function(energiaLimite){
        calculoEnergia = this.energia + 1500
        if (calculoEnergia >= energiaLimite){
            this.energia = energiaLimite
        }
        else this.energia = calculoEnergia
        return this.energia
    },
    recibirDeterioro: function(unDeterioroDeAtaque){
        calculoDeterioro = unDeterioroDeAtaque - this.defensa
        if (calculoDeterioro < 0.1*unDeterioroDeAtaque){
            this.deterioroRecibido = 0.1*unDeterioroDeAtaque
        }
        else this.deterioroRecibido = calculoDeterioro
        return this.deterioroRecibido
    },
    desmayarse: function(energiaLimite){
        calculoEnergia = this.energia + 750
        if (calculoEnergia >= energiaLimite){
            this.energia = energiaLimite
        }
        else this.energia = calculoEnergia
        return this.energia
    },
    disminuirEnergia: function(tipoDeAtaque){
        const  constoPorTipoDeAtaque = {
            basico: 250,
            fuerte: 750,
            maximo: 1000
        }
        console.log(this.energia - constoPorTipoDeAtaque[tipoDeAtaque])
        this.energia = this.energia - constoPorTipoDeAtaque[tipoDeAtaque]
    },
    impactoDeAtaque: function(tipoDeAtaque){
        const multiplicadorDeAtaque = {
            basico: 15,
            fuerte: 23,
            maximo: 25,
        }
        impactoDeAtaqueTotal = this.fuerza*multiplicadorDeAtaque[tipoDeAtaque]
        return impactoDeAtaqueTotal 
    },
    atacar: function(pokemonEnemigo,tipoDeAtaque){
        this.disminuirEnergia(tipoDeAtaque)
        const impactoDeAtaque = this.impactoDeAtaque()
        pokemonEnemigo.recibirDeterioro(impactoDeAtaque)
    }
}
module.exports = pokemonCarlito
/*
console.log(pokemon.miTipo())
console.log(pokemon.vitalidad())
console.log(pokemon.recuperarEnergia())
console.log(pokemon.recibirDeterioro())
console.log(pokemon.desmayarse())
console.log(pokemon.disminuirEnergia("fuerte"))
console.log(pokemon.impactoDeAtaque("basico"))
console.log(pokemon.atacar("raichu","fuerte"))
*/
