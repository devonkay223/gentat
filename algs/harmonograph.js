var line;
let PI;

// amplitude
var a1 =100;
var a2=100;
var a3=100;
var a4=100;

// frequency
var f1 = 2;
var f2 = 6;
var f3 = 1.01;
var f4 = 3;

// phase
var p1 = PI/16;
var p2 = 3*PI/6;
var p3 = 13/PI/6;
var p4 = PI;

// damping
var d1;
var d2;
var d3;
var d4;

// var reps=0.0;

var timeStamp=0;
var diff=0;

function setupH() { 
  noFill();
  strokeWeight(1);
  line = [];
  
  hUISetUp();
  // frameRate(1);
} 

function drawH() { 
  background(backgroundColor); 
  textVisH();
  textVisWindowSliders()
  var t = ((millis()-diff) / 2000);
  a1 = sA1.value();
  a2 = sA2.value();
  a3 = sA3.value();
  a4 = sA4.value();
  
  p1 = pA1.value();
  p2 = pA2.value();
  p3 = pA3.value();
  p4 = pA4.value();

  outline();
  
  translate(width/4, height/3);
    
  line.push({
    x: (a1*sin(t*f1+p1))+(a2*sin(t*f2+p2)),
    y: (a3*sin(t*f3+p3))+(a4*sin(t*f4+p4)),
  })
  
  drawVertices(line);
}


function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
   	vertex(vertices[i].x, vertices[i].y); 
  }
  endShape();
}

// UI mess
function hUISetUp(){
  textVisH();
  // sliderX = 600;
  // sliderY = 160;
  // space = 30;
  let mul = 5;
    
  sA1 = createSlider(-200, 200, 80, 5) //0.8, 10, 6, 0.2);
  sA1.position(sliderX, sliderY +space*mul);
  sA1.style('width', '100px');  
  mul++
  sA2 = createSlider(-200, 200, 80, 5) //0.8, 10, 6, 0.2);
  sA2.position(sliderX, sliderY +space*mul);
  sA2.style('width', '100px');  
  mul++
  sA3 = createSlider(-200, 200, 80, 5) //0.8, 10, 6, 0.2);
  sA3.position(sliderX, sliderY +space*mul);
  sA3.style('width', '100px'); 
  mul++;
  sA4 = createSlider(-200, 200, 80, 5) //0.8, 10, 6, 0.2);
  sA4.position(sliderX, sliderY+space*mul);
  sA4.style('width', '100px'); 
  mul+=2;
  
  pA1 = createSlider(0.1, 10, 0.19, 0.05)
  pA1.position(sliderX, sliderY+space*mul);
  pA1.style('width', '100px');  
  mul++;
  pA2 = createSlider(0.1, 10, PI, 0.05)
  pA2.position(sliderX, sliderY +space*mul);
  pA2.style('width', '100px');
  mul++;
  pA3 = createSlider(0.1, 10, 1.6 , 0.05)
  pA3.position(sliderX, sliderY +space*mul);
  pA3.style('width', '100px'); 
  mul++;
  pA4 = createSlider(0.1, 10, 2.3, 0.05)
  pA4.position(sliderX, sliderY+space*mul);
  pA4.style('width', '100px'); 
  mul+=2;
  
  // rp1 = createSlider(0, 100, 10, 0.1)
  // rp1.position(sliderX, sliderY+space*mul);
  // rp1.style('width', '100px'); 
}


function textVisH(){
  fill("#fff")
  noStroke();
  let mul =5;
  
  text('Amplitude 1', textX, textY+space*mul);
  mul++
  text('Amplitude 2', textX, textY+space*mul);
  mul++;
  text('Amplitude 3', textX, textY+space*mul);
  mul++;
  text('Amplitude 4', textX, textY+space*mul);
   mul++;
  
  text('', textX, textY+space*mul);
   mul++;
  text('Period 1', textX, textY+space*mul);
   mul++;
  text('Period 2', textX, textY+space*mul);
   mul++;
  text('Period 3', textX, textY+space*mul);
   mul++;
  text('Period 4', textX, textY+space*mul);

  // mul+=2;
  // text('Repetition', textX, textY+space*mul);

  stroke("#fff");
  noFill();
}

function removeSlidersH(){
  sA1.remove();
  sA2.remove();
  sA3.remove();
  sA4.remove();

  pA1.remove();
  pA2.remove();
  pA3.remove();
  pA4.remove();

  // rp1.remove();
}