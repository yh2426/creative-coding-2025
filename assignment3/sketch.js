
//This project is about Time as Water in a Measuring tube
//so the tube and the trapezoid represent the mesuring tube
//This clock is inspired by the memory of high school science experiments 
//when liqluid was carefully poured into a measuring cup to observe changes.
//time itself becomes that liquid.
//second(): controls a single droplet that falls down
//minute(): controls the rising blue bar, representing the gradual filling of the tube.
//hour(): adds small drops resting in the trapezoid base, representing time that has settled — the past hours.
//I am still considering whether to include 24 drops in total or just 12, representing AM and PM.
//Maybe changing the background color to reflect day and night and add some graph
//Also I am thinking of adding a faucet on top and a flame at the bottom. 
// The faucet would show time flowing in; the flame shows time being consumed. I am sill try to fingure out how to draw it.

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
}

function draw() {
  background("rgba(94, 94, 94, 1)");//background clold
  //show current mouse coordinates
  text(mouseX + "," + mouseY, 5, 15); 

  //draw Tube 
  
  let tubewidth = width*0.1;//let the tube width change based on the screen width.
  let tubeheight = height/4;//tube height change based on the screen height
  let tubex = width/2-tubewidth/2//tubex coordinate
  let tubey = height/2.5-tubeheight/2;//tube y
  fill(255);
  rect(tubex,tubey,tubewidth,tubeheight); 
  let bottomY = tubey + tubeheight; 
 
  //trap

  noStroke();
  fill("rgba(51, 113, 228, 1)");//color

  let traptop = tubey + tubeheight; //traptop top height starting point
  let trapheight = tubeheight*0.5; // trap height based on the tubehight. 
  let trapbottom = traptop + trapheight; // trap bottom coordinate
  let trapleftx = tubex - tubewidth;// trap bottom left point
  let traprightx = tubex + tubewidth + tubewidth;  // trap bottom right point

  beginShape();
  vertex(tubex, traptop);             // topleft
  vertex(tubex + tubewidth, traptop); // topright
  vertex(traprightx, trapbottom);     // bottomright
  vertex(trapleftx, trapbottom);      // bottomleft
  endShape(CLOSE);

  

  //minbar, represent minute

  let m = minute();
  let minbarwidth = tubewidth;
  let minheight = map(m, 0, 59, 0, tubeheight);//strat from 0 to 59.
  let minbarX = tubex; 
  let minbarY = bottomY - minheight;//start from the bottom minues the height, so the water will increase

  fill("rgba(51, 113, 228, 1)");
  rect(minbarX, minbarY, minbarwidth, minheight);

  //drop
  let s = second();

  // y coordinate from top to bottom
  let dropY = map(s, 0, 59, tubey, bottomY);

  // drop should be inside the tube
  let dropX = tubex + tubewidth/2;

  //drop
  noStroke();
  fill("rgba(113, 197, 245, 1)");
  ellipse(dropX, dropY, tubewidth/5); // the size of the drop is 1/5 size of the tube width



  stroke(255);
  strokeWeight(1);
  fill(255);
  textSize(14);


  push();
 
  for (let i = 0; i <= 60; i += 10) {
    let mintexty = map(i, 0, 59, bottomY, tubey);//from bottom to top
    let sectexty = map(i, 0, 59, tubey, bottomY);//from top to bottom

    //left side text
    textAlign(RIGHT);
    fill(255);
    text(i, tubex - 30, sectexty + 5);
    line(tubex - 20, sectexty, tubex - 5, sectexty);

    //right side text
    textAlign(LEFT);
    text(i, tubex + tubewidth + 30, mintexty + 5);
    line(tubex + tubewidth + 5, mintexty, tubex + tubewidth + 20, mintexty);

  }
  pop();
  
// drops represent hour
  let h = hour(); //current hour
  let dropCount = h; 

// 
  randomSeed(h);//fixes the random sequence so that the drop will remain in the same position
  noStroke();

// random drop
  for (let i = 0; i < dropCount; i++) {
    let x = random(tubex - tubewidth*0.3, tubex + tubewidth+tubewidth*0.3); // inside the trapl width
    let y = random(bottomY+tubeheight*0.3, bottomY + tubeheight*0.4); // inside the trap height
    fill("rgba(113, 197, 245, 1)");
    ellipse(x, y, tubewidth/5);
  }
}
 

   
