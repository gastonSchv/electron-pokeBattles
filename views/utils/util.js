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
    largoDeBarra(largoInicial,cantidadInicial,cantidadFinal){
        return _.max([0, largoInicial * cantidadFinal / cantidadInicial])
    }
}

module.exports = new Util