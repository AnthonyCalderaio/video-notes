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


//// Validation
// Validate key
contextBridge.exposeInMainWorld('license', {
  activateKey: (key) => ipcRenderer.invoke('activate-key', key),
});

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