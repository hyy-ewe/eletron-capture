const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

const { writeFile } = fs;

const res = ipcRenderer.sendSync('getImg');
const { savedPath, image, index } = res;
writeFile(path.join(savedPath, '/img' + Date.now() + index + '.jpg'), image.toJPEG(50), {}, () => {
  ipcRenderer.sendSync('closeWindow', { index });
});
