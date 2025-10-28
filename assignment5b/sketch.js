let yinqiPumpkinX = 200;
let yinqiPumpkinY = 220;
let yinqiPumpkinTime = 0;    // 自增时间

let yinqiLine1X = 150;
let yinqiLine2X = 200;
let yinqiLine3X = 250;

function setup() {
  createCanvas(400, 400);
  
}

function draw() {
  background(0);//background color black

  fill("rgba(254, 139, 97, 1)");
  ellipse(yinqiPumpkinX, yinqiPumpkinY, 180, 150);
  //draw eyes on pumpkin

  let yinqiEyeHeight = 20 + sin(yinqiPumpkinTime)*10;
  yinqiPumpkinTime += 0.05;

  fill(0);
  ellipse(yinqiPumpkinX - 40, yinqiPumpkinY - 10, 30, yinqiEyeHeight);//left eye
  ellipse(yinqiPumpkinX + 40, yinqiPumpkinY - 10, 30, yinqiEyeHeight);//right eye

  rect(yinqiPumpkinX - 30, yinqiPumpkinY + 30, 60, 15);//mouth

 stroke("rgba(249, 117, 29, 1)");
  strokeWeight(4);
  line(yinqiLine1X, 150, yinqiLine1X, 280);
  line(yinqiLine2X, 140, yinqiLine2X, 300);
  line(yinqiLine3X, 150, yinqiLine3X, 280);
  noStroke();


}
