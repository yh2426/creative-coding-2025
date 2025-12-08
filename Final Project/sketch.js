let handPose;
let video;
let hands = [];

let isGameActive = false; //game locked

function preload() {
  // Load the handPose model
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  // Create the webcam video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);


  // Add this if not already:
  hintX1 = width * 0.3;
  hintY1 = height * 0.5;
  hintX2 = width * 0.7;
  hintY2 = height * 0.5;
}

function draw() {
    background(200);

  // Draw webcam video
  // I noticed the webcam video is flipped by default, which feels confusing for players.
  // So I flipped the video horizontally, like a mirror, to make it easier to interact.
  // https://editor.p5js.org/enickles/sketches/rJ9j1sx0M I learnt based on this example
   push();  // Save current drawing settings
   translate(width, 0);    // Move origin to right edge
   scale(-1, 1); // Flip everything horizontally
   image(video, 0, 0, width, height);  // Now draw video flipped
   pop(); // Restore drawing settings

   if (!isGameActive) {
  // Draw green circles on each hand's index finger tip
  for (let i = 0; i < hands.length; i++) {
    let finger = hands[i].index_finger_tip;
    if (finger) {
      fill(0, 255, 0); // green
      noStroke();
      circle(finger.x, finger.y, 30);
    }
  }
}
   
  
  // Draw all keypoints


  // Draw the two gray heart targets
  drawHeart(hintX1, hintY1, 80, color(150));// Left gray heart
  drawHeart(hintX2, hintY2, 80, color(150));// Right gray heart

  // If less than 2 hands are detected, show a waiting message and stop here
  if (hands.length < 2) {
    fill(255, 255, 0);
    textSize(24);
    textAlign(CENTER);
    text("Detected " + hands.length + " hand(s), waiting for the other...", width / 2, height / 2);
    return; // the game exit earl, If fewer than 2 hands are detected.
    // I use return function to stop the draw() function for this frame.
    // Without this return, the game might try to keep going without dectecing two hands.
  }

  // Dectected two hands
  // check finger tips
  let hand1 = hands[0];//first hands
  let hand2 = hands[1];// second hands

  
  let finger1 = hand1.index_finger_tip;
  let finger2 = hand2.index_finger_tip;


  if (finger1 && finger2 && !isGameActive) { // Check if both index fingers exist and the game is not yet active

    // each finger has a position(x,y)
    // I calculate the distance from each finger to each heart 
    // this game is designed for two players, so each player uses one hand to touch one for the gray hearts
    // Becasue I don't know which player is tanding on which side, so I need to consider possible combinations, which hand 1 might be on the left or right also same as hand2.
    // So i need 4 distances
    let d1 = dist(finger1.x, finger1.y, hintX1, hintY1);
    let d2 = dist(finger2.x, finger2.y, hintX2, hintY2);
    let d3 = dist(finger1.x, finger1.y, hintX2, hintY2);
    let d4 = dist(finger2.x, finger2.y, hintX1, hintY1);

    if ((d1 < 150 && d2 < 150) || (d3 < 150 && d4 < 150)) { // After testing different values, 150 seems to be the most reliable distance.
// It allows the game to trigger easily, but still requires players to be close.
      isGameActive = true; //run the game
      print("Game started!");
    } else { // if hands are not close to the grey hears, show the message
      fill(255);
      textSize(20);
      textAlign(CENTER);
      text("Move both index fingers to the gray hearts to unlock", width / 2, height / 2 + 100);
    }
  }

  

  // If game is active, show next stage
  if (isGameActive) {
    fill(255);
    textAlign(CENTER);
    textSize(20);
    text(" Game is unlocked! You can continue the interaction...", width / 2, height - 30);
  }
}

// Callback function for when handPose outputs data
function gotHands(results) {
  // save the output to the hands variable
  hands = results;
}

function drawHeart(x, y, size, colorVal) {
  fill(colorVal);
  stroke(0);
  strokeWeight(2);
  beginShape();
  vertex(x, y);  // Top center point of heart
  //I Searched up online about some example of drawing heart and learnt about his function
  bezierVertex(x + size / 2, y - size, x + size, y, x, y + size * 0.8); // Right half of the heart
  bezierVertex(x - size, y, x - size / 2, y - size, x, y);// Left half of the heart
  endShape(CLOSE); // Finish the shape
}

