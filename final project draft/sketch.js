let handPose;
let video;
let hands = [];
let heartColors = [];



let heartbeat;
// Load the handPose model
function preload() {
  handPose = ml5.handPose();
  heartbeat = loadSound('heartbeat.wav');
}

function setup() {
  // Create the webcam video and hide it
  createCanvas(windowWidth,windowHeight);
  video = createCapture(VIDEO);
  video.size(windowWidth,windowHeight);
  video.hide();
  // start detecting hands from the webcam video
  handPose.detectStart(video, gotHands);
  for (let i = 0; i < 2; i++) {
  heartColors[i] = color(random(255), random(255), random(255), 200);
  heartbeat.loop();

  }
}
function draw() {
  // Draw the webcam video
  background("rgba(255, 150, 180, 1)");
  drawUI(); 

  // 摄像头小图
let vw = 160;
let vh = 120;
let vx = width - vw - 10;
let vy = height - vh - 10;
 push();
 translate(width, 0);
 scale(-1, 1); // 水平翻转
 image(video, vx, vy, vw, vh)
 pop();

  //at least two hands
  if (hands.length >= 2) {

    let hand1 = hands[0];
    let hand2 = hands[1];

    let center1 = getHandCenter(hand1);
    let center2 = getHandCenter(hand2);

    if (center1 && center2) {

      // 计算两只手之间的距离
      let d = dist(center1.x, center1.y, center2.x, center2.y);

      // 心跳速度随距离变
      let speed = map(d, 50, 400, 2, 0.5);
      speed = constrain(speed, 0.5, 2);
      heartbeat.rate(speed);

      // get a big heart when two hands getting closer
      if (d < 100) {
        drawHeart(width / 2, height / 2, 120, color(255, 0, 0, 255));
        return; 
      }
    }
  }

  // Draw all the tracked hand points
  //for (let i = 0; i < hands.length; i++) {
   // let hand = hands[i];

    
   // for (let j = 0; j < hand.keypoints.length; j++) {
      //let keypoint = hand.keypoints[j];
      //fill(0, 255, 0);
     // noStroke();
     // let flippedX = width - keypoint.x;
//circle(flippedX, keypoint.y, 10);
    
   // }

 // draw heart based on thumbn and index
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];
    let thumb = hand.thumb_tip;
    let index = hand.index_finger_tip;

    if (thumb && index) {
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



// Callback function for when handPose outputs data
function gotHands(results) {
  
  hands = results;
}

function drawHeart(x, y, size, colorVal) {
  fill(colorVal);
  stroke(0);
  strokeWeight(2);
  beginShape();
  vertex(x, y); // center top point
  bezierVertex(x + size / 2, y - size, x + size, y, x, y + size * 0.8);
  bezierVertex(x - size, y, x - size / 2, y - size, x, y);
  endShape(CLOSE);
}

function getHandCenter(hand) {
  let thumb = hand.thumb_tip;
  let index = hand.index_finger_tip;
  if (thumb && index) {
    return {
      x: (thumb.x + index.x) / 2,
      y: (thumb.y + index.y) / 2
    };
  }
  return null;
}
function mousePressed() {//mouse click play sounds
  heartbeat.play();
}

function drawUI() {
  // 标题
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text("Heart Gesture Demo", width / 2, 40);

  // 说明文字
  textSize(18);
  fill(255, 230);
  text("Bring both hands together to create a big heart ❤️", width / 2, height - 40);
}

