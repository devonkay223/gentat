
let plot = new PlotManager();
let canvas= document.getElementById("defaultCanvas0")
let images = [];

// function saveImage(){
//     let imgOut = canvas.toDataURL('image/png')
//     images.push(imgOut);
// }

function algSelection(algIn){
    prevAlg = currentAlg;
    currentAlg = algIn;
    setup();
}

function downloadSketch(filename) {
    plotSetUp();
    plot.setUnits(2);
    // plot.processImage();
    download("gentat.py");
}

function download(filename="gentat.py") {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(plot.generateCode()));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function plotSetUp(){
    //draw a 2 unit line in the positive X for each point
    plot.addAbsoluteGoTo();
    plot.addPenDown();
    // plot.addRelativeGoTo(1, 0);
    plot.addPenUp();
  }