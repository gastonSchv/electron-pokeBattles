const _ = require('lodash')
const { ipcRenderer } = require('electron')
const personajeDerecho = require('../../battle elements/pokemonDeTesteoCharmander')
const personajeDerechoInicial = _.cloneDeep(personajeDerecho)
personajeDerecho.inicial = personajeDerechoInicial;
personajeIzquierdo = personajeDerechoInicial
const juezDeBatalla = require('../../battle elements/juezDeBatalla')
let largoInicialDeBarraEnergia = 150;
let largoInicialDeBarraVitalidad = 150;
let musicaDeBatallaPrendida = true;

const componentesHtmlDerecho = {
    fotoEnergia: 'luzDeRecuperacionDeEnergiaDerecho',
    barraEnergia: 'barraEnergiaPersonajeDerecho',
    barraVitalidad: 'barraVitalidadPersonajeDerecho',
    personaje: 'personajeDerecho',
    botonAtacar: 'botonDerechoAtacar',
    botonRecuperarEnergia: 'botonDerechoRecuperar',
    bordeBarraVitalidad: 'bordeBarraVitalidadDerecho',
    valorVitalidad: 'valorVitalidadPersonajeDerecho',
    valorEnergia: 'valorEnergiaPersonajeDerecho',
    iconoDesmayo: 'iconoDesmayoDerecho',
    sonidoAtaque: 'sonidoAtaqueDerecho'
}

const componentesHtmlIzquierdo = {
    fotoEnergia: 'luzDeRecuperacionDeEnergiaIzquierda',
    barraEnergia: 'barraEnergiaPersonajeIzquierdo',
    barraVitalidad: 'barraVitalidadPersonajeIzquierdo',
    personaje: 'personajeIzquierdo',
    botonAtacar: 'botonIzquierdoAtacar',
    botonRecuperarEnergia: 'botonIzquierdoRecuperar',
    bordeBarraVitalidad: 'bordeBarraVitalidadIzquierdo',
    valorVitalidad: 'valorVitalidadPersonajeIzquierdo',
    valorEnergia: 'valorEnergiaPersonajeIzquierdo',
    iconoDesmayo: 'iconoDesmayoIzquierdo',
    sonidoAtaque: 'sonidoAtaqueIzquierdo'
}
const componentesDefaultDerecho = {
    componentesHtml:{...componentesHtmlDerecho},
    posicionInicial:410
}
const componentesDefaultIzquierdo ={
    componentesHtml:{...componentesHtmlIzquierdo},
    posicionInicial:200
}
function asignarComponentesDefault(personaje,componentes){
    _.assign(personaje,{...componentes})
}
asignarComponentesDefault(personajeDerecho, componentesDefaultDerecho)

ipcRenderer.on('config:ruta', (event, data) => {
    console.log('llego ruta a battleScreen', data)
    personajeIzquierdo = require(`${data.ruta}`)
    const personajeIzquierdoInicial = _.cloneDeep(personajeIzquierdo)
    personajeIzquierdo.inicial = personajeIzquierdoInicial
    asignarComponentesDefault(personajeIzquierdo, componentesDefaultIzquierdo)
    actualizarValoresBarraVitalidad()
    actualizarValoresBarraEnergia()
})

function pedirRutaConfig() {
    ipcRenderer.send('config:pedidoRutaBattleScreen', {})
}

function funcionesDeInicio() {
    let musicaDeBatalla = document.getElementById("musicaDeBatalla");
    musicaDeBatalla.volume = 1
    musicaDeBatalla.loop = true
    let musicaDeBatallaImg = document.getElementById("musicaDeBatallaImg")
    pedirRutaConfig()
    prenderMusicaBatalla()
    actualizarValoresBarraVitalidad()
    actualizarValoresBarraEnergia()
}

function prenderSonidoVictoria() {
    const sonidoVictoria = document.getElementById('sonidoVictoria')
    sonidoVictoria.volume = 0.1
    sonidoVictoria.play()
}

function apagarMusicaBatalla() {
    musicaDeBatallaPrendida = false;
    musicaDeBatalla.pause()
    musicaDeBatallaImg.src = "../../../assets/images/audio off.png"
}

