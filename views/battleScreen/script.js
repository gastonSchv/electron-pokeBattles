const _ = require('lodash')
const { ipcRenderer } = require('electron')
const util = require('../utils/util')
const juezDeBatalla = require('../../evaluation management/juezDeBatalla')
let largoInicialDeBarraEnergia = 150;
let largoInicialDeBarraVitalidad = 150;
let musicaDeBatallaPrendida = true;
const $ = require('jquery')
const config = require('../../battle elements/config')
const TipoDePokemon = require('../../battle elements/TiposDePokemon/TipoDePokemon')
let personajeDerecho = require('../../battle elements/Pokemons/Pokemons enemigos/caterpie')
util.modificarEstadisticasPorEntrenamiento(personajeDerecho)

personajeDerecho.inicial = _.cloneDeep(personajeDerecho);
personajeIzquierdo = _.cloneDeep(personajeDerecho)

const componentesHtmlDerecho = {
    fotoEnergia: 'luzDeRecuperacionDeEnergiaDerecho',
    barraEnergia: 'barraEnergiaPersonajeDerecho',
    barraVitalidad: 'barraVitalidadPersonajeDerecho',
    personaje: 'personajeDerecho',
    bordeBarraVitalidad: 'bordeBarraVitalidadDerecho',
    valorVitalidad: 'valorVitalidadPersonajeDerecho',
    valorEnergia: 'valorEnergiaPersonajeDerecho',
    iconoDesmayo: 'iconoDesmayoDerecho',
    sonidoAtaque: 'sonidoAtaqueDerecho',
    energiaConsumida:"energiaConsumidaDerecho",
    vidaConsumida:"vidaConsumidaDerecho"
}

const componentesHtmlIzquierdo = {
    fotoEnergia: 'luzDeRecuperacionDeEnergiaIzquierda',
    barraEnergia: 'barraEnergiaPersonajeIzquierdo',
    barraVitalidad: 'barraVitalidadPersonajeIzquierdo',
    personaje: 'personajeIzquierdo',
    botonAtacarBasico: 'botonIzquierdoAtacarbasico',
    botonAtacarFuerte: 'botonIzquierdoAtacarfuerte',
    botonAtacarMaximo: 'botonIzquierdoAtacarmaximo',
    botonAtacarEspecial: 'botonIzquierdoAtacarespecial',
    botonDefensaBaja: 'defensaBaja',
    botonDefensaMedia: 'defensaMedia',
    botonDefensaAlta: 'defensaAlta',
    botonRecuperarEnergia: 'botonIzquierdoRecuperar',
    bordeBarraVitalidad: 'bordeBarraVitalidadIzquierdo',
    valorVitalidad: 'valorVitalidadPersonajeIzquierdo',
    valorEnergia: 'valorEnergiaPersonajeIzquierdo',
    iconoDesmayo: 'iconoDesmayoIzquierdo',
    sonidoAtaque: 'sonidoAtaqueIzquierdo',
    energiaConsumida:"energiaConsumidaIzquierdo",
    vidaConsumida:"vidaConsumidaIzquierdo"
}
const componentesDefaultDerecho = {
    componentesHtml: { ...componentesHtmlDerecho },
    posicionInicial: 410,
    posicionFinalDeEsquivo: 700,
    estrategiaDefensa: 'Baja'
}
const componentesDefaultIzquierdo = {
    componentesHtml: { ...componentesHtmlIzquierdo },
    posicionInicial: 200,
    posicionFinalDeEsquivo:0,
    estrategiaDefensa: 'Baja'
}

function asignarComponentesDefault(personaje, componentes) {
    _.assign(personaje, { ...componentes })
}
asignarComponentesDefault(personajeDerecho, componentesDefaultDerecho)

ipcRenderer.on('config:pedidoRutaBattleScreen', (event, data) => {
    const personajeIzquierdoDiv = document.getElementById('personajeIzquierdo')
    personajeIzquierdo = require(`${data.ruta}`)
    util.modificarEstadisticasPorEntrenamiento(personajeIzquierdo)
    personajeIzquierdo.inicial = _.cloneDeep(personajeIzquierdo)
    asignarComponentesDefault(personajeIzquierdo, componentesDefaultIzquierdo)
    actualizarValoresBarraVitalidad()
    actualizarValoresBarraEnergia()
    util.colocarFotoMiPokemon(personajeIzquierdoDiv, personajeIzquierdo)
})
ipcRenderer.on('enemigoSeleccionado', (event, data) => {
    personajeDerecho = require(`../../battle elements/Pokemons/Pokemons enemigos/${data.enemigoSeleccionado}`)
    personajeDerecho.inicial = _.cloneDeep(personajeDerecho)
    colocarImagenDePersonajeDerecho(personajeDerecho.nombre)
    asignarComponentesDefault(personajeDerecho, componentesDefaultDerecho)
    actualizarValoresBarraVitalidad()
    actualizarValoresBarraEnergia()
})

