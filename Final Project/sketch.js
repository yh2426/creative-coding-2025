  let handPose;
  let video;
  let hands = [];
  let heartbeat;

  let isGameActive = false; //game locked

  let hintX1, hintY1, hintX2, hintY2;

  let leftHeartTouched = false;
  let rightHeartTouched = false;

  let heartColors = []; // One color per hand

  let isFinalHeartShown = false; // If true, stop drawing individual hearts and show one big red heart

  let showRestartText = false; // I use this to show restart message after final heart


  function preload() {
    // Load the handPose model
    handPose = ml5.handPose();
    heartbeat = loadSound("heartbeat.mp3");
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    // Create the webcam video and hide it
    video = createCapture(VIDEO);
    video.size(windowWidth, windowHeight);
    video.hide();
    // start detecting hands from the webcam video
    handPose.detectStart(video, gotHands);

    heartbeat.loop();

    // Add this if not already:
    hintX1 = width * 0.3;
    hintY1 = height * 0.5;
    hintX2 = width * 0.7;
    hintY2 = height * 0.5;

    for (let i = 0; i < 2; i++) {//heart color, random color
    heartColors[i] = color(random(255), random(255), random(255), 200);
  }
  }

  function draw() {
    background("rgba(255, 200, 220, 1)"); // light pink

    // Draw webcam video
    // I noticed the webcam video is flipped by default, which feels confusing for players.
    // So I flipped the video horizontally, like a mirror, to make it easier to interact.
    // https://editor.p5js.org/enickles/sketches/rJ9j1sx0M I learnt based on this example
    push();  // Save current drawing settings
    translate(width, 0);// Move origin to right edge
    scale(-1, 1); // Flip everything horizontally
    pop(); // Restore drawing settings
    

    // If big red heart is already shown, stop drawing small hearts
    if (isFinalHeartShown) {
      drawHeart(width / 2, height / 2, 120, color(255, 0, 0)); // Draw one big red heart in center
      // show text after the heart is formed
      // Restart instruction
      textSize(24);
      fill("rgba(255, 255, 255, 0.8)");
      text("Click to Restart", width / 2, height / 2 + 80);
      
      showRestartText = true; // I allow restart when clicked
      return; // Stop the rest of the draw() function
    }

    if (!isGameActive) {
    // Draw the two gray heart targets
    drawHeart(hintX1, hintY1, 80, color(150));// Left gray heart
    fill("rgba(255, 255, 255, 1)");
    textSize(20);
    textAlign(CENTER);
    text("Touch the hearts to unlock the game", width / 2, height / 2 + 100);
    drawHeart(hintX2, hintY2, 80, color(150));// Right gray heart

    // Draw green circles on each hand's index finger tip
    for (let i = 0; i < hands.length; i++) {
    let finger = hands[i].index_finger_tip;
    if (finger) {
      let mirroredX = width - finger.x; // Mirror X to match flipped video
      //https://editor.p5js.org/cs6240/sketches/0Z1Ao2t_Z this is the example of 
      // teaching how to flip hands pose position
      fill("rgba(0, 255, 34, 1)"); // Green circle
      noStroke();
      circle(mirroredX, finger.y, 30);
    }
  }
    }
    // If less than 2 hands are detected, show a waiting message and stop here
    if (hands.length < 2) {
      fill("rgba(251, 251, 43, 1)");
      textSize(24);
      textAlign(CENTER);
      text("Detected " + hands.length + " hand(s), waiting for the other...", width / 2, height / 2);
      return; // the game exit early, If fewer than 2 hands are detected.
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

      // Calculate distances from each finger to both heart targets
      let fx1 = width - finger1.x;
      let fx2 = width - finger2.x;

      let d1 = dist(fx1, finger1.y, hintX1, hintY1); // finger1 to heart1
      let d2 = dist(fx2, finger2.y, hintX2, hintY2); // finger2 to heart2
      let d3 = dist(fx1, finger1.y, hintX2, hintY2); // finger1 to heart2
      let d4 = dist(fx2, finger2.y, hintX1, hintY1); // finger2 to heart1

      if ((d1 < 80 && d2 < 80) || (d3 < 80 && d4 < 80)) {// After testing different values, 150 seems to be the most reliable distance.
      // It allows the game to trigger easily, but still requires players to be close.
        isGameActive = true; //run the game
        print("Game started!");
        heartbeat.play();//sound play when game start
      } 
    }

    // If game is active, show next stage
    if (isGameActive) {
      fill(255);
      textAlign(CENTER);
      textSize(20);
      text("Move your hands closer together...", width / 2, height - 30);
      // I give players a hint that they can pinch to change the heart color
      fill("rgba(251, 251, 43, 1)");
      text("Don't like this color? Pinch it!", width / 2, 100);
      if (hands.length >= 2) {
        let hand1 = hands[0];
        let hand2 = hands[1];
        let index1 = hand1.index_finger_tip;
        let index2 = hand2.index_finger_tip;

    if (index1 && index2) {
      let x1 = width - index1.x;
      let y1 = index1.y;
      let x2 = width - index2.x;
      let y2 = index2.y;

      let d = dist(x1, y1, x2, y2);
      // I use map function to convert the distance between two index fingers, which is d
      // I convert from a range of 200, 50 into a value between 0 and 1.
  
      let progress = map(d, 600, 50, 0, 1);
      // I use constrain to make sure the progress value stays between 0 and 1
      // even if the distance goes outside the range.
      progress = constrain(progress, 0, 1);

      drawBar(progress); // I draw the progress bar based on the calculated progress value.

      let speed = map(d, 600, 300, 0.5, 2); // Map the distance between hands to a playback speed (closer = faster)
      speed = constrain(speed, 0.5, 2);// Limit the playback rate between 0.5x and 2x
      heartbeat.rate(speed);// Set the heartbeat sound playback rate

      // if distance smaller than 100, stop drawing
      if (d < 100) {
        isFinalHeartShown = true; 
      }
    }
  }

    for (let i = 0; i < hands.length; i++) {
      let hand = hands[i];
      let index = hand.index_finger_tip;
      let thumb = hand.thumb_tip;

      if (index && thumb) { //I used the example of week 11 "hand pose part", 
      // to change the circle to heart drawing
        
        // Mirror X positions to match flipped video
        let thumbX = width - thumb.x; // 镜像 X 坐标
        let indexX = width - index.x;

        // Calculate the midpoint between index and thumb
        let centerX = (thumbX + indexX) / 2;
        let centerY = (thumb.y + index.y) / 2;
        
        // Calculate the pinch "distance" between finger and thumb
        let pinch = dist(thumbX, thumb.y, indexX, index.y);
        let size = pinch;

         // If fingers are pinching closely, change the color of this heart
    if (pinch < 30) {
      //random color change
      heartColors[i] = color(random(255), random(255), random(255), 200);
    }
    let colorVal = heartColors[i];
    drawHeart(centerX, centerY, size, colorVal);
      }  
    }    
  }  
} 

  // Callback function for when handPose outputs data
  function gotHands(results) {
    // save the output to the hands variable
    hands = results;
  }

  function drawHeart(x, y, size, colorVal) {
    fill(colorVal);
    strokeWeight(2);
    beginShape();
    vertex(x, y);  // Top center point of heart
    //I Searched up online about some example of drawing heart and learnt about his function
    bezierVertex(x + size / 2, y - size, x + size, y, x, y + size * 0.8); // Right half of the heart
    bezierVertex(x - size, y, x - size / 2, y - size, x, y);// Left half of the heart
    endShape(CLOSE); // Finish the shape
  }

  function drawBar(progress) {
    let barWidth = width * 0.6;// set the total width of the bar to 60% of the canvas width
    let barHeight = 20;
    let x = width / 2 - barWidth / 2; // make sure the bar is at the center
    let y = 30; // place the bar near the top of the screen

    noStroke();
    fill("rgba(100, 100, 100, 0.6)");// Gray background
    rect(x, y, barWidth, barHeight);

    fill("rgba(255, 0, 0, 1)");// Red progress bar
    rect(x, y, barWidth * progress, barHeight);

    fill("rgba(255, 255, 255, 1)");// White text
    textSize(14);
    textAlign(CENTER);
    text("Getting Closer...", width / 2, y - 10); // Show label above bar
  }

  function mousePressed() {
  // If final heart is shown, reset everything
  if (showRestartText) {
    isGameActive = false;
    isFinalHeartShown = false;
    showRestartText = false;

    // Stop the heartbeat sound
    if (heartbeat.isPlaying()) {
      heartbeat.stop();
    }

    // Re-randomize heart colors
    for (let i = 0; i < 2; i++) {
      heartColors[i] = color(random(255), random(255), random(255), 200);
    }
  }
}




