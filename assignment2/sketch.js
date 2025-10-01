

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  
    background("rgba(255, 242, 169, 1)");//background is a soft yellow color
    //show current mouse coordinates
    text(mouseX + "," + mouseY, 5, 15); 

    // RGB values controlled by mouse position
    let r = map(mouseX,0,width,0,255); //red changes 
    let g = map(mouseY, 0, width, 0, 255); //green changes
    let b = map(mouseY, 0, width, 255, 0);// blue changes
         
    
    //loops to create grid of shapes
    for (let y = 50; y < height-50; y += 80) {
    for (let x = 50; x < width-50; x += 80) {

    // rotation increases gradually down the Y axis
    let rotation= map(y,50,height-50,0,2*PI);

    // amount of random displacement increases with mouseY
    let randomamount = map(mouseY, 0, height, 0, 0.05);
    let randomx;
    let randomy;

    randomx = (random(-y*randomamount,y*randomamount));
    randomy = (random(-y*randomamount,y*randomamount));
    
    push();

    fill(r,g,b); //set fill color from mapped mouse position
    translate(x, y); //move to grid position
    rotate(rotation); // rotate according to y-axis mapping

    if (mouseIsPressed) {  // when mouse is pressed , draw triangle with random offset

      
      translate(randomx,randomy);
      
      triangle(0, -30, -26, 15, 26, 15);
    } else {  // when mouse is not pressed, draw circle
      
      ellipse(0, 0, 60);
      }

      pop();
        }
  }
}
