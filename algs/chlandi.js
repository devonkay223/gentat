let particles;
// let sliders;

var chf1; //frequency 1
var chf2; //frequency 2
var v1; //velocity
var n1; //number

// chladni frequency params
let a=1;
let b=1;
// vibration strength params
let A = 0.02;
let minWalk = 0.002;

let nParticles = 10000;

const pi = 3.1415926535;

// chladni 2D closed-form solution - returns between -1 and 1
const chladni = (x, y, a, b, f1, f2) => 
  a * sin(pi*f2*x) * sin(pi*f1*y) 
+ b * sin(pi*f1*x) * sin(pi*f2*y);

function setupCH() {
  chUISetUp();
  setupParticles();
}
// run each frame
function drawCH() {
  background(backgroundColor);
  stroke(255);
  textVisCH();
  textVisWindowSliders()

  chf1 = sF1.value();
  chf2 = sF2.value();
  v1 = sV1.value();
  n1 = sN1.value();

  moveParticles();
  outline();
}



function setupParticles() {
  // particle array
  particles = [];
  for (let i = 0; i < nParticles; i++) {
    particles[i] = new Particle();
  }
}

class Particle {

  constructor() {
    this.x = random(0,1);
    this.y = random(0,1);
    this.amp;    
    this.updateOffsets();
  }

  move() {
    // vibration (between -1 and 1, zeroes are nodes)
    let eq = chladni(this.x, this.y, a, b, chf1, chf2);

    // set the amplitude of the move -> proportional to the vibration
    this.amp = v1 * abs(eq);

    if (this.amp <= minWalk) this.amp = minWalk;

    // perform one random walk
    this.x += random(-this.amp, this.amp);
    this.y += random(-this.amp, this.amp);
 
    this.updateOffsets();
  }

  updateOffsets() {
    // handle edges
    if (this.x <= 0) this.x = 0;
    if (this.x >= 1) this.x = 1;
    if (this.y <= 0) this.y = 0;
    if (this.y >= 1) this.y = 1;

    // convert to screen space
    this.xOff = algBoundsW * this.x; // (this.x + 1) / 2 * width;
    this.yOff = algBoundsH * this.y; // (this.y + 1) / 2 * height;
    // this.xOff = this.x ; //(this.x + 1)/2 * algBoundsW; // (this.x + 1) / 2 * width;
    // this.yOff = this.y; //(this.y + 1) / 2 * algBoundsH;
  }

  show() {
    point(this.xOff, this.yOff)
  }
}

function moveParticles() {
  let movingParticles = particles.slice(0, n1);

  // particle movement
  for(let particle of movingParticles) {
    particle.move();
    particle.show();
  }
}



// UI mess
function chUISetUp() {
  let mul = 5;
  textVisCH();
  sF1 = createSlider(1, 10, 7, 1);
  sF1.position(sliderX,  sliderY +space*mul);
  sF1.style('width', '100px');  
  mul++;
  sF2 = createSlider(1, 10, 2, 1); 
  sF2.position(sliderX, sliderY +space*mul);
  sF2.style('width', '100px');  
  mul++
  sV1 = createSlider(0.01, 0.1, 0.02, 0.01); 
  sV1.position(sliderX, sliderY +space*mul);
  sV1.style('width', '100px'); 
  mul++;
  sN1 = createSlider(1000, 10000, 10000, 1000)
  sN1.position(sliderX, sliderY +space*mul);
  sN1.style('width', '100px'); 
  mul++;
}

function textVisCH(){
  fill("#fff")
  noStroke();
  let mul =5;
  
  text('Frequency 1', textX, textY+space*mul);
  mul++;
  text('Frequency 2', textX, textY+space*mul);
  mul++;
  text('Velocity 1', textX, textY+space*mul);
  mul++;
  text('Num of Particles', textX, textY+space*mul);

  stroke("#fff");
  noFill();
}

function removeSlidersCH(){
  // document.getElementById("sliders") ="";
  sF1.remove();
  sF2.remove();
  sV1.remove();
  sN1.remove();
}