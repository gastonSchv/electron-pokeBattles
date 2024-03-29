const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron');
const url = require('url')
const path = require('path')
const _ = require('lodash')
const reload = require('electron-reload')
const Store = require('electron-store')
const store = new Store()
const util = require('./views/utils/util')
const { autoUpdater, AppUpdater } = require('electron-updater')


//autoUpdater.autoDownload = false;
//autoUpdater.autoInstallOnAppQuit = true;
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

function viewsFolderName() {
    return util.obtenerNombresDeArchivos(path.join(__dirname, 'views'))
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

function modalScreen(browserWindowSettings, pathName, parent = landingScreen) {
    
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

function setModalScreenPosition(modalScreen) {
    modalScreen.setPosition(440, 70)
}

function _getView(url) {
    return _.find(viewsFolderName(), folderName => {
        return _.includes(url, folderName)
    })
}

function getParentScreen(screenName) {
    if (screenName == 'centroDeEntrenamientoScreen') {
        return centroDeEntrenamientoScreen
    } else if (screenName == 'juezDeBatallaScreen') {
        return juezDeBatallaScreen
    }
    return landingScreen
}

app.on('ready', () => {
    autoUpdater.checkForUpdates()
    landingScreen = newScreen({ frame: false, width: 1280, height: 680 }, 'landingScreen/index.html')
    landingScreen.once('ready-to-show', () => { landingScreen.show() })
    configurationScreen()

    ipcMain.on('altaDeScreen:landingScreen', (event, data) => {
        landingScreen.webContents.send('altaDeScreen:landingScreen', { ruta })
    })

    ipcMain.on('reloadScreen:battleScreen', (event, data) => {
        battleScreen.reload()
    })
    ipcMain.on('reloadScreen:juezDeBatallaScreen', (event, data) => {
        juezDeBatallaScreen.reload()
    })
    ipcMain.on("errorAlCrearVentanaJuezDeBatalla", (event, data) => {
        juezDeBatallaScreen.close()
        landingScreen.webContents.send("altaDeScreen:landingScreen", { err: data.err, isError: true })
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

        if (data.ruta) {
            store.set('ruta', data.ruta)
            ruta = data.ruta
        }

        configurationScreen.webContents.send('altaDeScreen:configuracion', { ruta })
        landingScreen.webContents.send('altaDeScreen:configuracion', { ruta })
        juezDeBatallaScreen = modalScreen({ show: false, frame: false, width: 200 }, 'juezDeBatallaScreen/index.html')
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
    ipcMain.on('rutaValida', (event, data) => {
        if (ruta) {
            landingScreen.webContents.send('rutaValida', {})
        }
    })
    ipcMain.on('renderizarBotonesEnemigos', (event, data) => {
        setTimeout(() => selectorDeEnemigoScreen.webContents.send('renderizarBotonesEnemigos', { pokemonesDerrotados: store.get('pokemonesDerrotados') || [] }), 30)
    })
    ipcMain.on('detalleDeError', (event, data) => {
        console.log(data.parentFolder) // necesito saber quien mandó el evento para definir la url de la view
        const parentScreenName = _getView(data.parentFolder)
        const parentScreen = getParentScreen(parentScreenName)
        const detalleDeErrorScreen = modalScreen({ height: 500, width: 600, frame: false }, 'detalleDeErrorScreen/index.html', parentScreen);
        const verticalPosition = parentScreenName == 'landingScreen' ? 440 : 550
        const horizontalPosition = parentScreenName == 'landingScreen' ? 70 : 120

        detalleDeErrorScreen.setPosition(verticalPosition, horizontalPosition)
        setTimeout(() => detalleDeErrorScreen.webContents.send('detalleDeError', data), 500)
    })
    ipcMain.on('motrarSelectorDeEnemigos', (event, data) => {
        landingScreen.show()
    })
    ipcMain.on('recalculoFotoMiniatura', (event, data) => {
        landingScreen.webContents.send('recalculoFotoMiniatura', data)
    })
    landingScreen.on('close', (event, data) => {
        app.quit()
    })
    ipcMain.on('borrarRutaConfig', (event, data) => {
        store.set('ruta', "")
        ruta = ""
    })

})

autoUpdater.on("update-available", (event, releaseNotes, releaseName) => {
    dialog.showErrorBox('update-available', `${event} ||| ${releaseNotes} ||| ${releaseName}`)
})
autoUpdater.on("update-not-available", (event, releaseNotes, releaseName) => {
    dialog.showErrorBox('update-not-available', `${JSON.stringify(event)} ||| ${releaseNotes} ||| ${releaseName}`)
})
autoUpdater.on("before-quit-for-update", (event, releaseNotes, releaseName) => {
    dialog.showErrorBox('before-quit-for-update', `${event} ||| ${releaseNotes} ||| ${releaseName}`)
})
autoUpdater.on("error", (event, releaseNotes, releaseName) => {
    dialog.showErrorBox('error', `${event} ||| ${releaseNotes} ||| ${releaseName}`)
})