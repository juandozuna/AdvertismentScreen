import { app, BrowserWindow, Tray, Menu, screen, ipcMain,  dialog} from 'electron'
const electron = require('electron');
const nativeImage = electron.nativeImage;
const path = require('path');
const fs = require('fs');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let secondWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/#/`
  : `file://${__dirname}/index.html/#/`

let demoIcon = nativeImage.createFromPath('./512x512.png')

function createWindow () {
  /**
   * Initial window options
   */
  
  mainWindow = new BrowserWindow({
    height: 890,
    width: 778,
    useContentSize: true,
    show: true,
    minHeight: 890,
    minWidth: 778,
    webPreferences: {
      webSecurity: false
    },
    titleBarStyle: 'hiddenInset'
  })
  mainWindow.setPosition(20,screen.getPrimaryDisplay().bounds.y )
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  let sW = 700
  let sH = 500
  let sX = 0
  let sY = 0
  let goFullScreen = false
  let onTop = false
  let displays = screen.getAllDisplays();
  if(displays.length > 1){
    let sDisplay = displays[1];
    if(sDisplay){
      sX  = sDisplay.bounds.x+100
      sY = sDisplay.bounds.y+50
      sW = sDisplay.workAreaSize.width-200
      sH = sDisplay.workAreaSize.height-200
      goFullScreen = true
      onTop = true
    }else{
      goFullScreen = false
      onTop = false
    }

  }


  secondWindow = new BrowserWindow({
    height: sH,
    width: sW,
    useContentSize: true,
    frame: false,
    closable: true,
    show: false,
    webPreferences: {
      webSecurity: false
    },
    alwaysOnTop: onTop
  })

  secondWindow.setPosition(sX,sY)
  if(goFullScreen){
    secondWindow.setFullScreen(true);
  }
  secondWindow.loadURL(winURL+"slider")


}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})


ipcMain.on('next-slide', ()=>{
  secondWindow.webContents.send('siguiente-slide');
})

ipcMain.on('previous-slide', ()=>{
  secondWindow.webContents.send('antes-slide');
})

ipcMain.on('change-time',(event, args) => {
  secondWindow.webContents.send('change-time', args);
})

ipcMain.on('added-slide', (event, args)=>{
  secondWindow.webContents.send('added-slide', args);
})

ipcMain.on('delete-slide', (event, args) => {
  secondWindow.webContents.send('delete-slide', args);
})

ipcMain.on('delete-denied', (event) => {
  mainWindow.webContents.send('delete-denied');
})


let opsPath = path.join(__static,'options.json');
let pathToFolder = path.join(app.getPath('documents'), 'AdsSlider');
let options = [];
if(!fs.exists(opsPath))
{
  options = {
    appFolder: pathToFolder,
    ActiveSlides: path.join(pathToFolder, 'ActiveSlides'),
    InactiveSlides: path.join(pathToFolder, 'InactiveSlides'),
    TrashedSlides: path.join(pathToFolder, 'TrashedSlides')
  }

    for(let key in options){
      if(!fs.existsSync(options[key])){
        fs.mkdirSync(options[key]);
      }
    }

  let string = JSON.stringify(options,null, 3);
  fs.writeFile(opsPath,string,(err) => {
    if(err) dialog.showErrorBox('Ads Slides', "File wasn't uploaded succesfully");
    else{
      console.log('Archivo Creado exitosamente');
    }
  })
}else{
  fs.readFile(opsPath, (err, data) => {
    if(err) throw err;
    options = JSON.parse(data);
    console.log('Options Loaded Succesfully');
  })
}
global.__options = options;

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */