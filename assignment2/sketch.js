

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  
    background("rgba(255, 242, 169, 1)");//background is a soft yellow color
    //show current mouse coordinates
    text(mouseX + "," + mouseY, 5, 15); 

    // I tried to make the colors change based on mouse movement.
    // From most examples I checked online, using only one map() function 
    // is not very effective for dynamic colors.
    // Most sketches use the RGB color model (r, g, b), 
    // so I set up three different mapping functions for r, g, and b.
    // red (R) increases when mouse moves left and right
    // green (G) increases when mouse moves up and down
    // blue (B) decreases when mouse moves up and down
    let r = map(mouseX, 0, width, 0, 255); //red changes with mouse moving left and right
    let g = map(mouseY, 0, width, 0, 255); //green changes with mouse moving up-down
    let b = map(mouseY, 0, width, 255, 0);//blue changes inversely with mouse moving up-down
         
    
    //loops to create grid of shapes
    //start at 50, so the shape won't touch the edges
    //gap between each shapes is 80
    for (let y = 50; y < height-50; y += 80) {
    for (let x = 50; x < width-50; x += 80) {

    //rotation increases as we go down the screen
    //top rows no rotation, bottom rows a full 360° span.
    let rotation= map(y, 50, height-50, 0,2*PI);

    //amount of random displacement increases with mouseY
    //I've try many different number, and figure out that, 0.05 is the right number that suit my expetation. the number bigger, the shape shake faster, so, (0,0.05） control the the shaking
    //mouse near top more stable; mouse near bottom：more shake
    let randomamount = map(mouseY, 0, height, 0, 0.05);
    let randomx;
    let randomy;

    //this function learn from the week4a example
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
