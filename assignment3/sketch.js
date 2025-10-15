
//This project is about Time as Water in a Measuring tube
//so the tube and the trapezoid represent the mesuring tube
//This clock is inspired by the memory of high school science experiments 
//when liqluid was carefully poured into a measuring cup to observe changes.
//time itself becomes that liquid.

//I want to show that time passes quickly, like boiling water.
//The whole image is designed as a metaphor:
//The falling droplet represents seconds， time constantly dripping down.
//The rising blue water level represents minutes，time gradually filling up.
//The drops resting in the base represent hours，time that has already passed.
//The faucet at the top suggests time flowing in,
//while the flame at the bottom symbolizes time being consumed.



function setup() {
  createCanvas(windowWidth, windowHeight);//canva size
  
  
}

function draw() {

// I want the background color to change between day and night.
// If it’s before 12 PM, I use a light blue tone to show daytime.
// After 12 PM, it turns into a darker blue to show nighttime.

let h = hour();//represents hour(), current hour

// Morning before 12pm light blue
if (h < 12) {
  background("rgba(75, 211, 252, 1)"); // light blue for morning
}
 else { //After 12pm, dark blue
  background("rgba(0, 8, 82, 1)"); //night
}
  
  //show current mouse coordinates
  text(mouseX + "," + mouseY, 5, 15); 
  

  //draw Tube 
  //This section draws the main white tube of the measuring device.
  //The tube size and position are responsive，they change according to the screen size
  //so that the composition always stays centered and proportional.
  
  let tubewidth = width*0.08;//let the tube width change based on the screen width，the tube's width is 8% of the total canvas width. I was trying to width/number but later found that multiplying by 0.08 was easier and getthe exact size I wanted.
  let tubeheight = height/4;//tube height change based on the screen height, /4 means the current windows height/4 will get the tube height
  
  let tubex = width/2-tubewidth/2//tubex coordinate, tube top left coner's X coordinate. // I was trying to center the rectangle, so width/2 gives the center point of the screen. // But the whole rect appeared slightly to the right, so I subtracted half of the tube’s width.
  // This adjustment makes the tube perfectly centered on the canvas.
  let tubey = height/4;//tube's top left corner, y coordinate, /4 because I want to place it a bit higher, so I can have space to draw the rest part
  fill(255);//filled the bottle white
  rect(tubex,tubey,tubewidth,tubeheight); //Draws the tube as a rectangle. 
 
 
  //trap, the trapezoid base under the tube

  let bottomY = tubey + tubeheight;// The y-coordinate of the tube’s bottom, so I can know where to start when draw the bottom

  noStroke();//Stroke makes the tube looks alittle bit weired, so i make it no stroke
  fill("rgba(51, 113, 228, 1)");//light blue color, represent water. 

  //Define trapezoid geometry based on the tube’s position and size.

  let traptop = tubey + tubeheight; //traptop left top starting point, which will connect to the tube's bottom
  let trapheight = tubeheight*0.5; // trap height based on the tubehight. 
  let trapbottom = traptop + trapheight*2; //trap bottom coordinate,  top y coordinate + the height will get the bottom point
  let trapleftx = tubex - tubewidth*1.5;// trap bottom left X coordinate. So the bottom left point will be on the left side  of the tube. tubewidth*1.5, will change it base on the tube size
  //*1.5 I test it, and I satisfied with the size
  let traprightx = tubex + tubewidth + tubewidth*1.5;  //trap bottom right point, tubex+tubewidth, will move the point to the right than plus the same length as bottom left point tubethwidth*1.5
  //this two element mush be the same, so will become trapezoid. 

  //Draw the trapezoid shape.

  beginShape();
  vertex(tubex, traptop);            //topleft coner
  vertex(tubex + tubewidth, traptop);//topright coner
  vertex(traprightx, trapbottom);    //bottomright coner
  vertex(trapleftx, trapbottom);     //bottomleft coner
  endShape(CLOSE);

  

  //minbar, represent minute
  //The blue bar inside the tube represents minutes.
  //I want the water rising per minute start at the bottom of the tube.
  let m = minute(); //minute() to get the current value from 0 to 59.
  let minbarwidth = tubewidth; //I rename it so I won't messed up the number, I make the bar the same width as the tube so won't exceed the width of the tube
  let minheight = map(m, 0, 59, 0, tubeheight);//start from 0 to 59.
  //The minute value m goes from 0 to 59, and I map it to start to 0, so when minutes =0, the height is 0;
  //when the minute reaches 59, which means also reaches to the top of the tube. 

  let minbarX = tubex;//The bar’s x position is the same as the tube’s left point.
  let minbarY = bottomY - minheight;//minues the height, will start at the bottom instead of the top. 

  fill("rgba(51, 113, 228, 1)");//fill with the same bottom trap color, so looks like they are the same type of the water, won't feel weired. 
  rect(minbarX, minbarY, minbarwidth, minheight);//draws with the rect, so will fully cover the tube. Looks like water rising. 

  //drop
  //The falling droplet represents seconds.
  let s = second();

  //y coordinate from top to bottom
  //When the second is 0, the drop starts at the top of the tube.
  //When the second reaches 59, it falls down to the bottom.
  let dropY = map(s, 0, 59, tubey, bottomY);

  //drop should be inside the tube, and i want the droplet stay in the cesnter of the tube. 
  let dropX = tubex + tubewidth/2;

  noStroke();  //remove the stroke to make the droplet smooth
  fill("rgba(113, 197, 245, 1)");
  ellipse(dropX, dropY, tubewidth/5); //the size of the drop is 1/5 size of the tube width
  //I tried to make it fixed size at first, but I found out sometimes is weired if the tube size is too big or too small
  

  //mesurement scale
  //I add white lines and numbers on both sides as reference time.
  //The left side decreases from top to bottom for seconds
  //and the right side increases from bottom to top for minutes
  stroke(255);//line color
  strokeWeight(1);//line stroke weight
  fill(255);//white color of number
  textSize(14);//size of number

  //draw text and line by using loop
  for (let i = 0; i <= 60; i += 10) {//i starts at 0, less than 60 which is seconds and minute maximum is 60. each gap is 10 seconds and minutes. 
    //Because sec is drop from top to bottom, and minute is bottom to top
    //So I can just switching the order of the elements in the map function.
    let mintexty = map(i, 0, 59, bottomY, tubey);//from bottom to top, minutes bar
    let sectexty = map(i, 0, 59, tubey, bottomY);//from top to bottom, seconds drop

    //left side scale
    text(i, tubex - 40, sectexty);//make sure the x of the text is on the right side of the tubeX, -40 so it doesn’t overlap the lines and tube
    line(tubex - 20, sectexty, tubex - 5, sectexty);//line scale

    //right side scale
    text(i, tubex + tubewidth + 30, mintexty);//start at tubex so needs to add tubewidth and +30 to make sure on the right side
    line(tubex + tubewidth + 5, mintexty, tubex + tubewidth + 20, mintexty);//line scale

  }
 

//Water drops for the hour
//At first, I tried to place the water drops randomly inside the bottle.
//However, it was difficult to resize them correctly and stayed inside the cup shape.
//Sometimes the drops also overlapped, and even after searching online, I couldn’t find a good way to fix that.
//Later, when I looked back at the week 5B example, I got a new idea:
//What if I maked the drops in a circle, with each hour represented by one drop.
//I think this will makes it clearer for the viewer to read and understand the time


if (h > 12) {//I found out that 24 drops is too much and in the bottle, so I decided make it to 12, not 24.
  h = h - 12; //For hours greater than or equal to 12, -12
}

let dropCount = h ;//The number of drops equals the current hour

 noStroke();
 fill("rgba(113, 197, 245, 1)"); //I use the same blue color sec() as the water to keep the visual theme consistent.

 //define the circle drops
 let centerX = tubex + tubewidth/2;//I place the circle in the middle of the trapezoid.
 let centerY = trapbottom - tubeheight/2;//place in the middle of the trapezoid horizontly
 let radius = tubewidth/2;//The distance from the center to each drop.
 let circleD = tubewidth/5;//Each drop’s size, 1/5 of the tubewith


 //I use a for loop to place each drop evenly around a circle. Learn from week5b example
 //divide 360 degrees by 12
 for(let i =0;i<dropCount; i++){
  let theta = i * (360 / 12); //each angle
  let x = centerX+ cos(radians(theta)) * radius;
  let y = centerY+ sin(radians(theta)) * radius;
  circle(x, y, circleD);//draw the circle of drops
 }

//fire at the bottom
//I want to draw three flames under the trapezoid 

noStroke();//remove stroke

let fireSpacing = tubewidth; //space between each flame
let fireStartX = tubex - tubewidth/2; //Starting X position for the first flame, left one

for (let i = 0; i < 3; i++) {//I draw three flames in total, so i < 3. I calculate the X position for each flame by starting from the left
  let firetopX = fireStartX + i * fireSpacing;//calculates the X position for each flame by starting from the left and adding spacing.
  let firetopY = trapbottom+random(0,5);//I want to make the fire move, so I think random will make the fire looks real
  // I use random(0,5) to slightly change the Y position every frame.
  // This makes the flames look like they are moving

  //Outer layer, orange flame
  fill("rgba(253, 173, 82, 1)");//orange color
  triangle(firetopX, firetopY + 20, firetopX - tubewidth/2, firetopY + trapheight, firetopX + tubewidth/2, firetopY + trapheight);

  //middle layer, yellow flame
  fill("rgba(252, 255, 97, 1)");//yellow color
  triangle(firetopX, firetopY + 40, firetopX - tubewidth/2 + 10, firetopY + trapheight, firetopX + tubewidth/2 - 10, firetopY + trapheight);

  //inner layer, red flame
  fill("rgba(250, 92, 92, 1)");//red color
  triangle(firetopX, firetopY + 80, firetopX - tubewidth/2 + 30, firetopY + trapheight, firetopX + tubewidth/2 - 30, firetopY + trapheight);
  }


//Facucet
//I want to draw a facucet that show the source of the water, time flowing in
let fcenterX = tubex + tubewidth / 2;//The faucet is placed at the center of the tube.
let fctopY = tubey - 60;//I move it a bit above the tube.

//Horizontal pipe
//I draw a short horizontal pipe that connects to the faucet.
//The last numbers 5 make the corners slightly rounded. where I learnt from the p5js website, https://p5js.org/reference/p5/rect/
fill("rgba(59, 59, 59, 1)");//color
rect(tubex, fctopY, tubewidth, 15, 5);

//Vertical outlet
//This is the small vertical part where the water flows out.
fill("rgba(95, 95, 95, 1)");//color
rect(fcenterX - 10, fctopY + 15, 20, 25, 5);

//Faucet handle, a small circle
//I add a circle on top as the handle to make it look more like a faucet.
fill("rgba(85, 85, 85, 1)");//color
ellipse(fcenterX, fctopY, 20);
  
}





 

   
