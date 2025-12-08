
// Global Variables

let handPose;
let video;
let hands = [];
let heartColors = [];

// Coordinates for the unlock targets (Gray Hearts)
let hintX1, hintY1, hintX2, hintY2;

// Game State (Locked vs Unlocked)
let isGameActive = false;

let heartbeat;

// Setup & Preload
function preload() {
  handPose = ml5.handPose();
  heartbeat = loadSound('heartbeat.wav');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Webcam setup
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();
  
  // Start detection
  handPose.detectStart(video, gotHands);
  
  // Initialize colors
  for (let i = 0; i < 2; i++) {
    heartColors[i] = color(random(255), random(255), random(255), 200);
  }

  // Play sound (Moved out of loop to avoid double triggering)
  heartbeat.loop(); 

  // Initialize hint positions
  hintX1 = width * 0.3;
  hintY1 = height * 0.5;
  hintX2 = width * 0.7;
  hintY2 = height * 0.5;
}


function draw() {
  background("rgba(255, 150, 180, 1)");

  // Draw Video (Small window at bottom-right)
  let vw = 160;
  let vh = 120;
  let vx = width - vw - 10;
  let vy = height - vh - 10;
  
  push();
  translate(width, 0);
  scale(-1, 1); // Mirror flip
  image(video, vx, vy, vw, vh);
  pop();

  // Draw UI 
  drawUI(); 
  drawDistanceBar();

  // Check if game is activ
  if (!isGameActive) {
    // Draw target gray hearts
    drawHeart(hintX1, hintY1, 80, color(150, 150, 150, 100));
    drawHeart(hintX2, hintY2, 80, color(150, 150, 150, 100));

    // Draw green dots for ANY detected hand (Single or Both)
    for (let i = 0; i < hands.length; i++) {
        let center = getHandCenter(hands[i]);
        if (center) {
            fill(0, 255, 0); // Green
            noStroke();
            circle(center.x, center.y, 30); 
        }
    }

    // Check unlock conditions
    if (hands.length < 2) {
        // Text: Waiting for second hand
        fill(255, 255, 0);
        textSize(24);
        textAlign(CENTER);
        text("Detected " + hands.length + " hand(s), waiting for the other...", width/2, height/2 - 50);
    } else {
        // Text:  check positions
        let hand1 = getHandCenter(hands[0]);
        let hand2 = getHandCenter(hands[1]);

        if (hand1 && hand2) {
            // Calculate distances to targets
            let d1 = dist(hand1.x, hand1.y, hintX1, hintY1);
            let d2 = dist(hand2.x, hand2.y, hintX2, hintY2);
            let d3 = dist(hand1.x, hand1.y, hintX2, hintY2);
            let d4 = dist(hand2.x, hand2.y, hintX1, hintY1);

            // Unlock if close enough
            if ((d1 < 150 && d2 < 150) || (d3 < 150 && d4 < 150)) {
                isGameActive = true; 
            }
        }
    }

    // Instruction text
    fill(255);
    textAlign(CENTER);
    textSize(20);
    text("Move green dots to the gray hearts to unlock", width / 2, height / 2 + 100);
    
    // Stop here if locked
    return; 
  }

  
  
  // two hands interaction (Sound & Center Heart)
  if (hands.length >= 2) {
    let hand1 = hands[0];
    let hand2 = hands[1];
    let center1 = getHandCenter(hand1);
    let center2 = getHandCenter(hand2);

    if (center1 && center2) {
      // Calculate distance between hands
      let d = dist(center1.x, center1.y, center2.x, center2.y);

      // Display distance text
      fill(255);
      textSize(18);
      textAlign(CENTER, TOP);
      text("Distance: " + Math.round(d) + " px", width / 2, 110);

      // Adjust heartbeat speed based on distance
      let speed = map(d, 50, 400, 2, 0.5);
      speed = constrain(speed, 0.5, 2);
      heartbeat.rate(speed);

      // Draw big center heart if hands are close
      if (d < 100) {
        drawHeart(width / 2, height / 2, 120, color(255, 0, 0, 255));
        return; // Skip drawing finger hearts if big heart is shown
      }
    }
  }

  // Draw hearts on individual fingers (Pinch gesture)
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let thumb = hand.thumb_tip;
    let index = hand.index_finger_tip;

    if (thumb && index) {
      // Calculate mirrored coordinates
      let thumbX = width - thumb.x;
      let indexX = width - index.x;

      let centerX = (thumbX + indexX) / 2;
      let centerY = (thumb.y + index.y) / 2;
      let pinch = dist(thumbX, thumb.y, indexX, index.y);
      let size = pinch / 2;

      let colorVal = heartColors[i];
      drawHeart(centerX, centerY, size, colorVal);
    }
  }
}

function gotHands(results) {
  hands = results;
}

// Draw a heart shape
function drawHeart(x, y, size, colorVal) {
  fill(colorVal);
  stroke(0);
  strokeWeight(2);
  beginShape();
  vertex(x, y); 
  bezierVertex(x + size / 2, y - size, x + size, y, x, y + size * 0.8);
  bezierVertex(x - size, y, x - size / 2, y - size, x, y);
  endShape(CLOSE);
}

// Calculate hand center with mirroring， (width - x)
function getHandCenter(hand) {
  let index = hand.index_finger_tip;

  if (index) {
    let x = width - index.x;   // mirror x
    let y = index.y;

    return new Point(x, y);
  }

  return null;
}


// audio playes when click
function mousePressed() {
  heartbeat.play();
}

function drawUI() {
  // Title
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text("Heart Gesture Demo", width / 2, 40);

  // Bottom instruction
  textSize(18);
  fill(255, 230);
  text("Bring both hands together to create a big heart ❤️", width / 2, height - 40);
}

function drawDistanceBar() {
  if (hands.length < 2) return;

  let center1 = getHandCenter(hands[0]);
  let center2 = getHandCenter(hands[1]);

  if (!center1 || !center2) return;

  let d = dist(center1.x, center1.y, center2.x, center2.y);

  // Map distance to progress bar
  let progress = map(d, 1200, 20, 0, 1);
  progress = constrain(progress, 0, 1);

  // Bar styles
  let barWidth = width * 0.6;
  let barHeight = 20;
  let barX = (width - barWidth) / 2;
  let barY = 80;

  // Background
  noStroke();
  fill(255, 100);
  rect(barX, barY, barWidth, barHeight, 10);

  // Progress fill
  let fillColor;
  if (progress >= 0.9) {
    fillColor = color(255, 0, 0);
  } else {
    fillColor = color(0, 255, 180);
  }

  fill(fillColor);
  rect(barX, barY, barWidth * progress, barHeight, 10);
}
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}