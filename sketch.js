let timer = 10; //seconds of timer
var buffId = 1864 //seed id
var startbutton; 
/*Fish Variables*/
var f_x, f_y;
radius = 65;
var fishCollected = false;
var score = 0; //fish collected
var blobfish;
var letter; //letter attached to fish

new p5()
/*Bubble Variables and Functions*/
var bubbles = 20; //number of bubbles 
var elements = []; //bubble elements
// location restriction of target
var x = 200;
var y = 200;
// changes in x, y
var dx = 0;
var dy = 0;
// set the inital properties of each element
function initElement(element, i) {
    element.id = i	// id
    element.x = random(width); // random x position
    element.y = random(height); // random y postion
    element.s = random(100);  // random size  	
    element.color1 = color(139, 224, 237); // random color
    element.color2 = color(211, 249, 255); // random color
    element.direction = 0.7;
}
//bubble elements appear on screen at random locations and sizes 
function drawElement(element) {
    stroke(element.color2)
    strokeWeight(1)
    fill(element.color1)
    ellipse(element.x, element.y, element.s)
    fill(255)
}
// update a given element
function updateElement(element) {
    element.x = element.x + random(-1, 1);
    // Moving up at a constant speed
    element.y = element.y - 1;
    // Reset to the bottom
    if (element.y < 0) {
        element.y = height;
    }
}
function preload() {
    blobfish = createImg('blobfish.gif');
}
function setup() {
    // fix to the same random seed so that each time you run, you get 
    // the same random numbers, which is easy for debugging
    randomSeed(buffId)
	noLoop();
    createCanvas(windowWidth-100, windowHeight-100);
	startbutton = createButton("Start");
  	startbutton.position(width / 2, height /5 + 250);
  	startbutton.size(100, 50); 
  	startbutton.style("font-size", "25px");
  	startbutton.mousePressed(reset);
    frameRate(60)
    f_x = random(windowWidth-280);
    f_y = random(windowHeight - 280);
    letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    createBubbles();
}
function reset(){

  startbutton.hide();
  loop();
	createBubbles();

}
function draw() {
    background(98, 203, 219);
    //Timer
    fill(150);
    textSize(30);
    textAlign(CENTER);
    // iterate through bubble array
    for (var i = 0; i < elements.length; i++) {
        // update the attributes of the i-th element
        updateElement(elements[i]);
        // call drawElement to draw the i-th element
        drawElement(elements[i]);
    }
    //Fish collected 
    fill(255, 255, 255);
    text('Fish Collected: ' + score, width / 2, 20);
    //letter for fish
    fill(242, 118, 188);
    textSize(40);
    textStyle(BOLD);
    text(letter, f_x + 80, f_y + 10);
    //fish
    blobfish.position(f_x-30, f_y-25);
    //invisible circle around fish
    noStroke();
    noFill();
    ellipse(f_x, f_y, radius * 2, radius * 2);
    fill(255, 255, 255);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    textSize(30);
    text('Time:' + timer, width / 2, height / 8);
    if (frameCount % 60 == 0 && timer > -1) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
        timer--;
    }
    if (timer == -1) {
        text("GAME OVER", width / 2, height * 0.7);
		blobfish.hide();
		letter.hide();
		noLoop();
	
    }
}

function createBubbles() {
    for (var i = 0; i < bubbles; i++) {
        // create a new element as a blank javascript object
        var newElement = {};
        // call to initial the element
        initElement(newElement, i);
        // add the element
        elements.push(newElement);
    }
}

function update() {
    if (pause) {
        dx = 0;
        dy = 0;
    }
    else {
        x = x + dx
        y = y + dy
    }
}

function newFish() {
    //new letter and location
    letter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    f_x = random(windowWidth - 280);
    f_y = random(windowHeight - 280);
}
//when the user clicks
function mousePressed() {
    var d = dist(mouseX, mouseY, f_x, f_y)
    if (d < radius) {
        newFish();
        score++;
    }
}

function keyTyped() {
    //add more bubbles
    if (key === 'b') {
        bubbles ++;
        createBubbles();
    }
    if (key === letter) {
        newFish();
        score++;
    }
}

function windowResized() {
    resizeCanvas(windowWidth - 100, windowHeight - 100);
}