const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url')
const path = require('path')
const _ = require('lodash')
const reload = require('electron-reload')

const webPreferences = {
    nodeIntegration: true,
    contextIsolation: false
}

if (process.env.NODE_ENV !== 'production') {
    reload(__dirname, {
        electron: path.join(__dirname, '../node-modules', '.bin', 'electron')
    })
}

app.on('ready', () => {

    landingScreen = new BrowserWindow({
      webPreferences
    })
    landingScreen.loadURL(url.format({
      pathname: path.join(__dirname,'views','landingScreen/index.html'),
      protocol:'file',
      slashes:true
    }))
    landingScreen.maximize()
    landingScreen.once('ready-to-show', () => { landingScreen.show() })
    ipcMain.on('screens:battleScreen', (event, data) => {
        battleScreen = new BrowserWindow({
            show: false,
            webPreferences
        })
        battleScreen.loadURL(url.format({
            pathname: path.join(__dirname, 'views', 'battleScreen/index.html'),
            protocol: 'file',
            slashes: true
        }))
        battleScreen.maximize()
        battleScreen.once('ready-to-show', () => { battleScreen.show() })
        ipcMain.on('buttonClick:restart', (event, data) => {
            battleScreen.reload()
        })
    })
    ipcMain.on('screens:configurationScreen',(event,data) => {
        configurationScreen = new BrowserWindow({
            webPreferences,
            width:400,
            height:247,
            frame:false      
        })
        configurationScreen.loadURL(url.format({
            pathname:path.join(__dirname,'views','configurationScreen/index.html'),
            protocol:'file',
            slashes:true
        }))
    })

})