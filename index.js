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

if (process.env.NODE_ENV !== 'production') {
    reload(__dirname, {
        electron: path.join(__dirname, '../node-modules', '.bin', 'electron')
    })
}

function newBattleScreen() {
    battleScreen = new BrowserWindow({
        show: false,
        ...defaultBrowserWindowSetting
    })
    battleScreen.loadURL(url.format({
        pathname: path.join(__dirname, 'views', 'battleScreen/index.html'),
        protocol: 'file',
        slashes: true
    }))
}
app.on('ready', () => {

    landingScreen = new BrowserWindow({
        ...defaultBrowserWindowSetting
    })
    landingScreen.loadURL(url.format({
        pathname: path.join(__dirname, 'views', 'landingScreen/index.html'),
        protocol: 'file',
        slashes: true
    }))
    landingScreen.maximize()
    landingScreen.once('ready-to-show', () => { landingScreen.show() })

    configurationScreen = new BrowserWindow({
        show: false,
        width: 600,
        height: 370,
        frame: false,
        ...defaultBrowserWindowSetting
    })
    newBattleScreen()
    configurationScreen.loadURL(url.format({
        pathname: path.join(__dirname, 'views', 'configurationScreen/index.html'),
        protocol: 'file',
        slashes: true
    }))
    ipcMain.on('buttonClick:restart', (event, data) => {
        console.log('se apreto restart')
        battleScreen.reload()
        battleScreen.once('ready-to-show', () => {
            configurationScreen.webContents.send('config:ruta', data)
        })
    })
    ipcMain.on('config:ruta', (event, data) => {
        console.log('llego ruta', data)
        battleScreen.webContents.send('config:ruta', data)
    })
    ipcMain.on('screens:battleScreen', (event, data) => {
        newBattleScreen()
        battleScreen.maximize()
        battleScreen.show()
        configurationScreen.webContents.send('config:ruta', data)
    })
    ipcMain.on('screens:configurationScreen', (event, data) => {
        configurationScreen.show()
    })
    ipcMain.on('screens:configurationScreenHide', (event, data) => {
        console.log('deberia ocultar configurationScreen')
        configurationScreen.hide()
    })
    landingScreen.on('close', (event,data) => {
        app.quit()
    })
})
