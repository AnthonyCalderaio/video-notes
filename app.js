const { app, BrowserWindow, dialog } = require('electron');
// const remoteMain = require('@electron/remote/main');

const url = require("url");
const path = require("path");
const fs = require('fs');

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
      // webSecurity: false,
      // enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  })

  // mainWindow.loadURL(`file://${__dirname}/index.html`); 
// debugging opens with localhost
let debugging = false;
  if (debugging) {
    mainWindow.loadURL('http://localhost:4200');
    // mainWindow.loadURL('./src/index.html');
  } else {
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/video-notes/index.html`),
        protocol: "file:",
        slashes: true
      })
    );
  }


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

// Open Dialog
ipcMain.handle('openDialog', async () => {
  const result = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections']
  });
  return result.filePaths; // Returns selected file paths to Angular
});

// Payments
const axios = require('axios'); // For API requests

ipcMain.handle('validate-key', async (event, key) => {
  try {
    const response = await axios.post('https://vendor-api.paddle.com/key/validate', {
      license_key: key,
      product_id: 'pro_01jf1g9kpc2fkcve7xsvaw8ys5'
    });
    return response.data.success;
  } catch (error) {
    console.error('License validation failed:', error);
    return false;
  }
});

// Load Premium Status function
const premiumFilePath = path.join(app.getPath('userData'), 'premium.json');
function loadPremiumStatus() {
  if (!fs.existsSync(premiumFilePath)) {
    console.log('Premium status not found. Defaulting to non-premium.');
    return false; // Default to non-premium
  }

  try {
    const data = JSON.parse(fs.readFileSync(premiumFilePath, 'utf8'));
    console.log('Loaded premium status:', data);
    return data.premium === true; // Return true if premium
  } catch (error) {
    console.error('Error loading premium status:', error);
    return false; // Default to non-premium on error
  }
}


// app.on('ready', createWindow)
app.whenReady().then(() => {
  createWindow();

  // Register the IPC handler
  ipcMain.handle('load-premium-status', async () => {
    return loadPremiumStatus();
  });
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
  // mainWindow.loadURL('http://localhost:4200');
})