let yinqiGhostX = 200;
let yinqiGhostY = 200;
let yinqiGhostNoiseT = 0; // 控制角度的噪声时间
let yinqiGhostNoiseR = 50; // 控制半径的噪声范围

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES); // 角度模式（方便 0-360° 控制）
  noStroke();
}

function draw() {
  background(20, 24, 40);

  // 增加噪声时间
  yinqiGhostNoiseT += 0.01;

  // 用 noise 控制角度和半径
  let yinqiGhostTheta = noise(yinqiGhostNoiseT) * 360; // 角度 0~360°
  let yinqiGhostXRadius = noise(yinqiGhostNoiseT + 10) * 40; // X 半径范围
  let yinqiGhostYRadius = noise(yinqiGhostNoiseT + 20) * 30; // Y 半径范围

  // 计算幽灵的漂浮位置
  let yinqiGhostMoveX = cos(yinqiGhostTheta) * yinqiGhostXRadius;
  let yinqiGhostMoveY = sin(yinqiGhostTheta) * yinqiGhostYRadius;

  // === 幽灵身体 ===
  fill(255);
  ellipse(yinqiGhostX + yinqiGhostMoveX, yinqiGhostY + yinqiGhostMoveY, 100, 120);
  rect(yinqiGhostX - 50 + yinqiGhostMoveX, yinqiGhostY + yinqiGhostMoveY, 100, 80, 50);

  // === 幽灵眼睛 ===
  fill(0);
  ellipse(yinqiGhostX - 15 + yinqiGhostMoveX, yinqiGhostY + yinqiGhostMoveY - 20, 15, 20);
  ellipse(yinqiGhostX + 15 + yinqiGhostMoveX, yinqiGhostY + yinqiGhostMoveY - 20, 15, 20);

  // === 幽灵嘴巴 ===
  ellipse(yinqiGhostX + yinqiGhostMoveX, yinqiGhostY + yinqiGhostMoveY + 10, 20, 10);
}