const _ = require('lodash')
const config = require('../../battle elements/config')
const juezDeEntrenamiento = require('../../training management/juezDeEntrenamiento')
const fs = require('fs')

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
        musicaDeBatalla.play()
        musicaDeBatallaImg.src = "../../../assets/images/audio on.png"
    }
    apagarMusica(musicaDeBatalla, musicaDeBatallaImg) {
        musicaDeBatalla.pause()
        musicaDeBatallaImg.src = "../../../assets/images/audio off.png"
    }
    aparecerYDesvanecer(htmlComponent, steps = 10) {
        let opacity = 0;
        let counter = 1;
        let opacityPace = 1/steps;
        let intervalId = setInterval(function() {
            if (counter / 2 ==  steps) {
                clearInterval(intervalId)
            }
            if (counter > steps) {
                opacity -= opacityPace
                htmlComponent.style.opacity = opacity
            } else {
                opacity += opacityPace
                htmlComponent.style.opacity = opacity
            }
            counter++;
        }, 70)
    }
    largoDeBarra(largoInicial, cantidadInicial, cantidadFinal) {
        const largoRegular = _.max([0, largoInicial * cantidadFinal / cantidadInicial]);
        const caracteresStringCantidadFinal = _.toString(cantidadFinal).replace(".","").length;
        const largoCaracteres = caracteresStringCantidadFinal * 10;

        return largoRegular < largoCaracteres && cantidadFinal != 0 ? largoCaracteres: largoRegular 
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
            _.forEach(config.atributosDePokemon, atributo => __modificarEstadistica(atributo, this.valorModificacionAtributo(atributo, unPokemon)))
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
    esTipoAceptado(tipoDePokemon){
        return _.includes(config.tiposDePokemonAceptados,tipoDePokemon)
    }
    colocarFotoMiPokemon(div, pokemon) {
        try{
            const tipoDePokemon = pokemon.miTipo().toLowerCase();
            this.esTipoAceptado(tipoDePokemon) ? div.innerHTML += `<img src="../../../assets/images/mi pokemon/${tipoDePokemon}.png">` : ''
        }catch(err){
            div.innerHTML += ""
        }
    }
    colocarFotoMiniaturaMiPokemon(div, pokemon) {
        try {
            const tipoDePokemon = pokemon.miTipo().toLowerCase()
            this.esTipoAceptado(tipoDePokemon) ? div.innerHTML = `<img src="../../../assets/images/miniaturas/${tipoDePokemon}.png">` : ''
        } catch (err) {
            div.innerHTML = ""
        }
    }
    obtenerNombreDesdeNombreArchivo(nombreArchivo) {
        return _.head(_.split(nombreArchivo, '.'))
    }
    hacerConNombresDeArchivos(carpeta, unaFuncion) {
        fs.readdir(carpeta, (err, archivos) => {
            archivos.forEach(archivo => unaFuncion(this.obtenerNombreDesdeNombreArchivo(archivo)))
        })
    }
    obtenerNombresDeArchivos(carpeta) {
        const archivos = fs.readdirSync(carpeta);
        return _(archivos)
        .map(archivo => this.obtenerNombreDesdeNombreArchivo(archivo))
        .compact()
        .value()
    }
    habilitarDetalleResultadoFallido(div, resourceId, err) { //agregar localizacion
        div.innerHTML += `
        <button id="botonError${resourceId}" class="botonDetalleError" onclick="mostrarDetalleError('\
         ${err.prettyMessage()}','${err.recommendations()}','${err.message()}')">
            detalle error
        </button>`
    }
    parentFolder(dirname){
        return _.last(dirname.split("\\"))
    }
}

module.exports = new Util