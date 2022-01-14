const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('ipcRenderer', {
  ...ipcRenderer,
  once: (eventName, callback) => {
    ipcRenderer.once(eventName, () => {
      callback();
    });
  },
});
