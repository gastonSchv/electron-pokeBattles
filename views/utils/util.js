const _ = require('lodash')
const config = require('../../battle elements/config')
const juezDeEntrenamiento = require('../../training management/juezDeEntrenamiento')

class Util {
    constructor() {}
    cambiarEstadoMusicaDeBatalla(musicaDeBatalla, musicaDeBatallaPrendida, musicaDeBatallaImg) {
        if (musicaDeBatallaPrendida) {
            this.apagarMusica(musicaDeBatalla, musicaDeBatallaImg)
        } else {
            this.prenderMusica(musicaDeBatalla, musicaDeBatallaImg)
        }
    }
    prenderMusica(musicaDeBatalla, musicaDeBatallaImg) {
        //musicaDeBatalla.play()
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
    valorModificacionAtributo = (atributoEvaluado, unPokemon) => {

        if (juezDeEntrenamiento.tieneModificacionDeAtributo(unPokemon, atributoEvaluado)) {
            const atributoParaModificar = _.find(juezDeEntrenamiento.modificacionEstadisticasPorEntrenamiento(unPokemon), ({ atributo }) => _.isEqual(atributo, atributoEvaluado))
            return atributoParaModificar ? atributoParaModificar.valor : 0
        }
        return 0
    }
    modificarEstadisticasPorEntrenamiento(unPokemon) {
        const __modificarEstadistica = (atributo, modificacion) => {
            unPokemon[atributo] += modificacion
        }
        if (juezDeEntrenamiento.tieneModificacionDeEstadisticas(unPokemon)) {
            _.forEach(config.atributosDePokemon.concat('energiaLimite'), atributo => __modificarEstadistica(atributo, this.valorModificacionAtributo(atributo, unPokemon)))
        }
    }
    crearBotonCerradoConEstilo(contenedor) {
        contenedor.innerHTML += `<div id="botonCerrarVentana">
            <img src="../../../assets/images/cerrar ventana.png" onclick="cerrarPantalla()">
        </div>`
    }
    deshabilitarBotones(unosBotones) {
        _.forEach(unosBotones, boton => {
            boton.disabled = true
        })
    }
    habilitarBotones(unosBotones) {
        _.forEach(unosBotones, boton => {
            boton.disabled = false
        })
    }
    substringSiHaceFalta(mensaje, numCaracteres) {
        return mensaje.length > numCaracteres ? `${mensaje.substring(0,numCaracteres)}...` : mensaje
    }
    colocarFotoMiPokemon(div, pokemon) {
        const tipoDePokemon = pokemon.miTipo().toLowerCase();
        this.esTipoAceptado(tipoDePokemon) ? div.innerHTML += `<img src="../../../assets/images/mi pokemon/${tipoDePokemon}.png">`:''
    }
    colocarFotoMiniaturaMiPokemon(div, pokemon) {
        const tipoDePokemon = pokemon.miTipo().toLowerCase()
        this.esTipoAceptado(tipoDePokemon) ? div.innerHTML = `<img src="../../../assets/images/miniaturas/${tipoDePokemon}.png">`:''
    }
    obtenerNombreDesdeNombreArchivo(nombreArchivo) {
        return _.head(_.split(nombreArchivo, '.'))
    }
    hacerConNombresDeArchivos(carpeta, funcion) {
        fs.readdir(carpeta, (err, archivos) => {
            archivos.forEach(archivo => funcion(this.obtenerNombreDesdeNombreArchivo(archivo)))
        })
    }
    esTipoAceptado(unTipo) {
        return _.includes(config.tiposDePokemonAceptados, unTipo)
    }
}

module.exports = new Util