function prenderMusicaBatalla() {
    //musicaDeBatalla.play()
    musicaDeBatallaPrendida = true;
    musicaDeBatallaImg.src = "../../../assets/images/audio on.png"
}

function cambiarEstadoMusicaDeBatalla() {
    if (musicaDeBatallaPrendida) {
        apagarMusicaBatalla()
    } else {
        prenderMusicaBatalla()
    }
}

function reload() {
    ipcRenderer.send('buttonClick:restart', {})
}

function largoDeBarra(largoInicial, cantidadInicial, cantidadFinal) {
    return _.max([0, largoInicial * cantidadFinal / cantidadInicial])
}

function largoDeBarraEnergia(personaje) {
    return largoDeBarra(largoInicialDeBarraEnergia, personaje.inicial.energia, personaje.energia)
}

function largoDeBarraVitalidad(personaje) {
    return largoDeBarra(largoInicialDeBarraVitalidad, personaje.inicial.vida, personaje.vitalidad())
}

function desmayarse(personajeAtacante) {
    var iconoDesmayo = document.getElementById(personajeAtacante.componentesHtml.iconoDesmayo)
    var sonidoDesmayo = document.getElementById("sonidoDesmayo")
    sonidoDesmayo.volume = 0.3
    sonidoDesmayo.play()
    aparecerYDesvanecer(iconoDesmayo, 0.1)
}

function desplazarse(enemyXPosition, personajeAtacanteImg) {
    var inReturn = false;
    var x = parseInt(getComputedStyle(personajeAtacanteImg).left.split('px')[0])
    var inReturn = false
    var counter = 0
    var distance = enemyXPosition - x
    var stepsFoward = 25
    var fowardPace = distance / stepsFoward
    var stepsBackwards = 120
    var backwardsPace = distance / stepsBackwards
    var intervalId = setInterval(function() {
        if (counter == stepsFoward + stepsBackwards - 1) {
            clearInterval(intervalId)
        }
        counter++;
        if (counter > stepsFoward) {
            x -= backwardsPace;
            personajeAtacanteImg.style.left = `${x}px`;
        } else {
            x += fowardPace;
            personajeAtacanteImg.style.left = `${x}px`;
        }
    }, 1)
}

