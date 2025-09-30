

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  
    background("rgba(255, 242, 169, 1)");
    text(mouseX + "," + mouseY, 5, 15); 
    let r = map(mouseX,0,width,0,255); 
    let g = map(mouseY, 0, width, 0, 255); 
    let b = map(mouseY, 0, width, 255, 0);    
         
    

    for (let y = 50; y < height-50; y += 80) {
    for (let x = 50; x < width-50; x += 80) {
    let rotation= map(y,50,height-50,0,2*PI);
    let randomamount = map(mouseY, 0, height, 0, 0.05);
    let randomx;
    let randomy;

    randomx = (random(-y*randomamount,y*randomamount));
    randomy = (random(-y*randomamount,y*randomamount));
    
    push();
    fill(r,g,b)
    translate(x, y);
    rotate(rotation);

    if (mouseIsPressed) {
      translate(randomx,randomy);
      
      triangle(0, -30, -26, 15, 26, 15);
    } else {
      
      ellipse(0, 0, 60);
      }

      pop();
        }
  }
}
