const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url')
const path = require('path')
const _ = require('lodash')
const reload = require('electron-reload')

let battleScreen = {}
const webPreferences = {
    nodeIntegration: true,
    contextIsolation: false
}
const defaultBrowserWindowSetting = {
	webPreferences,
	icon: 'C:/Users/Producteca/Desktop/Gaston/Programming learning/Electron/electron-pokeBattles/assets/icons/win/Bolbasaur.ico'
}
function pathFromViewsDir(pathName){
    return path.join(__dirname, 'views',pathName)
}
if (process.env.NODE_ENV !== 'production') {
    reload(__dirname, {
        electron: path.join(__dirname, '../node-modules', '.bin', 'electron')
    })
}

function newScreen(browserWindowSettings,pathname){
    const screen = new BrowserWindow({
        ...browserWindowSettings,
        ...defaultBrowserWindowSetting
    })
    screen.loadURL(url.format({
        pathname,
        protocol:'file'
    }))
    return screen
}
function newBattleScreen() {
    battleScreen = new BrowserWindow({
        show: false,
        ...defaultBrowserWindowSetting
    })
    battleScreen.loadURL(url.format({
        pathname: pathFromViewsDir('battleScreen/index.html'),
        protocol: 'file'
    }))
}
app.on('ready', () => {

    landingScreen = newScreen({},pathFromViewsDir('landingScreen/index.html'))
    landingScreen.maximize()
    landingScreen.once('ready-to-show', () => { landingScreen.show() })

    configurationScreen = newScreen({
        show: false,
         width: 600,
         height: 370,
         frame: false},
         pathFromViewsDir('configurationScreen/index.html')
    )
    ipcMain.on('buttonClick:restart', (event, data) => {
        console.log('se apreto restart')
        battleScreen.reload()
    })
    ipcMain.on('config:ruta', (event, data) => {
        console.log('llego ruta a main', data)
        battleScreen.webContents.send('config:ruta', data)
    })
    ipcMain.on('screens:battleScreen', (event, data) => {
        newBattleScreen()
        battleScreen.maximize()
        battleScreen.show()
    })
    ipcMain.on('config:pedidoRuta',(event,data) => {
        configurationScreen.webContents.send('config:ruta', data)
    })
    ipcMain.on('screens:configurationScreen', (event, data) => {
        configurationScreen.show()
    })
    ipcMain.on('screens:juezDeBatallaScreen',(event,data) => {
        console.log('llego juezDeBatallaScreen')
        juezDeBatallaScreen = newScreen({frame: false},pathFromViewsDir('juezDeBatallaScreen/index.html'))
        juezDeBatallaScreen.setPosition(250,60)
    })
    ipcMain.on('screens:configurationScreenHide', (event, data) => {
        console.log('deberia ocultar configurationScreen')
        configurationScreen.hide()
    })
    ipcMain.on('altaDeScreen:configuracion',(event,data) => {
        landingScreen.webContents.send('altaDeScreen:configuracion',{})
    })
    landingScreen.on('close', (event,data) => {
        app.quit()
    })
})