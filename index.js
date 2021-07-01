const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url')
const path = require('path')
const _ = require('lodash')
const reload = require('electron-reload')

let battleScreen = {}
let juezDeBatallaScreen = {}
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

function ifUpSendConfigRuta(browserWindows,data) {
    _.forEach(browserWindows, browserWindow => {
        if (!_.isEmpty(browserWindow)) {
            browserWindow.webContents.send('config:ruta', data)
        }
    })
}

function newScreen(browserWindowSettings, pathname) {
    const screen = new BrowserWindow({
        ...browserWindowSettings,
        ...defaultBrowserWindowSetting
    })
    screen.loadURL(url.format({
        pathname,
        protocol: 'file'
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

    landingScreen = newScreen({}, pathFromViewsDir('landingScreen/index.html'))
    landingScreen.maximize()
    landingScreen.once('ready-to-show', () => { landingScreen.show() })

    configurationScreen = newScreen({
            show: false,
            width: 600,
            height: 370,
            frame: false
        },
        pathFromViewsDir('configurationScreen/index.html')
    )
    ipcMain.on('buttonClick:restart', (event, data) => {
        battleScreen.reload()
    })
    ipcMain.on('config:ruta', (event, data) => {
        ifUpSendConfigRuta([battleScreen, juezDeBatallaScreen],data)
    })
    ipcMain.on('screens:battleScreen', (event, data) => {
        newBattleScreen()
        battleScreen.maximize()
        battleScreen.show()
    })
    ipcMain.on('config:pedidoRutaBattleScreen', (event, data) => {
        configurationScreen.webContents.send('config:ruta', data)
    })
    ipcMain.on('config:pedidoRutaJuezDeBatallaScreen', (event, data) => {
        configurationScreen.webContents.send('config:ruta', data)
    })
    ipcMain.on('screens:configurationScreen', (event, data) => {
        configurationScreen.show()
    })
    ipcMain.on('screens:juezDeBatallaScreen', (event, data) => {
        juezDeBatallaScreen = newScreen({ frame: false }, pathFromViewsDir('juezDeBatallaScreen/index.html'))
        juezDeBatallaScreen.setPosition(250, 60)
    })
    ipcMain.on('screens:configurationScreenHide', (event, data) => {
        configurationScreen.hide()
    })
    ipcMain.on('altaDeScreen:configuracion', (event, data) => {
        landingScreen.webContents.send('altaDeScreen:configuracion', {})
    })
    landingScreen.on('close', (event, data) => {
        app.quit()
    })
})