
let eyeHeight =150;
let eyeWidth = 100;
let speed =0.01;
let noiseR =0;
let noiseT = 1000;

let x =200;
let y = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB);
}

function draw() {
  background(0);
  translate(width/2,height/2);

  fill(255);
  ellipse(0,0,eyeWidth,eyeHeight);

  let eyeTheta = noise(noiseT)*360;
  let eyeXRadius = noise(noiseR)*eyeWidth/2;
  let eyeYRadius = noise(noiseR)*eyeHeight/2;

  let eyeX = cos(eyeTheta)*eyeXRadius;
  let eyeY = sin(eyeTheta)*eyeYRadius;

  fill(0);
  ellipse(eyeX,eyeY,eyeWidth/2, eyeHeight/2);

  noiseR = noiseR +speed;
  noiseT = noiseT +speed;
  
}
class EyeBall{
  constructor(x,y,w,h){
          this.x =x;
          this.y =y;

          this.w = w;
          this.h =h;
          
          this.speed = 0.005
          this.noiseR =0;
          this.noiseT = 1000;

  }

}
