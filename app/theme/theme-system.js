const storageFolder = './electron-theme-system/';
const themeFolder = storageFolder + 'themes/';
const fs = require("fs");

module.exports.allThemes = new Array();

module.exports.initialiseThemeSystem = function() {
    checkFolder();
    readContents();
    printThemesFound();
}

var printThemesFound = function() {
    module.exports.allThemes.forEach(function(entry) {
        console.log('Theme: ' + entry.name);
    });
}

let readContents = function() {
    var files = fs.readdirSync(themeFolder);
    files.forEach(function(entry) {
        var stats = fs.lstatSync((themeFolder + entry));
        if (stats.isDirectory()) {
            var theme = new module.exports.ThemeDetails();
            theme.folder = themeFolder + entry + '/';
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

var loadTheme = function(themeFolderName) {

}

let checkFolder = function() {
    var exists = fs.existsSync(themeFolder);
    if (!exists) {
        fs.mkdirSync(themeFolder);
    }
}

module.exports.ThemeDetails = function() {
    var folder;
    var name;
}