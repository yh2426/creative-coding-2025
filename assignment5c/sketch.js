// This sketch makes a candy smoothly move around the canvas using lerp().
// The candy moves from one random target position to another 


let yinqiCandyX;// Current X position of the candy
let yinqiCandyY;// Current Y position 
let yinqiTargetX;// Target X position
let yinqiTargetY;// Target Y position
let yinqiSpeed = 0.02;// Speed of lerp，larger = faster

function setup() {
  createCanvas(400, 400);
  noStroke();
  rectMode(CENTER);// Draw rectangles and triangles from the center

  // Initial positions
  // Start the candy at random place 
  yinqiCandyX = random(width);
  yinqiCandyY = random(height);

  // Pick an random target position
  yinqiTargetX = random(width);
  yinqiTargetY = random(height);
}

function draw() {
  background("rgba(255, 220, 235, 1)");// light pink background

  // Smove the candy toward the target using lerp()
  yinqiCandyX = lerp(yinqiCandyX, yinqiTargetX, yinqiSpeed);
  yinqiCandyY = lerp(yinqiCandyY, yinqiTargetY, yinqiSpeed);

  // Draw the candy
  push(); // Save the current coordinate 
  translate(yinqiCandyX, yinqiCandyY);// Move drawing origin to candy position


  // Candy wrapping on both sides
  // Two triangles represent the twisted ends of the wrapper.
  fill(255, 160, 180);//wrapper light pink color
  triangle(-50, 0, -70, -20, -70, 20); //Left
  triangle(50, 0, 70, -20, 70, 20);// Right

  // Main part of the Candy
  fill(255, 180, 200);
  ellipse(0, 0, 100, 60);

  pop();

  // dist() function measures the distance between the current and target positions.
  // If the candy is close enough < 1 pixel, choose a new random target
  if (dist(yinqiCandyX, yinqiCandyY, yinqiTargetX, yinqiTargetY) < 1) {
    yinqiTargetX = random(width);
    yinqiTargetY = random(height);
  }
}
