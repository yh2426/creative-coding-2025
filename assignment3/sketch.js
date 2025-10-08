

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
}

function draw() {
  background("rgba(94, 94, 94, 1)");//background clold
  //show current mouse coordinates
  text(mouseX + "," + mouseY, 5, 15); 

  //Tube
  
  let tubewidth = width*0.1;//let the tube width change based on the screen width.
  let tubeheight = height/4;
  let tubex = width/2-tubewidth/2
  let tubey = height/2.5-tubeheight/2;
  let ballsize = tubewidth*3;
  //contaner
  //  梯形底座（替代圆圈）
  noStroke();
  fill("rgba(51, 113, 228, 1)");

  let traptop = tubey + tubeheight; // 梯形上边Y（接管子底）
  let trapheight = tubeheight*0.5; // 梯形高度
  let trapbottom = traptop + trapheight; // 梯形底边Y
  let trapleftx = tubex - tubewidth;// 左下角X
  let traprightx = tubex + tubewidth + tubewidth;  // 右下角X

  beginShape();
  vertex(tubex, traptop);             // 左上角（管子左边）
  vertex(tubex + tubewidth, traptop); // 右上角（管子右边）
  vertex(traprightx, trapbottom);     // 右下角
  vertex(trapleftx, trapbottom);      // 左下角
  endShape(CLOSE);

  
  fill(255);
  rect(tubex,tubey,tubewidth,tubeheight); 
  
  let bottomY = tubey + tubeheight; 


  //minbar

  let m = minute();
  let minbarwidth = tubewidth;
  let minheight = map(m, 0, 59, 0, tubeheight);
  let minbarX = tubex; 
  let minbarY = bottomY - minheight;

  fill("rgba(51, 113, 228, 1)");
  rect(minbarX, minbarY, minbarwidth, minheight);

// 💧 秒 - 改成水珠
  let s = second();

// Y 位置根据秒从上到下移动
  let dropY = map(s, 0, 59, tubey, bottomY);

// 水珠X在量杯内部中间
  let dropX = tubex + tubewidth/2;

// 画水珠
  noStroke();
  fill("rgba(113, 197, 245, 1)");
  ellipse(dropX, dropY, tubewidth/5); // 水珠大小为量杯宽度的 1/5


  stroke(255);
  strokeWeight(1);
  fill(255);
  textSize(14);


  push();
 
  for (let i = 0; i <= 60; i += 10) {
    let mintexty = map(i, 0, 59, bottomY, tubey);
    let sectexty = map(i, 0, 59, tubey, bottomY);

    // 左边
    textAlign(RIGHT);
    fill(255);
    text(i, tubex - 30, sectexty + 5);
    line(tubex - 20, sectexty, tubex - 5, sectexty);

    // 右边mintext
    textAlign(LEFT);
    text(i, tubex + tubewidth + 30, mintexty + 5);
    line(tubex + tubewidth + 5, mintexty, tubex + tubewidth + 20, mintexty);

  }
  pop();
  
// 💧 小时代表的水珠
  let h = hour(); // 获取当前小时
  let dropCount = h; // 最多12颗

// 固定随机种子，让同一个小时内水珠位置不会闪动
  randomSeed(h);
  noStroke();

// 在底部圆圈范围内随机生成水珠
  for (let i = 0; i < dropCount; i++) {
    let x = random(tubex - tubewidth*0.3, tubex + tubewidth+tubewidth*0.3); // 随机x位置（瓶子宽度范围）
    let y = random(bottomY+tubeheight*0.3, bottomY + tubeheight*0.4); // 随机y位置（瓶底圆圈范围）
    fill("rgba(113, 197, 245, 1)");
    ellipse(x, y, tubewidth/5); // 水珠大小
  }
}
 

   
