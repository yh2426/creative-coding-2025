

function setup() { // runs once at the start
  createCanvas(windowWidth, windowHeight);
  // createCanvas is a function
  // that creates a canvas for our p5.js sketch
  // to draw into, it takes two parameters,
  // width and height, windoWidth and windowHeight
  // are used to set the size to the full size
  // of our browser window. 
  background(212,211,0)
  }

function draw() { // runs in a loop after setup
  circle(100,200,25);
  // circle takes these parameters;
  // x position, y position, diameter


  rect(150, 200, 25);
  // rect takes these parameters:
  // (x, y, w)

  triangle(200, 200, 180, 250, 250, 250);
  // (triangle takes these parameter)
  // (x1, y1, x2, y2, x3, y3)

}