function colocarImagenDePersonajeDerecho(nombrePersonaje) {
    const personajeDerechoDiv = document.getElementById('personajeDerecho')
    personajeDerechoDiv.innerHTML += `<img type="image/png" src="../../../assets/images/pokemones enemigos/${nombrePersonaje}.png">`
}

function pedirRutaConfig() {
    ipcRenderer.send('config:pedidoRutaBattleScreen', {})
}

function pedirPokemonEnemigo() {
    ipcRenderer.send('altaDeScreen:battleScreen', {})
}

function funcionesDeInicio() {
    let musicaDeBatalla = document.getElementById("musicaDeBatalla");
    musicaDeBatalla.volume = 1
    musicaDeBatalla.loop = true
    let musicaDeBatallaImg = document.getElementById("musicaDeBatallaImg")
    pedirRutaConfig()
    pedirPokemonEnemigo()
    util.crearBotonCerradoConEstilo(contenedor)
    prenderMusica()
    seleccionarDefensaPersonajeIzquierdo('Baja')
}

function cerrarPantalla() {
    window.close()
}

function prenderSonidoFinDeBatalla(ganoIzquierdo) {
    const sonidoVictoria = document.getElementById('sonidoVictoria')
    const sonidoDerrota = document.getElementById('sonidoDerrota')
    sonidoVictoria.volume = 0.1
    sonidoDerrota.volume = 0.5
    ganoIzquierdo ? sonidoVictoria.play() : sonidoDerrota.play()
}

function apagarMusica() {
    util.apagarMusica(musicaDeBatalla, musicaDeBatallaImg)
}

function prenderMusica() {
    util.prenderMusica(musicaDeBatalla, musicaDeBatallaImg)
}

function cambiarEstadoMusicaDeBatalla() {
    util.cambiarEstadoMusicaDeBatalla(musicaDeBatalla, musicaDeBatallaPrendida, musicaDeBatallaImg)
    musicaDeBatallaPrendida ? musicaDeBatallaPrendida = false : musicaDeBatallaPrendida = true
}

function largoDeBarra(largoInicial, cantidadInicial, cantidadFinal) {
    return util.largoDeBarra(largoInicial, cantidadInicial, cantidadFinal)
}

function largoDeBarraEnergia(personaje) {
    return largoDeBarra(largoInicialDeBarraEnergia, personaje.inicial.energia, personaje.energia)
}

function largoDeBarraVitalidad(personaje) {
    return largoDeBarra(largoInicialDeBarraVitalidad, personaje.inicial.vida, personaje.vitalidad())
}

