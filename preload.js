const { exec } = require("child_process");
const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');


// All of the Node.js APIs are available in the preload process.
window.addEventListener("DOMContentLoaded", () => {
  exec(`ng serve`);
});

//// Open Dialog

// File Uploader
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    invoke: (...args) => ipcRenderer.invoke(...args),
    on: (...args) => ipcRenderer.on(...args),
    send: (...args) => ipcRenderer.send(...args),
},
});

//// Open Dialog

// Validate key
contextBridge.exposeInMainWorld('license', {
  validate: (key) => ipcRenderer.invoke('validate-key', key),
});


// Define the path for the premium status file
// const userDataPath = app.getPath('userData'); // Electron's user data directory
// const premiumFilePath = path.join(userDataPath, 'premium.json');

// Get Premium Status
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

// Handle IPC calls
// Expose loadPremiumStatus and other IPC calls
contextBridge.exposeInMainWorld('premiumAPI', {
  loadPremiumStatus: async () => {
    try {
      const status = await ipcRenderer.invoke('load-premium-status');
      return status;
    } catch (error) {
      console.error('Error invoking load-premium-status:', error);
      throw error; // Re-throw to handle errors in the Renderer Process
    }
  },
});