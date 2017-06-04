const { ipcRenderer } = require('electron')

var themes = new Array();
var currentlySelected;

var currentThemePath;

//Send a request theme
ipcRenderer.send('requestThemes', {});

var requestThemesCall = function(event, args) {
    themes = args;
    requestedThemesSuccessful();
}

var requestThemeCall = function(event, args) {
    currentThemePath = args;
    swapStyleSheet(args);
}

var swapStyleSheet = function(folder) {
    document.getElementById("index-style-sheet").setAttribute("href", folder + "index-style-sheet.css");
}

var updateTheme = function() {
    document.getElementById("index-style-sheet").setAttribute("href", currentThemePath + "index-style-sheet.css");
}

var requestedThemesSuccessful = function() {
    createDocumentElements();
}

var createDocumentElements = function() {
    var location = document.getElementById('styles');
    var checkFirst = false;

    themes.forEach(function(element) {
        var label = document.createElement("label");
        var radio = document.createElement("input");
        var br = document.createElement("br");
        radio.type = "radio";
        radio.name = "themeRadio";
        radio.value = element.name;
        radio.setAttribute("onclick", "themeClickButton(this);")
        if (checkFirst) {
            radio = true;
            radio.checked = true;
        }
        label.appendChild(radio);
        label.appendChild(document.createTextNode(element.name));
        label.appendChild(br);
        location.appendChild(label);
    });
}

var themeClickButton = function(radioButton) {
    currentlySelected = radioButton.value;
    ipcRenderer.send('requestTheme', radioButton.value);
}

var changeTheme = function() {

}

ipcRenderer.on('themesResponse', requestThemesCall);
ipcRenderer.on('themeResponse', requestThemeCall);