function efectosDesmayarse(personajeAtacante) {
    var iconoDesmayo = document.getElementById(personajeAtacante.componentesHtml.iconoDesmayo)
    var sonidoDesmayo = document.getElementById("sonidoDesmayo")
    sonidoDesmayo.volume = 0.3
    sonidoDesmayo.play()
    util.aparecerYDesvanecer(iconoDesmayo, 10)
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

function editInnerHtml(elementId, value) {
    document.getElementById(elementId).innerHTML = value
}

function ambosPersonajes(func) {
    func(personajeIzquierdo)
    func(personajeDerecho)
}

function actualizarValorBarraVitalidad(personaje) {
    editInnerHtml(personaje.componentesHtml.valorVitalidad, `${_.round(personaje.vitalidad())} / ${personaje.vida}`)
}

function actualizarValoresBarraVitalidad() {
    ambosPersonajes(actualizarValorBarraVitalidad)
}

function actualizarValorBarraEnergia(personaje) {
    editInnerHtml(personaje.componentesHtml.valorEnergia, `${_.round(personaje.energia)} / ${personaje.inicial.energia}`)
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
    document.getElementById(personaje.componentesHtml.botonAtacarBasico).disabled = estado
    document.getElementById(personaje.componentesHtml.botonAtacarFuerte).disabled = estado
    document.getElementById(personaje.componentesHtml.botonAtacarMaximo).disabled = estado
    document.getElementById(personaje.componentesHtml.botonAtacarEspecial).disabled = estado
    document.getElementById(personaje.componentesHtml.botonRecuperarEnergia).disabled = estado
    document.getElementById(personaje.componentesHtml.botonDefensaBaja).disabled = estado
    document.getElementById(personaje.componentesHtml.botonDefensaMedia).disabled = estado
    document.getElementById(personaje.componentesHtml.botonDefensaAlta).disabled = estado

}

function armarCartelVictoria(cartelFinDeBatalla) {
    cartelFinDeBatalla.style.backgroundImage = 'url("../../../assets/images/carta pokemon verde.png")';
    cartelFinDeBatalla.innerHTML += `
                <div id="ribbonDiv">
                    <img src="../../../assets/images/ribon victoria.png">
                </div>
                <div id="imagenPokemonCartelFinDeBatalla">
                    <div id="imagenPokemonCentralDiv">
                        <img id="imagenSquartleAnteojos" src="../../../assets/images/victoria batalla squartle.png">
                    </div>
                </div>`
}
function armarCartelDerrota(cartelFinDeBatalla) {
    cartelFinDeBatalla.style.backgroundImage = 'url("../../../assets/images/carta pokemon rojo.png")'
    cartelFinDeBatalla.innerHTML += `
                <div id="ribbonDiv">
                    <img src="../../../assets/images/ribon derrota.png">
                </div>
                <div id="imagenPokemonCartelFinDeBatalla">
                    <div id="imagenPokemonCentralDiv">
                        <img id="imagenPokemonDesmayado" src="../../../assets/images/pokemon desmayado.png">
                    </div>
                </div>`
}

function agregarBotonesCartelFinDeBatalla() {
    cartelFinDeBatalla.innerHTML += `
                <div id="botonerCartelFinDeBatallaDiv" class="botonesCartelFinDeBatalla">
                    <button id="botonRestart" onclick="restart()">
                        RESTART!
                    </button>
                    <button id="botonNuevoEnemigo" onclick="irHaciaSelector()">
                        NUEVO ENEMIGO
                    </button>
                </div>`
}

function restart() {
    ipcRenderer.send('reloadScreen:battleScreen', {})
}

function irHaciaSelector() {
    ipcRenderer.send('motrarSelectorDeEnemigos', {})
    window.close()
}

function cambioCartelGanador(ganoIzquierdo) {
    let cartelFinDeBatalla = document.getElementById('cartelFinDeBatalla')
    const cartelDesafio = document.getElementById('cartelDesafio')

    cartelDesafio.style.opacity = 0;
    ganoIzquierdo ? armarCartelVictoria(cartelFinDeBatalla) : armarCartelDerrota(cartelFinDeBatalla);
    agregarBotonesCartelFinDeBatalla(cartelFinDeBatalla)
    cartelFinDeBatalla.style.opacity = 1
}

function recuperarEnergia(personajeRecuperado, otroPersonaje) {
    const fotoEnergia = document.getElementById(personajeRecuperado.componentesHtml.fotoEnergia);
    const barraEnergiaPersonaje = document.getElementById(personajeRecuperado.componentesHtml.barraEnergia);
    const sonidoRecuperarEnergia = document.getElementById('sonidoRecuperarEnergia')
    const energiaLimite = personajeRecuperado.inicial.energia;

    sonidoRecuperarEnergia.play()
    personajeRecuperado.recuperarEnergia(energiaLimite)
    util.aparecerYDesvanecer(fotoEnergia, 5);
    actualizarValoresBarraEnergia()
    actualizarLargosBarrasDeEnergia()
    darTurnoAOponente(personajeRecuperado)
}

function efectosAtacar(personajeAtacado, personajeAtacanteImg, sonidoAtaque, personajeAtacante) {
    sonidoAtaque.volume = 0.1
    sonidoAtaque.play() //definir una logica para que cambie si es el último ataque. Ver que es lo que quedaría bien
    //personajeAtacante.esAtaqueMortal(personajeAtacado,'fuerte') ? '' : sonidoAtaque.play() 
    desplazarse(personajeAtacado.posicionInicial, personajeAtacanteImg)
}

function darTurnoAOponente(personajeEnTurno) {
    if (personajeEnTurno == personajeIzquierdo) {
        editarDeshabilitacionDeBotones(personajeIzquierdo, true)
        setTimeout(ejecutarEstrategiaDeBot, 1000)
    } else {
        editarDeshabilitacionDeBotones(personajeIzquierdo, false)
    }
}

function cambioInformacionPokemonDerrotados(pokemonDerrotado) {
    juezDeBatalla.guardarPokemonDerrotado(pokemonDerrotado.nombre)
    notificarPokemonDerrotadoParaMarcarEnSelector(pokemonDerrotado.nombre)
}
function editarDefensaViablePersonajeAtacado(personajeAtacado){
    const _energiaSuficiente = (consumo,personaje) =>  consumo <= _.get(personajeAtacado,'energia')
    const _energiaSuficienteParaDefensaElegida = ({defensaSeleccionada,energia}) => {
        return _.get(config.energiaPorDefensa,personajeAtacado.estrategiaDefensa) <= energia
    }

    const estrategiasAlternativas = _.filter(_.toPairs(config.energiaPorDefensa), ([tipo,consumo]) => {
        return _energiaSuficiente(consumo,personajeAtacado) && tipo !== personajeAtacado.estrategiaDefensa
    })
    if(!_energiaSuficienteParaDefensaElegida(personajeAtacado)){
        const estrategiaAlternativa = _.head(_.maxBy(estrategiasAlternativas, ([tipo,consumo]) => consumo))
        personajeAtacado.estrategiaDefensa = estrategiaAlternativa
        seleccionarDefensa(estrategiaAlternativa,personajeAtacado)
    }
}
function editarEstadisticasPorDefensaElegida(personajeAtacado){
    editarDefensaViablePersonajeAtacado(personajeAtacado)
	personajeAtacado.defensa += config.defensaAdicionalPorEstrategia(personajeAtacado.estrategiaDefensa)
	personajeAtacado.energia -= config.consumoEnergiaPorDefensa(personajeAtacado.estrategiaDefensa)
}
function restaurarEstadisticasPorDefensaElegida(personajeAtacado){
	personajeAtacado.defensa -= config.defensaAdicionalPorEstrategia(personajeAtacado.estrategiaDefensa)
}
function atacar(personajeAtacado, personajeAtacante, tipoDeAtaque,personajeAtacanteImg) {
    const sonidoAtaque = document.getElementById(personajeAtacante.componentesHtml.sonidoAtaque)
    editarEstadisticasPorDefensaElegida(personajeAtacado)
    if(tipoDeAtaque == 'especial'){
        const tipoDeAtaqueGenerico = new TipoDePokemon() // hay que colocar la info para instanciarlo
        tipoDeAtaqueGenerico.atacarEspecial(personajeAtacado,personajeAtacante) 
    }else{
        personajeAtacante.atacar(personajeAtacado, tipoDeAtaque);
    }
    restaurarEstadisticasPorDefensaElegida(personajeAtacado)
    efectosAtacar(personajeAtacado, personajeAtacanteImg, sonidoAtaque, personajeAtacante)
}

function verificarSiHayGanador(personajeAtacado, personajeAtacante) {
    const ganador = juezDeBatalla.definirGanador(personajeAtacante, personajeAtacado)
    if (ganador) {
        const ganoIzquierdo = ganador.nombre == personajeIzquierdo.nombre
        cambioCartelGanador(ganoIzquierdo);
        editarDeshabilitacionDeBotones(personajeIzquierdo, true)
        prenderSonidoFinDeBatalla(ganoIzquierdo)
        apagarMusica()
        ganoIzquierdo ? cambioInformacionPokemonDerrotados(personajeDerecho) : ''
        return
    }
    darTurnoAOponente(personajeAtacante)
}

function notificarPokemonDerrotadoParaMarcarEnSelector(nombrePokemonDerrotado) {
    ipcRenderer.send('renderizarBotonesEnemigos', { nombrePokemonDerrotado })
}

function ejecutarEstrategiaDeBot() {
    switch (personajeDerecho.estrategia) {
        case "bajaEstrategia":
            ejecutarEstrategiaBaja()
            break;
    }
}
function efectosEsquivarAtaque(personajeAtacado,personajeAtacanteImg,personajeAtacadoImg){
    desplazarse(personajeAtacado.posicionInicial, personajeAtacanteImg);
    desplazarse(personajeAtacado.posicionFinalDeEsquivo, personajeAtacadoImg);
    sonidoEsquivo.play()
}
function redondearDeteriorosRecibidos(personajeAtacado,personajeAtacante){
	personajeAtacado.deterioroRecibido = Math.round(personajeAtacado.deterioroRecibido);
	personajeAtacante.deterioroRecibido = Math.round(personajeAtacante.deterioroRecibido)
}
function desencadenarAccionesAlAtacar(personajeAtacado, personajeAtacante, tipoDeAtaque) {
    var personajeAtacanteImg = document.getElementById(personajeAtacante.componentesHtml.personaje);
    var personajeAtacadoImg = document.getElementById(personajeAtacado.componentesHtml.personaje);
    const vitalidadInicial = personajeAtacado.vitalidad() ;
    const energiaInicialPersonajeAtacante = personajeAtacante.energia;
    const _actualizarYcerrar = personajeAtacante => {
        darTurnoAOponente(personajeAtacante)
        actualizarElementosDeBatalla();
    }

    if (!juezDeBatalla.energiaSuficiente(personajeAtacante, tipoDeAtaque)) {
        const energiaLimite = personajeAtacante.inicial.energia;
        personajeAtacante.desmayarse(energiaLimite)
        efectosDesmayarse(personajeAtacante)
        return _actualizarYcerrar(personajeAtacante)
    } else if(juezDeBatalla.ataqueEsquivado(personajeAtacado)){
        efectosEsquivarAtaque(personajeAtacado,personajeAtacanteImg,personajeAtacadoImg)
        personajeAtacante.disminuirEnergia(tipoDeAtaque)
        return _actualizarYcerrar(personajeAtacante)
    }
    atacar(personajeAtacado, personajeAtacante, tipoDeAtaque,personajeAtacanteImg);
    redondearDeteriorosRecibidos(personajeAtacado, personajeAtacante);
    mostrarDeterioroRecibido(personajeAtacado,vitalidadInicial)
    actualizarElementosDeBatalla();
    verificarSiHayGanador(personajeAtacado, personajeAtacante);
}
function mostrarDeterioroRecibido(personajeAtacado,vitalidadInicial){
	const vitalidadFinal = personajeAtacado.vitalidad()
	mostrarCambioDeAtributos(personajeAtacado,vitalidadInicial,vitalidadFinal,"vidaConsumida")
}
function mostrarCambioDeAtributos(personajeAtacado,valorInicial,valorFinal,componente){
	const nombreComponente = _.get(personajeAtacado.componentesHtml,componente)
	const componenteHtml = document.getElementById(nombreComponente)
    componenteHtml.innerHTML =  _.round(valorFinal - valorInicial)
	util.aparecerYDesvanecer(componenteHtml,10)	
}
function atacarAlDerecho(tipoDeAtaque) {
    desencadenarAccionesAlAtacar(personajeDerecho, personajeIzquierdo, tipoDeAtaque)
}

function atacarAlIzquierdo(tipoDeAtaque) {
    desencadenarAccionesAlAtacar(personajeIzquierdo, personajeDerecho, tipoDeAtaque)
}

function recuperarEnergiaIzquierdo() {
    recuperarEnergia(personajeIzquierdo, personajeDerecho)
}

function recuperarEnergiaDerecho() {
    recuperarEnergia(personajeDerecho, personajeIzquierdo)
}

function ejecutarEstrategiaBaja() {
    desencadenarAccionesAlAtacar(personajeIzquierdo, personajeDerecho, 'basico')
}
function seleccionarDefensa(tipoDeDefensa,personaje){
    const tipoDeDefensas = ['Baja','Media','Alta']
    const defensaSeleccionada = _.filter(tipoDeDefensas, defensa => defensa == tipoDeDefensa)
    const defensasNoSeleccionadas = _.filter(tipoDeDefensas, defensa => defensa !== tipoDeDefensa)
    
    personaje.estrategiaDefensa = tipoDeDefensa;
    _.forEach(defensaSeleccionada, defensa => {
        document.getElementById(`defensa${defensa}`).style.opacity = 1
    })
    _.forEach(defensasNoSeleccionadas, defensa => {
        document.getElementById(`defensa${defensa}`).style.opacity = 0.3
    })

}
function seleccionarDefensaPersonajeIzquierdo(tipoDeDefensa){
	seleccionarDefensa(tipoDeDefensa,personajeIzquierdo)
}