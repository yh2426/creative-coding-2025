

function setup() {
  createCanvas(windowWidth, windowHeight);

  //iteration operatiors;
  //i++; adds 1 to i
  //i+=10: adds 10 to i
  //i--: subtracts 1 from i
  //i -=5: subtracts 5 from i
  for(let i = 0; i<10;i++){
   console.log(i);

  }
}

function draw() {
  noLoop();
  background("#eec869ff");
  for(let y =50; y < height-50; y+=100){
  for(let x =50;x<width-50; x+=100){
    
  push();
  translate(x, y);
  let ratation= map(y,50,height-50,0,2*PI);
  rotate(ratation);
  //everything within this push/pop block
  //will be centered, with 0,0 as the center
  //point
  let randomratation;
  let randomamount = 0.078;
  let randomxdisp;
  let randomydisp;


  randomxdisp = random(-y*randomamount,y*randomamount);
  randomydisp = random(-y*randomamount,y*randomamount);

  if(mouseIsPressed==true)
{  translate(randomxdisp,0);
}


  
  strokeWeight(3);
  fill("#f0f321ff")
  circle(0,0, 100);
  circle(-15,-10,10);
  circle(15,-10,10);
  let happiness;
  happiness = map(x,0,width,-25,25);
  arc(0,0,60,60, radians(0-happiness),radians(180+happiness));

  pop();
  }
  }

  
}
