/*const Store = require('electron-store')
const store = new Store()
*/
const _ = require('lodash')
const modificacionesEstadisticas = require('../../battle elements/modificacionesEstadisticas')
const config = require('../../battle elements/config')

class Util {
    constructor() {

    }
    cambiarEstadoMusicaDeBatalla(musicaDeBatalla, musicaDeBatallaPrendida, musicaDeBatallaImg) {
        if (musicaDeBatallaPrendida) {
            this.apagarMusica(musicaDeBatalla, musicaDeBatallaImg)
        } else {
            this.prenderMusica(musicaDeBatalla, musicaDeBatallaImg)
        }
    }
    prenderMusica(musicaDeBatalla, musicaDeBatallaImg) {
        musicaDeBatalla.play()
        musicaDeBatallaImg.src = "../../../assets/images/audio on.png"
    }
    apagarMusica(musicaDeBatalla, musicaDeBatallaImg) {
        musicaDeBatalla.pause()
        musicaDeBatallaImg.src = "../../../assets/images/audio off.png"
    }
    aparecerYDesvanecer(htmlComponent, pace = 0.2) {
        var opacity = 0;
        var variationOpacityPace = pace;
        var counter = 1;
        var intervalId = setInterval(function() {
            if (counter / 2 == 1 / variationOpacityPace) {
                clearInterval(intervalId)
            }
            if (counter > 1 / variationOpacityPace) {
                opacity -= variationOpacityPace
                htmlComponent.style.opacity = opacity
            } else {
                opacity += variationOpacityPace
                htmlComponent.style.opacity = opacity
            }
            counter++;
        }, 70)
    }
    largoDeBarra(largoInicial, cantidadInicial, cantidadFinal) {
        return _.max([0, largoInicial * cantidadFinal / cantidadInicial])
    }
    __modificacionEstadisticas(unPokemon) {
        return _.find(modificacionesEstadisticas, ({ nombrePokemon }) => _.isEqual(nombrePokemon, unPokemon.nombre))
    }
    valorModificacionAtributo = (atributoEvaluado, unPokemon) => {
        if (this.__modificacionEstadisticas(unPokemon)) {
            const atributoParaModificar = _.find(this.__modificacionEstadisticas(unPokemon).atributos, ({ atributo }) => _.isEqual(atributo, atributoEvaluado))
            return atributoParaModificar?atributoParaModificar.valor : 0
        }
        return 0
    }
    modificarEstadisticasPorEntrenamiento(unPokemon) {
        const __modificarEstadistica = (atributo, modificacion) => {
            unPokemon[atributo] += modificacion
        }
        _.forEach(config.atributosDePokemon.concat('energiaLimite'), atributo => __modificarEstadistica(atributo, this.valorModificacionAtributo(atributo, unPokemon)))
    }
    crearBotonCerradoConEstilo(contenedor){
        contenedor.innerHTML += `<div id="botonCerrarVentana">
            <img src="../../../assets/images/cerrar ventana.png" onclick="cerrarPantalla()">
        </div>`
    }
}

module.exports = new Util