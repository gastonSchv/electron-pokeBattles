const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url')
const path = require('path')
const _ = require('lodash')
const reload = require('electron-reload')

let enemigoSeleccionado = '';
let ruta = ''

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
        pathname:pathFromViewsDir(pathName),
        protocol: 'file'
    }))
    return screen
}
function modalScreen(browserWindowSettings,pathName){
	return newScreen({
        width:820,
        height:580,
        ...browserWindowSettings,
        parent: landingScreen,
        modal: true},
        pathName)
}
function newBattleScreen() {
    battleScreen = new BrowserWindow({
        show: false,
        frame:false,
        ...defaultBrowserWindowSetting
    })
    battleScreen.loadURL(url.format({
        pathname: pathFromViewsDir('battleScreen/index.html'),
        protocol: 'file'
    }))
}
function configurationScreen(){
    configurationScreen = modalScreen({
            show: false,
            width: 600,
            height: 370,
            frame: false
        },
        'configurationScreen/index.html'
    )
}
app.on('ready', () => {

    landingScreen = newScreen({frame:false}, 'landingScreen/index.html')
    landingScreen.maximize()
    landingScreen.once('ready-to-show', () => { landingScreen.show() })

    configurationScreen()
    ipcMain.on('buttonClick:restart', (event, data) => {
        battleScreen.reload()
    })
    ipcMain.on('screens:battleScreen', (event, data) => {
        enemigoSeleccionado = data.enemigoSeleccionado
        newBattleScreen()
        battleScreen.maximize()
        battleScreen.show()
    })
    ipcMain.on('altaDeScreen:battleScreen',(event,data) => {
        battleScreen.webContents.send('enemigoSeleccionado',{enemigoSeleccionado})
    })
    ipcMain.on('config:pedidoRutaBattleScreen', (event, data) => {
        battleScreen.webContents.send('config:pedidoRutaBattleScreen',{ruta})
    })
    ipcMain.on('config:pedidoRutaJuezDeBatallaScreen', (event, data) => {
         juezDeBatallaScreen.webContents.send('config:pedidoRutaJuezDeBatallaScreen',{ruta})
    })
    ipcMain.on('screens:selectorDeEnemigoScreen',(event,data) => {
        selectorDeEnemigoScreen = modalScreen({frame:false},'selectorDeEnemigoScreen/index.html')
        selectorDeEnemigoScreen.setPosition(410, 78)
    })
    ipcMain.on('screens:configurationScreen', (event, data) => {
        configurationScreen.show()
        configurationScreen.setPosition(410, 78)
    })
    ipcMain.on('screens:juezDeBatallaScreen', (event, data) => {
        juezDeBatallaScreen = modalScreen({ frame: false }, 'juezDeBatallaScreen/index.html')
        juezDeBatallaScreen.setPosition(410, 78)
    })
    ipcMain.on('screens:miPokemonScreen',(event,data) => {
        miPokemonScreen = modalScreen({frame:false},'miPokemonScreen/index.html')
        miPokemonScreen.setPosition(410, 78)      
    })
    ipcMain.on('screens:configurationScreenHide', (event, data) => {
        configurationScreen.hide()
    })
    ipcMain.on('screens:centroDeEntrenamientoScreen',(event,data) =>{
        centroDeEntrenamientoScreen = modalScreen({frame:false},'centroDeEntrenamientoScreen/index.html')
        centroDeEntrenamientoScreen.setPosition(410, 78)
    })
    ipcMain.on('altaDeScreen:configuracion', (event, data) => {
        ruta = data.ruta
        landingScreen.webContents.send('altaDeScreen:configuracion', data)
        juezDeBatallaScreen = modalScreen({ show: false,frame: false }, 'juezDeBatallaScreen/index.html')
        juezDeBatallaScreen.setPosition(410, 78)
    })
    ipcMain.on('altaDeScreen:configuracionPrimeraApertura',(event,data) => {
    	landingScreen.webContents.send('altaDeScreen:configuracionPrimeraApertura',{})
    })
    ipcMain.on('config:pedidoRutaMiPokemon',(event,data) => {
        miPokemonScreen.webContents.send('config:pedidoRutaMiPokemon',{ruta})
    })
    ipcMain.on('bloqueoBotonesDeJuego:juezDeBatalla',(event,data) => {
        landingScreen.webContents.send('bloqueoBotonesDeJuego',data)
    })
    landingScreen.on('close', (event, data) => {
        app.quit()
    })
})