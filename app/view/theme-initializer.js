const { ipcRenderer } = require('electron')

var themes;
var currentlySelected;

//Send a request theme
ipcRenderer.send('requestThemes', {});

var requestThemesCall = function(event, args) {
    themes = args;
    requestedThemesSuccessful();
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
    //alert(radioButton.value);
    //todo: when the user clicks a radio button, get the appropriate theme materials
}

ipcRenderer.on('themesResponse', requestThemesCall);