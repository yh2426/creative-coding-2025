// This sketch creates a softly floating ghost using noise(), 
// sin(), and cos() functions.
// The motion logic is adapted from the "EyeBall" example (Week 8C),    
// In my version, I applied the same logic to move the whole ghost 
// smoothly across the canvas.

let yinqiGhostX = 200;// X position of the ghost (center point)
let yinqiGhostY = 200;// Y position of the ghost (center point)
let yinqiGhostNoiseT = 0; // Noise variable


function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);//
  noStroke();// remove outlines of the ghost
}

function draw() {
  background(0); // background black

  yinqiGhostNoiseT += 0.01;// By adding 0.01 each frame, theis will changes gradually,
// making the ghost’s movement smooth.

  //calculate ghost postion by using cos and sin function, learn this from week 8c.
  //8C is eyemoving, mine see the ghost as the whole eyes position.
  let yinqiGhostTheta = noise(yinqiGhostNoiseT) * 360;
  let yinqiGhostXRadius = noise(yinqiGhostNoiseT + 10) * 40; //x, the original function doesn't add 10, but I tried with some fill number by myself
  //I experimented with adding them and found the movement looks smoother and more natural.
  let yinqiGhostYRadius = noise(yinqiGhostNoiseT + 20) * 30; //y
  let yinqiGhostMoveX = cos(yinqiGhostTheta) * yinqiGhostXRadius;
  let yinqiGhostMoveY = sin(yinqiGhostTheta) * yinqiGhostYRadius;

  //ghost body, one ellipse, and one rect with round coner
  fill(255);// white color of the ghost
  ellipse(yinqiGhostX + yinqiGhostMoveX, yinqiGhostY + yinqiGhostMoveY, 100, 120);
  rect(yinqiGhostX - 50 + yinqiGhostMoveX, yinqiGhostY + yinqiGhostMoveY, 100, 80, 50);

  //ghost eyes
  //Two small black ellipses
  fill(0);
  ellipse(yinqiGhostX - 15 + yinqiGhostMoveX, yinqiGhostY + yinqiGhostMoveY - 20, 15, 20);
  ellipse(yinqiGhostX + 15 + yinqiGhostMoveX, yinqiGhostY + yinqiGhostMoveY - 20, 15, 20);

  //draw ghost mouth
  ellipse(yinqiGhostX + yinqiGhostMoveX, yinqiGhostY + yinqiGhostMoveY + 10, 20, 10);
}