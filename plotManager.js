class PlotManager{
    constructor(){
      this.img;
      this.settings ="";
      this.motionSequence="";
      this.density;
    } 
   
    //Motion Sequence Functions
    getMotionSequence(){
      return this.motionSequence;
    }
  
    clearMotionSquence(){
      this.motionSequence ="";
    }
  
    addPenPositionUp(){
      this.motionSequence += "ad.pendup()\n";
    }
  
    addPenPositionDown(){
      this.motionSequence += "ad.pendown()\n";
    }
  
    // encodes sequence: penUp(), moveTo(x, y)
    addAbsoluteMoveTo(x="pixelX", y="pixelY"){
      this.motionSequence += "ad.moveto(" +x + "," + y + ")\n";
    }
  
    // encodes sequence: penUp(), moveTo(pointX+x, pointY+y)
    addRelativeMoveTo(deltax, deltay){
      this.motionSequence += "ad.move(" + deltax +", " + deltay +")\n";
    }
  
    // encodes sequence: penDown(), lineTo(x, y)
    addAbsoluteLineTo(x="pixelX", y="pixelY"){
      this.motionSequence += "ad.lineto(" + x + "," + y + ")\n";
    }
  
     // encodes sequence: penDown(), lineTo(x, y)
     addRealtiveLineTo(deltax, deltay){
      this.motionSequence += "ad.line(" + deltax +", " + deltay +")\n";
     }
  
    // encodes sequence: 
    addAbsoluteGoTo(x="pixelX", y="pixelY"){
      this.motionSequence += "ad.goto(" +x + "," + y + ")\n";
    }
  
    // encodes sequence: 
    addRelativeGoTo(deltax, deltay){
      this.motionSequence += "ad.go("+ deltax +", " + deltay +")\n";
    }
  
    addPenUp(){
      this.motionSequence += "ad.penup() \n";
    }
  
    addPenDown(){
      this.motionSequence += "ad.pendown()\n";
    }
    //Setting functions
    
    // 0 = inch, 1 = cm, 2 = mm
    // each pixel processed as an independent command so 1 pixel = 1 unit step
    setUnits(valueIn){
      this.settings += "ad.options.units = " + valueIn +"\n";
    }
  
    //File generation functions
    //TODO add bounds checking?
    processImage(){
      loadPixels();
      let out ="";
      let d = pixelDensity()*pixelDensity();
    //   console.log(d)
      let pixMod= 4.0;
      console.log(pixels)
  
      //for every pixel in image traverse check if on or off 
      // console.log(height, width);
      for(let j=0; j<height*d; j++){
        for(let i=0; i<width*d; i++){
          let index = 4*((j*(width*d))+(i))
          if((pixels[index] == 0 && pixels[index+1] ==0) && (pixels[index+2] ==0)){
            // console.log("black")
            let motion = this.motionSequence;
            motion = motion.replace(/pixelX/g, (i/d));
            motion = motion.replace(/pixelY/g, (j/d));          
            out += motion;
          } 

        }
      }
      updatePixels();
      return out;
      //maybe check neighbors for pixels desnity?? 
    }
    
  
    generateCode(){
      let intro = "import sys\nfrom pyaxidraw import axidraw \nad = axidraw.AxiDraw()  # Initialize class\nad.interactive()\nconnected = ad.connect()    # Open serial port to AxiDraw\nif not connected: \n    sys.exit() # end script\n";
      let settings = this.settings + "ad.update() \n";
      let body = this.processImage();
      // console.log(body);
      let outro = "ad.goto(0, 0) # Return home \nad.disconnect() # Close serial port to AxiDraw"
  
      let out = intro + settings + body + outro;
      return out;
    }
  
  }