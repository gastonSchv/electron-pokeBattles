const TipoDePokemon = require("./TipoDePokemon")

class TipoConEspecialEnergetico extends TipoDePokemon {
    constructor({ nombre, multiplicadoresDeAtributo, energiaParaAtaques, energiaDeRecuperacion }) {
        super({ nombre, multiplicadoresDeAtributo, energiaParaAtaques, energiaDeRecuperacion })
    }
    energiaParaAtaqueEspecial(pokemon) {
        return pokemon.energia
    }
    atacarEspecial(pokemonEnemigo, miPokemon) {
        const correctorPorEnergiaBaja = miPokemon.energia / this.energiaParaAtaques.maximo <= 1 ? 0.7 : 1
        const _multiplicadorPorEnergia = () => {
            return (1.15 + 1.03 * Math.log(miPokemon.energia / this.energiaParaAtaques.maximo)) * correctorPorEnergiaBaja
        }
        const _deterioroDeAtaqueEspecial = () => {
            return _.round(_.max([0, miPokemon.danoDeAtaque('maximo') * _multiplicadorPorEnergia()]))
        }
        pokemonEnemigo.recibirDeterioro(_deterioroDeAtaqueEspecial())
        miPokemon.disminuirEnergia('especial')
    }
}

module.exports = TipoConEspecialEnergetico