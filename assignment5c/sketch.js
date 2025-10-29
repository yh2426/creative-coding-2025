// This sketch makes a candy move around the canvas using the lerp() function.
// The candy moves from one random target position to another every second.

let yinqiCandyX;// Current X position of the candy
let yinqiCandyY;// Current Y position 

//Target position where the candy is moving towards
let yinqiTargetX;// Target X position
let yinqiTargetY;// Target Y position
let yinqiSpeed = 0.02;// Speed of lerp，larger = faster

let yinqiLerpAmt = 0;// Progress from 0 to 1
let yinqiPrevSecond = 0;// used to detect when a new second begins
let yinqiStartX;// Starting X
let yinqiStartY;// Starting Y


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
  push();// Save the current coordinate 

  // Candy wrapping on both sides
  // Two triangles represent the twisted ends of the wrapper.
  fill("rgba(255, 160, 180, 1)");//wrapper light pink color
  triangle(yinqiCandyX - 50, yinqiCandyY,yinqiCandyX - 70, yinqiCandyY - 20, yinqiCandyX - 70, yinqiCandyY + 20); //Left
  triangle(yinqiCandyX + 50, yinqiCandyY,yinqiCandyX + 70, yinqiCandyY - 20, yinqiCandyX + 70, yinqiCandyY + 20);// Right

  // Main part of the Candy
  fill("rgba(255, 180, 200, 1)");
  ellipse(yinqiCandyX, yinqiCandyY, 100, 60);
  pop();

  // Update lerp amount
  yinqiLerpAmt += yinqiSpeed;//this controls how fast can reach the target
  yinqiLerpAmt = constrain(yinqiLerpAmt, 0, 1);// constrain is a function that keeps a value between a certain range
   
  // I learn this from week 6 example
  // The second() function gives the current second (0–59)
  if (yinqiPrevSecond != second()) {
    yinqiPrevSecond = second();
    //Set new target
    yinqiStartX = yinqiCandyX;
    yinqiStartY = yinqiCandyY;
    yinqiTargetX = random(width);
    yinqiTargetY = random(height);

    yinqiLerpAmt = 0; //Restart
  }
}
