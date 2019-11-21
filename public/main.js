const { app, BrowserWindow, Menu, MenuItem } = require('electron');
const path = require('path');
let win

function createWindow () {

  let win = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      nodeIntegration: true
    }
  });
  //win.loadURL('http://localhost:3000/')
  win.loadURL(`file://${path.join(__dirname, '../build/index.html')}`)
  
  win.webContents.openDevTools()

}

app.on('ready', createWindow)