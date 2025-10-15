
//I'M going to draw a pizza
//I created a static pizza using p5.js.
//The pizza is made of a circle for the base.
//I used translate(200, 200) to place it in the center.
//I added cheese toppings with random positions.I will add more toppings in the future
//I used cos(), sin(), and random() to place the toppings.
//I did not use a class yet. I'm still confused about how to use this kind of group, so I'm still learning.
//I want to add interactivity, like clicking to add or remove a pizza.
//I may use arrays and mousePressed() to do this.
//I also want to make the toppings different based on the pizza type.

let pizzas = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("rgba(255, 213, 188, 1)")

  push();
  
  translate(200, 200);
  
  fill("rgba(255, 193, 21, 1)"); //pizza
  ellipse(0, 0, 150);

 fill("rgba(244, 255, 95, 1)"); //cheese
  for (let i = 0; i < 10; i++) {
    let angle = random(360);
    let radius = random(10,60);//Pick a random radiu
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;
    ellipse(x, y, 10);
  }
  pop();

  
}

function draw() {
  

  
  
}
