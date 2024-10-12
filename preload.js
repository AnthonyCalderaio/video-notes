const { exec } = require("child_process");
const { contextBridge, ipcRenderer } = require('electron');


// All of the Node.js APIs are available in the preload process.
window.addEventListener("DOMContentLoaded", () => {
  exec(`ng serve`);
});

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: ipcRenderer,
});