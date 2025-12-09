let pX = 0; //these are my origin points!
let pY = 0;
let targetX = 0; // these are my destination points!
let targetY = 0;
let currentX = 0;// current positon
let currentY = 0;
let lerpAmt = 0;//how much should i move from origin to destination
let speed = 0.01;

let prevSecond =0;//varaibale to store the
//time on the previous draw loop

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(255);
  currentX = lerp(pX, targetX,lerpAmt);
  currentY = lerp(pY, targetY, lerpAmt);
  circle(currentX, currentY,20);
  lerpAmt=lerpAmt+speed;
  //constrain is a function thats keeps a
  //value between a certain range
  //it takse 3 parameters; the value, the low limit
  //and the high limit
  lerpAmt = constrain(lerpAmt,0,1);

  if(prevSecond != second()){
    console.log("do something");
      prevSecond = second();
    targetX = random(width);
    targetY = random(height);
    lerpAmt = 0;
    pX = currentX;
    pY = currentY;

  }
}


function mousePressed(){
  lerpAmt = 0;
  pX = currentX;
  pY = currentY;
  targetX = mouseX;
  targetY = mouseY;
}