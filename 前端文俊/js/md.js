function mdSwitch() {
    let mdValue = document.getElementById("md-area").value;
    let converter = new showdown.Converter();
    document.getElementById("show-area").innerHTML = converter.makeHtml(mdValue);
}

function getInputMdValue() {
    return  document.getElementById("md-area").value;
}

function setInputMdValue(value) {
    document.getElementById("md-area").value = value;
}

function setShowMdValue(value) {
    let converter = new showdown.Converter();
    document.getElementById("show-area").innerHTML = converter.makeHtml(value)
}

function setMd(value) {
    setInputMdValue(value);
    setShowMdValue(value);
}