const theme = require('./theme/theme-system');
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { ipcMain } = require('electron')

const storageFolder = './electron-theme-system/';
const fs = require("fs");

let browserWindow;

function createWindow() {
    browserWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'Electron Theme System',
    });


    if (!fs.existsSync(storageFolder)) {
        fs.mkdirSync(storageFolder);
    }

    //Initialises the theme system
    theme.initialiseThemeSystem();

    browserWindow.setMenu(null);

    browserWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'view/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    browserWindow.webContents.openDevTools();

    browserWindow.on('closed', () => {
        browserWindow = null
    });
}

var sendThemes = function(event, args) {
    console.log('themes requested');
    event.sender.send('themesResponse', theme.allThemes);
}

ipcMain.on('requestThemes', sendThemes);

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (browserWindow === null) {
        createWindow();
    }
});