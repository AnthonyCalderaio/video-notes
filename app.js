const { app, BrowserWindow } = require('electron');

const url = require("url");
const path = require("path");

let mainWindow

let env = 'dev'

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 1000,
    minWidth: 900,
    minHeight: 900,
    webPreferences: {
      nodeIntegration: true, // Enable Node.js integration in the Angular app
      contextIsolation: false,  // Disable context isolation for easier IPC
      // webSecurity: false
      // enableRemoteModule: true,
      // This file is where we run 'node' commands
      // preload: path.join(__dirname, "preload.js") // add "preload"
    }
  })

  // mainWindow.loadURL(`file://${__dirname}/index.html`); 

    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/video-notes/index.html`),
        protocol: "file:",
        slashes: true
      })
    );
    
    mainWindow.webContents.openDevTools()

  // mainWindow.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, `/dist/video-notes/index.html`),
  //     protocol: "file:",
  //     slashes: true
  //   })
  // );
  // Open the DevTools.

  // mainWindow.on('closed', function () {
  //   mainWindow = null
  // })
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
  // mainWindow.loadURL('http://localhost:4200');
})