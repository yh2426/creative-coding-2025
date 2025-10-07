let circleX = 0;
let circleY = 0;
let circleD = 25;
let thetaX = 0;
let thetaY = 0;

let radiusY =100;
let radiusX =100;


function setup() {
  createCanvas(windowWidth, windowHeight);
  circleX = width/2
  circleY = height/2;
  
}

function draw() {
  
  let r = map(second(),0,60,0,width/2);
  background(0,30);

 

  circleX =cos(radians(thetaX))*radiusX;
  thetaX ++;

  translate(width/2,height/2);
  textSize(30);
  text(day(),0,0);
  text(hour(),0,30);
  text(minute(),0,60);
  text(second(),0,90);
  
  noFill();

  stroke("red")
  circle(circleX,0,25);

  stroke("green");
  circleY=sin(radians(thetaY)*radiusY);
  circle(0,circleY,circleD);
  thetaY++;

  stroke(255);
  circle(circleX,circleY,circleD);

  for(let i=0;i<12;i++){
  let theta =i*(360/12);
  let radius =100;
  let x = cos(radians(theta))*radius;
  let y = sin(radians(theta))*radius;
  circle(x,y,circleD);
  //text(i,x,y);

  }




  
}
