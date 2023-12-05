let currentAlg = "0";
let backgroundColor = "#332B2B"


function setup(){
    createCanvas(500, 500);
    stroke("#fff");
    if(currentAlg == "0"){
        setupH();
    }
    else if(currentAlg == "1"){
        console.log("alfg")
        removeSlidersH();
        setupCH();
    }
}

function draw(){
    if(currentAlg == 0){
        drawH();
    }
    else if(currentAlg == 1){
        drawCH();
    }
}

function resetSketch(){
    background("#332B2B"); 
    line=[];
    loop();
  }
  
  function stopSketch(){
    noLoop()
  }
  
  function startSketch(){
    loop()
  }