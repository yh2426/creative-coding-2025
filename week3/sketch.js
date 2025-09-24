// variable declaration:
//"let" is a keyword that allows you to declare a variable
// in the below example, a new variable is being created
// called"circleSize" which is toring a number(125)

let circleSize = 125; //variable to store circle size

function setup() {
  createCanvas(400, 400); // set a 400 px by 400px canvas;
  
}

function draw() {
  // a grayscale color is denoted as a number 0 - 255;
  // an rgb color is denoted as 3 numbers (red green blue);
  //background(127,0,0);
  // we can use the name of a color like "black" or "olive";
  // background("aqua");
  //we can also format rgb colors as strings;
  background("rgba(245, 199, 250, 1)");

  stroke("rgba(251, 255, 142, 1)");

  fill("rgba(210, 255, 253, 0.7)");
  strokeWeight(5);
  //noFill();
  //nostroke(); 
  fill('rohlfs_1R');
  //rect(0,0,width/2,height/2);
  

  // circle three parameters(x,y,d);
  circle(200, 200, 150);

  fill("rgba(161, 197, 255, 1)")
  rect(140,175,50,20);
  rect(210,175,50,20);
  fill("rgba(247, 66, 66, 1)")
  rect(190,220, 20, 40);
  


  // to draw ccomplex polygons (more than 2 coords);
  // create a beginshape(); function and an endshape function
  // any vertex(x,y) functions you place invetween beginshape and endshape
  // will be rendered as points in a complete polygon

  beginShape();
  vertex(100,100); // leftmost coordinate
  vertex(200,100); // top right coordinate
  vertex(200,120); // bottom- most coordinate
  endShape(CLOSE); // CLOSE paremeter closese the polygon

  stroke(5);
  line(200, 300, 200, 380);
  noFill();
  ellipse(170, 320, 10,30);
  ellipse(230, 320, 10,30);
  line(170, 360, 140, 380);
  line(230, 360, 260, 380);

  
  fill("rgba(232, 230, 129, 1)");
  //circle(300, 30, 50);

  //ellipse(mouseX, mouseY, mouseX*0.25, mouseY*0.25);



  //arc(width/2,50,50,50,radians(45),radians(300), PIE);



  console.log(mouseX/width + "" + mouseY/height);


}
