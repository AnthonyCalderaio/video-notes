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

// Function to activate the key
function activateKey(key) {
  // Simulated list of valid keys
  const validKeys = ['VALID-KEY-123', 'ANOTHER-KEY-456'];
  if (validKeys.includes(key)) {
    
    const premiumData = { premium: true, activatedAt: new Date().toISOString() };
    fs.writeFileSync(premiumFilePath, JSON.stringify(premiumData, null, 2));
    console.log('Premium status updated:', premiumData);
    return { success: true, message: 'Activation successful!' };
  } else {
    console.error('Invalid activation key:', key);
    return { success: false, message: 'Invalid activation key.' };
  }
}

// IPC handler for activating the key
ipcMain.handle('activate-key', (event, key) => {
  return activateKey(key);
});


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