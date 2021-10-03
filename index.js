const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url')
const path = require('path')
const _ = require('lodash')
const reload = require('electron-reload')
const Store = require('electron-store')
const store = new Store()

let enemigoSeleccionado = '';
let entrenamientosRealizados = [];

let ruta = store.get('ruta')

const webPreferences = {
    nodeIntegration: true,
    contextIsolation: false
}
const defaultBrowserWindowSetting = {
    webPreferences,
    icon: 'C:/Users/Producteca/Desktop/Gaston/Programming learning/Electron/electron-pokeBattles/assets/icons/win/Bolbasaur.ico'
}

function pathFromViewsDir(pathName) {
    return path.join(__dirname, 'views', pathName)
}
if (process.env.NODE_ENV !== 'production') {
    reload(__dirname, {
        electron: path.join(__dirname, '../node-modules', '.bin', 'electron')
    })
}

function newScreen(browserWindowSettings, pathName) {
    const screen = new BrowserWindow({
        ...browserWindowSettings,
        ...defaultBrowserWindowSetting,
    })
    screen.loadURL(url.format({
        pathname: pathFromViewsDir(pathName),
        protocol: 'file'
    }))
    return screen
}

function modalScreen(browserWindowSettings, pathName,parent = landingScreen) {
    return newScreen({
            width: 820,
            height: 580,
            ...browserWindowSettings,
            parent,
            modal: true
        },
        pathName)
}

function newBattleScreen() {
    battleScreen = new BrowserWindow({
        show: false,
        frame: false,
        ...defaultBrowserWindowSetting
    })
    battleScreen.loadURL(url.format({
        pathname: pathFromViewsDir('battleScreen/index.html'),
        protocol: 'file'
    }))
}

function configurationScreen() {
    configurationScreen = modalScreen({
            show: false,
            width: 600,
            height: 370,
            frame: false
        },
        'configurationScreen/index.html'
    )
}
function setModalScreenPosition(modalScreen){
    modalScreen.setPosition(410,70)
}
app.on('ready', () => {

    landingScreen = newScreen({ frame: false }, 'landingScreen/index.html')
    landingScreen.maximize()
    landingScreen.once('ready-to-show', () => { landingScreen.show() })

    configurationScreen()

    ipcMain.on('altaDeScreen:landingScreen', (event, data) => {        
        landingScreen.webContents.send('altaDeScreen:landingScreen', {ruta})
    })

    ipcMain.on('buttonClick:restart', (event, data) => {
        battleScreen.reload()
    })
    ipcMain.on('screens:battleScreen', (event, data) => {
        enemigoSeleccionado = data.enemigoSeleccionado
        newBattleScreen()
        battleScreen.maximize()
        battleScreen.show()
    })
    ipcMain.on('altaDeScreen:battleScreen', (event, data) => {
        battleScreen.webContents.send('enemigoSeleccionado', { enemigoSeleccionado })
    })
    ipcMain.on('config:pedidoRutaBattleScreen', (event, data) => {
        battleScreen.webContents.send('config:pedidoRutaBattleScreen', { ruta })
    })
    ipcMain.on('config:pedidoRutaJuezDeBatallaScreen', (event, data) => {
        juezDeBatallaScreen.webContents.send('config:pedidoRutaJuezDeBatallaScreen', { ruta })
    })
    ipcMain.on('screens:selectorDeEnemigoScreen', (event, data) => {
        selectorDeEnemigoScreen = modalScreen({ frame: false }, 'selectorDeEnemigoScreen/index.html')
        setModalScreenPosition(selectorDeEnemigoScreen)
    })
    ipcMain.on('screens:configurationScreen', (event, data) => {
        configurationScreen.show()
        setModalScreenPosition(configurationScreen)
    })
    ipcMain.on('screens:juezDeBatallaScreen', (event, data) => {
        juezDeBatallaScreen = modalScreen({ frame: false }, 'juezDeBatallaScreen/index.html')
        setModalScreenPosition(juezDeBatallaScreen)
    })
    ipcMain.on('screens:miPokemonScreen', (event, data) => {
        miPokemonScreen = modalScreen({ frame: false }, 'miPokemonScreen/index.html')
        setModalScreenPosition(miPokemonScreen)
    })
    ipcMain.on('screens:configurationScreenHide', (event, data) => {
        configurationScreen.hide()
    })
    ipcMain.on('screens:centroDeEntrenamientoScreen', (event, data) => {
        centroDeEntrenamientoScreen = modalScreen({ frame: false }, 'centroDeEntrenamientoScreen/index.html')
        setModalScreenPosition(centroDeEntrenamientoScreen)
    })
    ipcMain.on('altaDeScreen:configuracion', (event, data) => {
        
        if(data.ruta){
            store.set('ruta', data.ruta)
            ruta = data.ruta
        }

        configurationScreen.webContents.send('altaDeScreen:configuracion', { ruta})
        landingScreen.webContents.send('altaDeScreen:configuracion',{ruta})
        juezDeBatallaScreen = modalScreen({ show: false, frame: false,width:200 }, 'juezDeBatallaScreen/index.html')
        setModalScreenPosition(juezDeBatallaScreen)
    })
    ipcMain.on('config:pedidoRutaMiPokemon', (event, data) => {
        miPokemonScreen.webContents.send('config:pedidoRutaMiPokemon', { ruta })
    })
    ipcMain.on('bloqueoBotonesDeJuego:juezDeBatalla', (event, data) => {
        landingScreen.webContents.send('bloqueoBotonesDeJuego', data)
    })
    ipcMain.on('config:pedidoRutaCentroDeEntrenamiento', (event, data) => {
        centroDeEntrenamientoScreen.webContents.send('config:pedidoRutaCentroDeEntrenamiento', { ruta })
    })
    ipcMain.on('rutaValida',(event,data) => {
        if(ruta){
            landingScreen.webContents.send('rutaValida',{})
        }
    })
    ipcMain.on('pedidoPokemonesDerrotados',(event,data) => {
        setTimeout(() => selectorDeEnemigoScreen.webContents.send('pokemonesDerrotados',{pokemonesDerrotados:store.get('pokemonesDerrotados') || [] }),30)
    })
    ipcMain.on('avisoPokemonDerrotado',(event,data) => {
        const {nombrePokemonDerrotado} = data
    	selectorDeEnemigoScreen.webContents.send('avisoPokemonDerrotado',{nombrePokemonDerrotado})
    })
    ipcMain.on('detalleDeError',(event,data) => {
        const parentScreen = juezDeBatallaScreen? juezDeBatallaScreen : centroDeEntrenamientoScreen; 
        const detalleDeErrorScreen = modalScreen({height:500,width:600,frame:false},'detalleDeErrorScreen/index.html',parentScreen);
        detalleDeErrorScreen.setPosition(500,140)
        setTimeout(() => detalleDeErrorScreen.webContents.send('detalleDeError',data),500)
    })
    ipcMain.on('motrarSelectorDeEnemigos',(event,data) => {
        landingScreen.show()
    })
    landingScreen.on('close', (event, data) => {
        app.quit()
    })

})