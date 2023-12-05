
let canvas= document.getElementById("defaultCanvas0")
let images = [];

function saveImage(){
    let imgOut = canvas.toDataURL('image/png')
    images.push(imgOut);
}

function fileDownload(filename) {
    // plot.processImage();
    download(filename+".py");
}

function download(filename="plotTest") {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(plot.generateCode()));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function algSelection(algIn){
    currentAlg = algIn;
    setup();
}