// In this project, I created a Burger and Fries Generator.I designed three different types of burgers:
// Classic, Veggie, and Double, each with its own combination of layers like lettuce, tomato, 
// cheese, and patty.Pressing the keys C, V, or D allows users to add different types of burgers onto
// a plate, while pressing F adds a group of randomly placed fries.

//I chose to create burgers and fries because they’re my favorite food. I often enjoy eating them, 
// and I even like to make burgers myself at home.This project also connects to a bigger dream 
// I’ve had for a long time: opening my own fast food restaurant someday




let burgers = [];//burger array
let fries = [];//fries array

function setup() {
  createCanvas(windowWidth, windowHeight);
   burgers[0] = new Burger(width/2, height/2, 100, "classic");//I create one burger first, just for testing
   //also make it to the middle of the plate looks like a symble
  
}

function draw() {
  background("rgba(255, 185, 144, 0.94)");//background 
  //add text  like a menu
  fill(0); //black
  textSize(18); //font size
  text("Press C = Classic Burger", 20, 20);
  text("Press V = Veggie Burger", 20, 45);
  text("Press D = Double Burger", 20, 70);
  text("Press F = Add Fries", 20, 95);
  //draw the big plate
  fill(255);//white
  ellipse(width/2,height/2, width*0.8,height*0.8);//x and y at the center, so it's width/2 and height/2 
  //size is the width and height*0.8, so won't exceed the width and height
  ellipse(width/2,height/2, width*0.5,height*0.5);//inner circle, so make it more looks like a plate
  
  for(let i = 0; i<burgers.length;i++){//drawing a burger with for loop
  burgers[i].drawBurger();//this will show in draw whthin the drawburger function
 }
 for (let i = 0; i < fries.length; i++) {
 fries[i].drawFries(); //draw fries on the plate
}
}

function keyPressed(){//when key pressing different type burger will show, I learn the keypressed function from the week7 Pizza genarator example.

  let type;//define the type variable, which represent differnt type of burger
  if (key === 'c') {//when press C, classic burger will show
    type = 'classic';
  } else if (key === 'v') {//when press V, beggie burger will show
    type = 'veggie';
  } else if (key === 'd') {//when press d, double burger will show
    type = 'double';
  }
 
 
  if (key === 'c' || key === 'v' || key === 'd') {//if function, so if press "C","V" and "D", the funciton will run
    let size = random(100, 150); //I make it random size
    let x = random(width*0.2, width*0.8);//Random X within width
    let y = random(height*0.2,height*0.7);//Random Y within height

    let newBurger = new Burger(x, y, size, type);//I create a new burger object using the Burger class constructor.
    //the function show 4 parameters: x, y, size, and type, which define the burger's position, size, and style.
    burgers.push(newBurger);//I pushes the newly generated burger
		//into burgers array
  }
   if (key === 'f') { //add fries when F is pressed
    for (let i = 0; i < 10; i++) { // I create 10 fries in a set
      let x = random(width*0.2, width*0.8);//Random X within width
      let y = random(height*0.2,height*0.7);//Random Y within height
      let length = random(30, 60); //generate fries length
      let angle = random(-0.5, 0.5); //give each fries some random rotate
      let newFries = new Fries(x, y, length, angle); //create a fries object
      fries.push(newFries); //push it to the fries array
    }
  }
} 

class Burger{
  constructor(x,y,size,type){//I set up initial burger state
    this.x = x;//generate x
    this.y = y;//generate Y
    this.size = size;//generate size
    this. type = type;//generate type

    // layers
    if (type === "classic") {//define the classic parameter
      this.layers = ["lettuce", "cheese", "patty"];//classic type will have lettuce, cheese, and patty inside the burger
    } else if (type === "veggie") {//define the veggie parameter
      this.layers = ["lettuce", "tomato", "cheese", "tomato"];//veggie will have lettuce, tomato, cheese and tomato
    } else if (type === "double") {//define the double parameter
      this.layers = ["cheese", "patty", "cheese", "patty"];//double will have chese, patty, cheese, and patty
    } else {//original test burger, like example
      this.layers = ["cheese", "patty"]; // fallback
    }
  }
  drawBurger(){
    push();//save the current drawing settings 
    translate(this.x,this.y);//move the (0,0) origin to the burger's position

    let h = this.size/10;//I define the height of each layer based on the burger's overall size

    //Draw the top bun
    fill("rgba(199, 148, 46, 1)");//set the bun color, light brown
    arc(0,0,this.size, h*4, PI, 0, CHORD);//I use the arc function to draw the halp circle so make it looks like a bun.
    //this.size is the width of the bun, height *4 makes it looks like a dome shape.
    //PI start angle 180 degree, I tried many differnt angle and start 180 is more clear and easy to draw, end angle to 0 degree. so this willl draws a half circle

    //Draw each layer from top to bottom

    for(let i = 0;i<this.layers.length; i++){//the .length is automatically set depending on 
    // how many items are inside the layers array
     let layer = this.layers[i];//

     if (layer ==="lettuce"){//define lettuce layer parameter
      fill("rgba(0,200,0,1)");//fill green color represent lettuce
     }else if (layer === "cheese") {//define cheese
        fill("rgba(255, 204, 0, 1)");//fill yellow
      } else if (layer === "tomato") {//define tomato
        fill("rgba(255, 0, 0, 1)");//fill red
      } else if (layer === "patty") {//define patty
        fill("rgba(100, 60, 0, 1)");//fill brown
      }
      rect(-this.size/2,i*h,this.size,h,10);//draw layer, using rect function, i*h based on layer, 10 is the corner radius, which will make it rounded. 
      //learn this rounded corner parameter from p5js when check the rect function on first class
    }

    //bottom bun
     fill("rgba(199, 148, 46, 1)");//bottom bun color
     rect(-this.size / 2, this.layers.length * h, this.size, h*2, 10);//height*2 which thicker than the top bun, looks like hamberger

    pop();
  }
}

class Fries{
  constructor(x, y, length, angle) {//set up initial fries state
    this.x = x;//set x position
    this.y = y;//set y position
    this.length = length;//set fries length
    this.angle = angle;//set fries rotation
  }
  drawFries() {
    push(); //save current drawing settings
    translate(this.x, this.y); //move origin to this fries's position
    rotate(this.angle); //raotate
    fill("rgba(245, 234, 138, 1)"); //fries color, yellow
    rect(0, 0, 6, this.length, 3); //draw fries
    pop();
  }
}
