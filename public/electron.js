/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const fs = require('fs');
const { writeFile } = fs;

let mainWindow;
let win;
let canCapture = false;
let savedPath;
let runone = true;
let img = [];
let index = 0;
let windowPool = [];
//主进程

app.disableHardwareAcceleration();
const createWindow = () => {
  // 创建程序窗口，有关选项可参考：[[Electron Documentation](https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions)](https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions)
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
  });

  // isDev 判断是开发模式还是产品模式，开发模式读取本地服务器，非开发模式读取 React 生成文件的 index.html 文件。
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `https://eletron-screenshot.llssite.com`);
  mainWindow.on('closed', () => (mainWindow = null));
  // mainWindow.webContents.openDevTools();
};
ipcMain.handle('capture-img', (event, arg) => {
  canCapture = false;
  img = [];
  index = 0;
  windowPool = [];
  let captureIdx = 0;
  const length = JSON.parse(arg.extra).length;
  win = new BrowserWindow({
    webPreferences: { offscreen: true, preload: path.join(__dirname, 'preload.js') },
    show: false,
    width: arg.width,
    height: arg.height,
    enableLargerThanScreen: true,
    useContentSize: true,
  });
  win.webContents.openDevTools();
  win.webContents.on('paint', (event, dirty, image) => {
    if (canCapture) {
      if (length <= captureIdx) {
        return;
      }
      img.push(image);
      setTimeout(() => {
        const win2 = new BrowserWindow({
          webPreferences: { offscreen: true, preload: path.join(__dirname, 'preload2.js') },
          show: false,
        });
        windowPool.push(win2);
        win2.loadURL(isDev ? 'http://localhost:3000' : `https://eletron-screenshot.llssite.com`);
      }, 500 * captureIdx);
      captureIdx++;
    }
  });
  win.on('closed', () => (win = null));
  win.webContents.setFrameRate(60);
  win.loadURL(
    isDev
      ? 'http://localhost:3000/capture-img?type=' + arg.type + '&extra=' + encodeURIComponent(arg.extra)
      : 'https://eletron-screenshot.llssite.com/capture-img?type=' +
          arg.type +
          '&extra=' +
          encodeURIComponent(arg.extra),
  );
  if (runone) {
    ipcMain.handle('captureEnd', () => {
      if (win) {
        win.close();
      }
      return 'ok';
    });
  }
  runone = false;
  return 'success';
});
ipcMain.on('choose-file', event => {
  savedPath = dialog.showSaveDialogSync(mainWindow, { properties: ['createDirectory'] });
  if (savedPath && !fs.existsSync(savedPath)) {
    fs.mkdirSync(savedPath);
  }
  event.returnValue = !!savedPath;
});
ipcMain.handle('loadEnd', (event, arg) => {
  canCapture = true;
  return 'ok';
});

ipcMain.on('getImg', (event, arg) => {
  event.returnValue = { image: img[index], savedPath, index };
  index++;
});
ipcMain.on('closeWindow', (event, arg) => {
  windowPool[arg.index].close();
  if (arg.index === windowPool.length - 1) {
    mainWindow.webContents.send('downloadEnd', {});
  }
});

app.whenReady().then(() => {
  createWindow();
});
