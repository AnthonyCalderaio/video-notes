const { app, BrowserWindow, dialog } = require('electron');
// const remoteMain = require('@electron/remote/main');

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
      contextIsolation: true,  // Disable context isolation for easier IPC
      enableRemoteModule: false, // Ensure this is false
      // webSecurity: false
      // enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
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
    
  // remoteMain.initialize(); // Initialize remote
  // remoteMain.enable(mainWindow.webContents); // Enable remote for this window

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

// Define IPC handlers in the main process
const { ipcMain } = require('electron');

ipcMain.handle('openDialog', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections']
  });
  return result.filePaths; // Returns selected file paths to Angular
});


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
  // mainWindow.loadURL('http://localhost:4200');
})