let handPose;
let video;
let hands = [];
let heartColors = [];

function preload() {
  handPose = ml5.handPose();
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  handPose.detectStart(video, gotHands);
  for (let i = 0; i < 2; i++) {
  heartColors[i] = color(random(255), random(255), random(255), 200);
  }
}

function draw() {
  background("rgba(255, 150, 180, 1)");

  // 摄像头小图
  let vw = 160;
  let vh = 120;
  image(video, width - vw - 10, height - vh - 10, vw, vh);

  // 遍历所有手部
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    // ✅ 绘制关键点
    for (let j = 0; j < hand.keypoints.length; j++) {
      let keypoint = hand.keypoints[j];
      fill(0, 255, 0);
      noStroke();
      circle(keypoint.x, keypoint.y, 10);
    }

    // 获取拇指与食指
    let thumb = hand.thumb_tip;
    let index = hand.index_finger_tip;

    if (thumb && index) {
      // 计算中点与距离
      let centerX = (thumb.x + index.x) / 2;
      let centerY = (thumb.y + index.y) / 2;
      let pinch = dist(thumb.x, thumb.y, index.x, index.y);
      let size = pinch / 2;

      let colorVal = heartColors[i];

      drawHeart(centerX, centerY, size, colorVal);

    }
  }
}

// 处理手势识别结果
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


