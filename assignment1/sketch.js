//yinqi huang


//using the color pattern #kov_04
let cx, cy, cw, ch; //Inner canvas layout
let barHeight; //Height of the top/bottom gray bars

function setup() {
  createCanvas(windowWidth, windowHeight);

  function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
}

function draw() {
  background("rgba(185, 168, 38, 1)"); //Outer background color

  //Define the inner canvas position and size
  cx = width * 0.2; //x, 20% from left
  cy = height * 0.15; //y, 15% from top
  cw = width * 0.6; //width, 60% of screen
  ch = height * 0.7; //height, 70% of screen

  //Draw the inner canvas background
  noStroke();
  fill("rgba(178, 159, 20, 1)"); //Outer background color)"); 
  rect(cx, cy, cw, ch);

  //Top and bottom gray bars
  fill("rgba(176, 94, 1, 1)"); //Dark gray

  //barHeight set to 5% of the inner canvas height
  barHeight = ch * 0.05;

  //Top bar
  rect(cx, cy, cw, barHeight);

  //Bottom bar
  rect(cx, cy + ch - barHeight, cw, barHeight);

  //Topright vertex
  beginShape();
  noFill();
  stroke("rgba(23, 0, 30, 1)")
  vertex(cx + cw * 0.65, cy + ch * 0.2);//topleft point
  vertex(cx + cw * 0.75, cy + ch * 0.2);//topright point
  vertex(cx + cw * 0.85, cy + ch * 0.48);//bottomright point
  vertex(cx + cw * 0.75, cy + ch * 0.48);//bottomleft point
  endShape(CLOSE);


  //Central cross
  noStroke();
  fill("rgba(4, 111, 138, 1)");

  //Vertical bar
  //Width = 8% of canvas width
  //X = center of canvas - half width
  rect(cx + cw * 0.5 - cw * 0.04,cy + barHeight,cw * 0.08,ch - barHeight * 2);

  //Horizontal bar
  //Width = 80% of canvas width
  //X = canvas right edge - width
  rect(cx + cw - cw * 0.8,cy + ch * 0.5 - ch * 0.025,cw * 0.8,ch * 0.05);


  //Vertex connects to horizontal blue cross
  noStroke();
  fill("rgba(4, 111, 138, 1)");

  beginShape();

  vertex(cx+ cw*0.08,cy + ch * 0.42); //Topleft point 
  vertex(cx + cw * 0.21, cy + ch * 0.475); //Topright point
  vertex(cx + cw * 0.21, cy + ch * 0.525); //Bottomright point
  vertex(cx + cw * 0.06, cy + ch * 0.46); //Bottomleft point

  endShape(CLOSE);


  //Canva Top left field


  //Topleft circle
  stroke("rgba(219, 214, 214, 1)"); //yellow stroke
  strokeWeight(3);
  noFill();

  //X about 1/3 of canvas width from the left
  //Diameter 20% of canvas width
  circle(cx + cw * 0.34, cy + ch * 0.32, cw * 0.2);

  //top left vertex
  noStroke();
  fill("rgba(23, 0, 30, 1)");

  beginShape();
  vertex(cx + cw * 0.125, cy + ch * 0.05); //topleft point
  vertex(cx + cw * 0.2, cy + ch * 0.05); //topright pint
  vertex(cx + cw * 0.08, cy + ch * 0.42); //bottomright point
  vertex(cx + cw * 0.02, cy + ch * 0.39); //bottomleft point
  endShape(CLOSE);


  //Topleft cross rect
  fill("rgba(227, 3, 3, 1)");
  noStroke();

  rect(cx + cw * 0.05, cy + ch * 0.07, cw * 0.006,ch * 0.1);//vertical rect
  rect(cx,cy + ch * 0.12, cw * 0.12, ch * 0.005);//horizontal rect

  
//Canva Top right field


  //Top right circle
  noFill();
  stroke("rgba(227, 3, 3, 1)");
  strokeWeight(3);
  circle(cx + cw * 0.8, cy + ch * 0.15, cw * 0.13);

  //Topright cross rect
  noStroke();
  fill("rgba(4, 111, 138, 1)");
  rect(cx + cw * 0.7, cy + ch * 0.05, cw * 0.005, ch * 0.1); //vertical
  rect(cx + cw * 0.65, cy + ch * 0.1, cw * 0.1, ch * 0.005); //horizontal


//Canva bottom left field


  //Bottomleft rect
  noStroke();
  fill("rgba(23, 0, 30, 1)");
  rect(cx, cy + ch * 0.52, cw * 0.2, ch * 0.43);


  //Bottomleft vertex(insde the big rect)
  beginShape();

  stroke("rgba(13, 96, 24, 1)")
  noFill();
  vertex(cx + cw * 0.1, cy + ch * 0.6); //topleft point
  vertex(cx + cw * 0.18, cy + ch * 0.6); //topright point
  vertex(cx + cw * 0.11, cy + ch * 0.80); //bottomright point
  vertex(cx + cw * 0.03, cy + ch * 0.80); //bottomleft point
  endShape(CLOSE);
  
  //Bottomleft thny rect(inside big rect)
  noStroke();
  fill("rgba(219, 214, 214, 1)");
  rect(cx + cw * 0.06, cy + ch * 0.63, cw * 0.15, ch * 0.01);


  //Bottomleftcross rect
  noStroke();
  fill("rgba(227, 3, 3, 1)");
  rect(cx + cw * 0.2, cy + ch * 0.63, cw * 0.2, ch * 0.01); // horizontal
  rect(cx + cw * 0.3, cy + ch * 0.55, cw * 0.01, ch * 0.2);  // vertical


  beginShape();
  fill("rgba(219, 214, 214, 1)")
  vertex(cx + cw * 0.2, cy + ch * 0.76); //topleft point
  vertex(cx + cw * 0.3, cy + ch * 0.76); //topright point
  vertex(cx + cw * 0.46, cy + ch * 0.95); //bottomright point
  vertex(cx + cw * 0.35, cy + ch * 0.95); //bottomleft point
  endShape(CLOSE);


//Canva bottomright field


  //Bottom-right cross rect
  noStroke();
  fill("rgba(13, 96, 24, 1)");
  rect(cx + cw * 0.8, cy + ch * 0.6, cw * 0.06, ch * 0.3); //vertical rect
  rect(cx + cw * 0.8, cy + ch * 0.66, cw * 0.20, ch * 0.06); //horizontal rect

  //bottom right vertex
  noStroke();
  fill("rgba(13, 96, 24, 1)");
  beginShape();
  vertex(cx + cw * 0.54, cy + ch * 0.62); //topleft point
  vertex(cx + cw * 0.80, cy + ch * 0.66); //topright point
  vertex(cx + cw * 0.80, cy + ch * 0.72); //bottomright point
  vertex(cx + cw * 0.54, cy + ch * 0.68); //bottomleft point
  endShape(CLOSE);

  
  //Bottomright tiny cross rect
  noStroke();
  fill("rgba(23, 0, 30, 1)");
  rect(cx + cw * 0.9, cy + ch * 0.525, cw * 0.02, ch * 0.3); //vertical
  rect(cx + cw * 0.75, cy + ch * 0.57, cw * 0.25, ch * 0.01); //horizontal
  



}
