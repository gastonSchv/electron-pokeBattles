const {app,BrowserWindow,Menu,ipcMain} = require('electron');
const url = require('url')
const path = require('path')
const _ = require('lodash')
const reload = require('electron-reload')

if (process.env.NODE_ENV !== 'production') {
    reload(__dirname, {
        electron: path.join(__dirname, '../node-modules', '.bin', 'electron')
    })
}


app.on('ready',() => {
  
  mainScreen = new BrowserWindow({
    show:false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainScreen.loadURL(url.format({
    pathname:path.join(__dirname,'views','index.html'),
    protocol:'file',
    slashes:true
  }))
  mainScreen.maximize()
  mainScreen.show()
  ipcMain.on('buttonClick:restart',(event,data) => {
    mainScreen.reload()
  })
  ipcMain.on('event:ganadorDeBatalla',(event,data) => {
    console.log(data)
  })
})

