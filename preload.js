const { exec } = require("child_process");
const { contextBridge, ipcRenderer } = require('electron');


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
// activate key
contextBridge.exposeInMainWorld('license', {
  validate: (key) => ipcRenderer.invoke('validate-key', key),
});
