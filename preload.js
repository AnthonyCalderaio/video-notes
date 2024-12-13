const { exec } = require("child_process");
const { contextBridge, ipcRenderer } = require('electron');


// All of the Node.js APIs are available in the preload process.
window.addEventListener("DOMContentLoaded", () => {
  exec(`ng serve`);
});

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    invoke: (...args) => ipcRenderer.invoke(...args),
    on: (...args) => ipcRenderer.on(...args),
    send: (...args) => ipcRenderer.send(...args),
},
});