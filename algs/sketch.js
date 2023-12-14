let currentAlg = "0";
let prevAlg;
let backgroundColor = "#332B2B"
let algBoundsW = 100; //current relationship is val/20 = cm dimension for plot
let algBoundsH = 100;
const textX = 625;
const textY = 30;
const sliderX = 745;
const sliderY = 135;
const space = 30;

let sli = 0;


function setup(){
    createCanvas(1000, 800);
    stroke("#fff");
    textSize(14);
    if(sli==0){
        windowSliders();
        sli=1;
    }

    if(prevAlg){
        console.log(prevAlg)
        UIcleanUp();
    }

    if(currentAlg == "0"){
        setupH();
    }
    else if(currentAlg == "1"){
        setupCH();
    }

    stroke("#fff");
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

function UIcleanUp(){
    if(prevAlg == "0"){
        removeSlidersH();
    }
    else if(prevAlg == "1"){
        removeSlidersCH();
    }
}

function outline(){
    stroke("#726565")
    rect(x0.value(), y0.value(), x1.value()*2, y1.value()*2);
    stroke("#fff")
}

function windowSliders(){
  let mul = 2
    
  x0 = createSlider(0, textX, 0, 1) //0.8, 10, 6, 0.2);
  x0.position(sliderX, sliderY);
  x0.style('width', '100px');  
  y0 = createSlider(0, height, 0, 1) //0.8, 10, 6, 0.2);
  y0.position(sliderX, sliderY +space);
  y0.style('width', '100px');  
  x1 = createSlider(0, textX, 40, 1) //0.8, 10, 6, 0.2);
  x1.position(sliderX, sliderY +space*mul);
  x1.style('width', '100px'); 
  mul++;
  y1 = createSlider(0, height, 40, 1) //0.8, 10, 6, 0.2);
  y1.position(sliderX, sliderY+space*mul);
  y1.style('width', '100px'); 
}

function textVisWindowSliders(){
    // console.log("here");
    fill("#fff");
    noStroke();
    let mul =2;
    
    text('Window X0', textX, textY);
    text('Window Y0', textX, textY+space);
    text('Width', textX, textY+space*mul);
    mul++;
    text('Height', textX, textY+space*mul);
     mul++;

    stroke("#fff");
    noFill();
}