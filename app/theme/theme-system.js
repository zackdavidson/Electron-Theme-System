var storageFolder = 'electron-theme-system/';
var themeFolder;
const fs = require("fs");
const path = require('path');


module.exports.allThemes = new Array();

module.exports.initialiseThemeSystem = function(mainDir) {
    console.log('HEY THERE ' + mainDir);
    storageFolder = mainDir + "\\";
    themeFolder = storageFolder + 'themes/';
    checkFolder();
    readContents();
}

let readContents = function() {
    var files = fs.readdirSync(themeFolder);
    files.forEach(function(entry) {
        var stats = fs.lstatSync((themeFolder + entry));
        if (stats.isDirectory()) {
            var theme = new module.exports.ThemeDetails();
            theme.folder = (themeFolder + entry + '\\');
            console.log(themeFolder + " HEREEEEEE");
            theme.name = getThemeName(theme.folder);
            module.exports.allThemes.push(theme);
        }
    });
}

var getThemeName = function(themeFolder) {
    var content = fs.readFileSync(themeFolder + 'package.json');
    var json = JSON.parse(content);
    return json.themeName;
}

let checkFolder = function() {
    var exists = fs.existsSync(themeFolder);
    if (!exists) {
        fs.mkdirSync(themeFolder);
    }
}

module.exports.getThemeFolder = function(themeName) {
    var foundThemePath = '';
    module.exports.allThemes.forEach(function(entry) {
        if (themeName === entry.name) {
            foundThemePath = entry.folder;
        }
    });
    return foundThemePath;
}

module.exports.ThemeDetails = function() {
    var folder;
    var name;
}