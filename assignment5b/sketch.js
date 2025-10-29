//This sketch creates a pumpkin whose eyeballs rotate smoothly inside the eye sockets.
// It uses sin() and cos() to calculate motion for each eye.



let yinqiPumpkinX = 200;// Pumpkin center X position
let yinqiPumpkinY = 220;// Pumpkin center Y position
let yinqiPumpkinTime = 0;// Time variable

function setup() {
  createCanvas(400, 400);
  
}

function draw() {
  background(0);// Background color black

  fill("rgba(254, 139, 97, 1)");// Orange color
  ellipse(yinqiPumpkinX, yinqiPumpkinY, 180, 150);// main pumpking body
  
  // Increase time gradually to make sin() and cos() change smoothly.
  // Each frame adds 0.05, so the eyeballs keep rotating
  yinqiPumpkinTime += 0.05;

// Eye center positions
// These are fixed centers, so the eyeballs will rotate around.
let yinqileftEyeX = yinqiPumpkinX - 40;// left eye center
let yinqirightEyeX = yinqiPumpkinX + 40;// Right eye center
let yinqieyeBaseY = yinqiPumpkinY - 10;// Y position of the eyes

// This controls how far the eyeball can move
// Larger radius = faster movement.
let eyeMoveRadius = 6;

// Calculate eyeball position inside socket using sin() and cos()
let yinqieyeMoveX = cos(yinqiPumpkinTime) * eyeMoveRadius;
let yinqieyeMoveY = sin(yinqiPumpkinTime) * eyeMoveRadius;

// Draw eye sockets
fill(255); // white eye background
ellipse(yinqileftEyeX, yinqieyeBaseY, 35, 35);
ellipse(yinqirightEyeX, yinqieyeBaseY, 35, 35);

// Draw black eyeballs moving in circular motion
fill(0);
ellipse(yinqileftEyeX + yinqieyeMoveX, yinqieyeBaseY + yinqieyeMoveY, 15, 15);
ellipse(yinqirightEyeX + yinqieyeMoveX, yinqieyeBaseY + yinqieyeMoveY, 15, 15);
// draw mouth
rect(yinqiPumpkinX - 30, yinqiPumpkinY + 30, 60, 15);// mouth

 

}
