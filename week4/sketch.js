

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {

  //any transformations are reset
  //at the beginning of draw
  background("#8cdd73ff");
  circle(100,100,100);
  circle(85,90,5);
  arc(100,100,60,60,0,PI);
  circle(115,90,5);

  push();
  rotate(radians(mouseX));
  stroke("white");
  strokeWeight(5);
  line(0,0,100,0);
  pop();





  push(); //push and pop isolate a transformation
  //anthing enclosed withinpush and popo only applies
  // within that enclosure
  // push indicates the beginning of an isolated block

  if(mouseX>width/2&&mouseY > height/2){//if the test inside the() is met....
    //run this code
    fill("pink");
  } else if(mouseX <width/2 && mouseY<height/2){
    fill("orange");
  }
  
    else{
    //run this other code
    fill("yellow");
    }

    if(mouseIsPressed == true) {
      fill("red");
    }

  
  translate(width/2, height/2);

  let angle;
  //map is a function that scales numbers proportionately
  //parameters;
  //1: imput bariable to scale
  //2: low end of imput range
  //3: high end of imput range
  //4: low end of the output tange
  //5: high end of the output range
  angle = map(mouseX,0,width,0,360);
  rotate(radians(angle));


  let scaleFactor;// making a barable to hold scale amout
  scaleFactor = map(mouseY,0,height,0.1,3);
//scale makes the coordiante system larger or smaller
//it takes a "factor" as a parameter
  scale(scaleFactor);
  circle(0,0,100);
  circle(-15,-10,5);
  arc(0,0,60,60,0,PI);
  circle(15,-10,5);
  pop(); //pop indicates the end of an isolated block
  rect(0,0,10,10);
  //text function: text, x, y of top left corner
  text(mouseX + "," +mouseY,5,15);
  
  



}
