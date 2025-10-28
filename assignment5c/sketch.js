let yinqiCandyX;      // 糖果当前位置 X
let yinqiCandyY;      // 糖果当前位置 Y
let yinqiTargetX;     // 目标位置 X
let yinqiTargetY;     // 目标位置 Y
let yinqiSpeed = 0.02; // lerp 插值速度

function setup() {
  createCanvas(400, 400);
  noStroke();
  rectMode(CENTER);

  // 初始位置
  yinqiCandyX = random(width);
  yinqiCandyY = random(height);

  // 随机目标点
  yinqiTargetX = random(width);
  yinqiTargetY = random(height);
}

function draw() {
  background(255, 220, 235);

  // 用 lerp 平滑移动
  yinqiCandyX = lerp(yinqiCandyX, yinqiTargetX, yinqiSpeed);
  yinqiCandyY = lerp(yinqiCandyY, yinqiTargetY, yinqiSpeed);

  // 绘制糖果主体
  push();
  translate(yinqiCandyX, yinqiCandyY);

  // 糖果旋转一点点（轻微摆动）
  rotate(sin(frameCount * 0.05) * 0.1);

  // === 两边包装纸 ===
  fill(255, 160, 180);
  triangle(-50, 0, -70, -20, -70, 20); // 左边
  triangle(50, 0, 70, -20, 70, 20);   // 右边

  // === 糖果主体 ===
  fill(255, 180, 200);
  ellipse(0, 0, 100, 60);

  // === 中心白圈 ===
  fill(255);
  ellipse(0, 0, 30, 30);

  pop();

  // 当糖果接近目标点时，换新的随机目标
  if (dist(yinqiCandyX, yinqiCandyY, yinqiTargetX, yinqiTargetY) < 1) {
    yinqiTargetX = random(width);
    yinqiTargetY = random(height);
  }
}
