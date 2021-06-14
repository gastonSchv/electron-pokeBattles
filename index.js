const {app,BrowserWindow,Menu,ipcMain} = require('electron');
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


app.on('ready',() => {
  
  mainScreen = new BrowserWindow({
    show:false,
    webPreferences
  })
  mainScreen.loadURL(url.format({
    pathname:path.join(__dirname,'views','mainScreen/index.html'),
    protocol:'file',
    slashes:true
  }))
  mainScreen.maximize()
  mainScreen.once('ready-to-show',() => {mainScreen.show()})
  ipcMain.on('buttonClick:restart',(event,data) => {
    mainScreen.reload()
  })
  ipcMain.on('event:ganadorDeBatalla',(event,data) => {
      const winnerScreen =  new BrowserWindow({
          webPreferences,
          title:'   Ganador de la batalla',
          width:400,
          height: 247,
          autoHideMenuBar:true,
          maximizable:false,
          minimizable:false
      })
      winnerScreen.loadURL(url.format({
        pathname:path.join(__dirname,'views','winnerScreen/index.html'),
        protocol:'file',
        slashes:true
      }))  
  })
})