function aparecerYDesvanecer(htmlComponent, pace = 0.2) {
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

function editInnerHtml(elementId, value) {
    document.getElementById(elementId).innerHTML = value
}

function ambosPersonajes(func) {
    func(personajeIzquierdo)
    func(personajeDerecho)
}

function actualizarValorBarraVitalidad(personaje) {
    editInnerHtml(personaje.componentesHtml.valorVitalidad, `${personaje.vitalidad()} / ${personaje.vida}`)
}

function actualizarValoresBarraVitalidad() {
    ambosPersonajes(actualizarValorBarraVitalidad)
}

function actualizarValorBarraEnergia(personaje) {
    editInnerHtml(personaje.componentesHtml.valorEnergia, `${personaje.energia} / ${personaje.energiaLimite}`)
}

function actualizarValoresBarraEnergia() {
    ambosPersonajes(actualizarValorBarraEnergia)
}

function actualizarLargoBarraEnergia(personaje) {
    var barraEnergiaPersonaje = document.getElementById(personaje.componentesHtml.barraEnergia);
    barraEnergiaPersonaje.style.width = `${largoDeBarraEnergia(personaje)}px`;
}

function actualizarLargosBarrasDeEnergia() {
    ambosPersonajes(actualizarLargoBarraEnergia)
}

function actualizarLargoBarraVitalidad(personaje) {
    var barraVitalidadPersonaje = document.getElementById(personaje.componentesHtml.barraVitalidad);
    barraVitalidadPersonaje.style.width = `${largoDeBarraVitalidad(personaje)}px`;
}

function actualizarLargosBarrasDeVitalidad() {
    ambosPersonajes(actualizarLargoBarraVitalidad)
}

function actualizarElementosDeBatalla() {
    actualizarLargosBarrasDeVitalidad()
    actualizarLargosBarrasDeEnergia()
    actualizarValoresBarraEnergia()
    actualizarValoresBarraVitalidad()
}

function editarDeshabilitacionDeBotones(personaje, estado) {
    document.getElementById(personaje.componentesHtml.botonAtacar).disabled = estado
    document.getElementById(personaje.componentesHtml.botonRecuperarEnergia).disabled = estado
}

function cambioCartelGanador(ganador) {
    document.getElementById('cartelDesafio').style.opacity = 0
    document.getElementById('cartelGanadorBackground').style.opacity = 0.5
    document.getElementById('botonRestartGanador').style.opacity = 1
    const textoGanador = document.getElementById('textoGanador')
    textoGanador.style.opacity = 1
    textoGanador.innerHTML = `${_.upperCase(ganador.nombre)} ES EL GANADOR!`
}

function recuperarEnergia(personajeRecuperado, otroPersonaje) {
    const fotoEnergia = document.getElementById(personajeRecuperado.componentesHtml.fotoEnergia);
    const barraEnergiaPersonaje = document.getElementById(personajeRecuperado.componentesHtml.barraEnergia);
    const sonidoRecuperarEnergia = document.getElementById('sonidoRecuperarEnergia')

    sonidoRecuperarEnergia.play()
    personajeRecuperado.recuperarEnergia()
    aparecerYDesvanecer(fotoEnergia, 0.2);
    actualizarValoresBarraEnergia()
    actualizarLargosBarrasDeEnergia()
    editarDeshabilitacionDeBotones(personajeRecuperado, true)
    editarDeshabilitacionDeBotones(otroPersonaje, false)
}

function efectosAtacar(personajeAtacado, personajeAtacanteImg, sonidoAtaque, personajeAtacante) {
    sonidoAtaque.volume = 0.1
    sonidoAtaque.play()//definir una logica para que cambie si es el último ataque. Ver que es lo que quedaría bien
    //personajeAtacante.esAtaqueMortal(personajeAtacado,'fuerte') ? '' : sonidoAtaque.play() 
    desplazarse(personajeAtacado.posicionInicial, personajeAtacanteImg)
}

function atacar(personajeAtacado, personajeAtacante) {
    var personajeAtacanteImg = document.getElementById(personajeAtacante.componentesHtml.personaje);
    var botonAtacarAtacante = document.getElementById(personajeAtacante.componentesHtml.botonAtacar);
    var botonAtacarAtacado = document.getElementById(personajeAtacado.componentesHtml.botonAtacar)
    var sonidoAtaque = document.getElementById(personajeAtacante.componentesHtml.sonidoAtaque)

    if (personajeAtacante.energiaSuficiente('fuerte')) {
        efectosAtacar(personajeAtacado, personajeAtacanteImg, sonidoAtaque,personajeAtacante)
    } else {
        desmayarse(personajeAtacante)
    };
    personajeAtacante.atacar(personajeAtacado, 'fuerte'); //buscar la manera de plantear los distintos tipos de ataque
    editarDeshabilitacionDeBotones(personajeAtacante, true)
    actualizarElementosDeBatalla();
    editarDeshabilitacionDeBotones(personajeAtacado, false)
    const ganador = juezDeBatalla.definirGanador(personajeAtacante, personajeAtacado)
    if (ganador) {
        cambioCartelGanador(ganador);
        editarDeshabilitacionDeBotones(personajeAtacante, true)
        editarDeshabilitacionDeBotones(personajeAtacado, true)
        prenderSonidoVictoria()
        apagarMusicaBatalla()
    }
}

function atacarAlDerecho() {
    console.log(personajeIzquierdo, personajeDerecho)
    atacar(personajeDerecho, personajeIzquierdo)
}

function atacarAlIzquierdo() {
    atacar(personajeIzquierdo, personajeDerecho)
}

function recuperarEnergiaIzquierdo() {
    recuperarEnergia(personajeIzquierdo, personajeDerecho)
}

function recuperarEnergiaDerecho() {
    recuperarEnergia(personajeDerecho, personajeIzquierdo)
}