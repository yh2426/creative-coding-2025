let handPose;
let video;
let hands = [];
let heartColors = [];

let hintX1, hintY1, hintX2, hintY2;

let isGameActive = false;




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
  hintX1 = width * 0.3;
  hintY1 = height * 0.5;
  hintX2 = width * 0.7;
  hintY2 = height * 0.5;
}


function draw() {
  // Draw the webcam video
  background("rgba(255, 150, 180, 1)");
   // video graphic 
let vw = 160;
let vh = 120;
let vx = width - vw - 10;
let vy = height - vh - 10;
 push();
 translate(width, 0);
 scale(-1, 1); // flip
 image(video, vx, vy, vw, vh)
 pop();

  drawUI(); 
  
  drawDistanceBar();

 if (!isGameActive) {
    
    // 1. 始终画出灰色的目标爱心
    drawHeart(hintX1, hintY1, 80, color(150, 150, 150, 100));
    drawHeart(hintX2, hintY2, 80, color(150, 150, 150, 100));

    // 2. ★ 关键修改：不管有几只手，都遍历画出绿点 ★
    // 这样一只手也能看到绿点，知道自己被识别了
    for (let i = 0; i < hands.length; i++) {
        let center = getHandCenter(hands[i]);
        if (center) {
            fill(0, 255, 0); // 绿色
            noStroke();
            circle(center.x, center.y, 30); // 画出绿点
        }
    }

    // 3. 判断是否满足解锁条件
    if (hands.length < 2) {
        // 如果手不够两只，提示用户
        fill(255, 255, 0); // 黄色提示
        textSize(24);
        textAlign(CENTER);
        text("已检测到 " + hands.length + " 只手，等待另一只手...", width/2, height/2 - 50);
    } else {
        // 如果有两只手（或更多），检查是否碰到了灰色爱心
        let hand1 = getHandCenter(hands[0]);
        let hand2 = getHandCenter(hands[1]);

        if (hand1 && hand2) {
            // 计算距离
            let d1 = dist(hand1.x, hand1.y, hintX1, hintY1);
            let d2 = dist(hand2.x, hand2.y, hintX2, hintY2);
            let d3 = dist(hand1.x, hand1.y, hintX2, hintY2);
            let d4 = dist(hand2.x, hand2.y, hintX1, hintY1);

            // 判定解锁
            if ((d1 < 150 && d2 < 150) || (d3 < 150 && d4 < 150)) {
                isGameActive = true; 
            }
        }
    }

    // 绘制底部固定提示
    fill(255);
    textAlign(CENTER);
    textSize(20);
    text("请移动绿点触碰灰色爱心解锁", width / 2, height / 2 + 100);
    
    return; // 没解锁就结束，不运行下面的游戏逻辑
  }

 

  //at least two hands
  if (hands.length >= 2) {

    let hand1 = hands[0];
    let hand2 = hands[1];

    let center1 = getHandCenter(hand1);
    let center2 = getHandCenter(hand2);

    if (center1 && center2) {

      // calculte two hands distance
      let d = dist(center1.x, center1.y, center2.x, center2.y);

      //showing distance
       fill(255);
    textSize(18);
    textAlign(CENTER, TOP);
    text("Distance: " + Math.round(d) + " px", width / 2, 110);

      // pace of heartbeat changed
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
      // ★ 修改了这一行：加上 "width - " 让坐标变镜像
      x: width - (thumb.x + index.x) / 2, 
      y: (thumb.y + index.y) / 2
    };
  }
  return null;
}

function mousePressed() {//mouse click play sounds
  heartbeat.play();
}

function drawUI() {
  // title
  textAlign(CENTER, CENTER);
  textSize(32);
  fill(255);
  text("Heart Gesture Demo", width / 2, 40);

  // instruction
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

  // 映射距离为进度百分比（越靠近，值越高）
  let progress = map(d,1200, 20, 0, 1);;
  progress = constrain(progress, 0, 1);

  // 设置进度条样式
  let barWidth = width * 0.6;
  let barHeight = 20;
  let barX = (width - barWidth) / 2;
  let barY = 80;

  // 背景条
  noStroke();
  fill(255, 100);
  rect(barX, barY, barWidth, barHeight, 10);

  // 进度条
 let fillColor;

if (progress >= 0.9) {
  fillColor = color(255, 0, 0);
} else {
  fillColor = color(0, 255, 180);
}

fill(fillColor);
rect(barX, barY, barWidth * progress, barHeight, 10);
}





