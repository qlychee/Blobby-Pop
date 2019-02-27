//change this to change length of game
var gametime = 20; //this var is used in reset as well
let timer = gametime; //seconds of timer
var interval; //for counting down
var buffId = 1864 //seed id
var startbutton, resetbutton; 
var start = false;
var resetKey = false; //play again spacebar
var mobile = false; //display differently for phone
/*Fish Variables*/
var f_x, f_y;
const radius = 65;
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
    createCanvas(windowWidth - 100, windowHeight - 100);
    if (windowWidth/windowHeight < 0.7){
        mobile = true;
    }
    //start button
	startbutton = createButton("Start");
    if(mobile){
        startbutton.position(width / 2 - 100, 5*height/6);
        startbutton.size(300, 150);
        startbutton.style("font-size", "70px");
    }
    else{
        startbutton.position(width / 2, 5*height/6);
        startbutton.size(100, 50); 
        startbutton.style("font-size", "25px");
    }		
    startbutton.mousePressed(reset);
    startbutton.hide(); //hide for now
    //reset button
    resetbutton = createButton("Play Again");
    if(mobile){
        resetbutton.position(width / 2 - 100, 5*height/6);
        resetbutton.size(300, 150);
        resetbutton.style("font-size", "55px");
    }
    else{
        resetbutton.position(width / 2 -25, 5*height/6);
        resetbutton.size(150, 50);
        resetbutton.style("font-size", "25px");
    }	
    resetbutton.mousePressed(startScreen);
    resetbutton.hide(); //hide for now
    frameRate(60)
    
    f_x = random(windowWidth-280);
    f_y = random(windowHeight - 280);
    letter = '';
    createBubbles();
    interval = setInterval(decrementTimer, 1000);
}
function reset() {
    timer = gametime;
    score = 0;
    startbutton.hide();
    start = true;
    newFish();
    blobfish.show();
    createBubbles();
    loop();
}
function draw() {
    background(98, 203, 219);
    // iterate through bubble array
    for (var i = 0; i < elements.length; i++) {
        // update the attributes of the i-th element
        updateElement(elements[i]);
        // call drawElement to draw the i-th element
        drawElement(elements[i]);
    }
    //Timer
    fill(150);
    textAlign(CENTER);
    //Fish collected 
    fill(255, 255, 255);
    if(mobile){
        textSize(75)
        text('Fish Collected: ' + score, width / 2, height / 20);
    }else{
        textSize(30);
        text('Fish Collected: ' + score, width / 2, height / 13.5);
    }
    //fish
    blobfish.position(f_x-30, f_y-25);
    //invisible circle around fish
    noStroke();
    noFill();
    ellipse(f_x, f_y, radius * 2, radius * 2);
    fill(255, 255, 255);
    textAlign(CENTER, CENTER);
    if(mobile){
        textStyle(BOLD);
        textSize(75);
        text('Time: ' + timer, width / 2, height-80);
    }else{
        textStyle(NORMAL);
        textSize(30);
        text('Time: ' + timer, width / 2, height / 8);
    }
    if (timer == 0) {
        resetKey = true; 
        gameOver();
    }
    if (!start) {
        blobfish.hide();
        letter = '';
        startScreen();
    }
    if(!mobile){
        //letter for fish - putting this here so letter doesn't linger
        fill(242, 118, 188);
        textSize(40);
        textStyle(BOLD);
        text(letter, f_x + 80, f_y + 10);

    }

}
//game start and instructions
function startScreen() {
    start = false;
    resetKey = false;
    resetbutton.hide();
	fill(50, 123, 163);
    //stroke(28, 31, 51);
    if(mobile){
        rect( 0 ,0, width, height, 10);
        fill(255, 255, 255);
        textSize(95);
        text('Blobby Pop!', width / 2, height / 9);
        textSize(75);
        text('Instructions:', width / 2, height / 9 + 200);
        text('Collect blobfish', width / 2, height / 9 + 275);
        text('by tapping on them', width / 2, height / 9 + 350);
        text('before the time', width / 2, height / 9 + 425);
        text('runs out!', width / 2, height / 9 + 500);
        
    }
    else{
        rect( windowWidth/4-50, 0, windowWidth/2, windowHeight-100);
        fill(255, 255, 255);
        textSize(40);
        text('Blobby Pop!', width / 2, height / 9);
        textSize(35);
        text('Instructions:', width / 2, height / 9 + 50);
        text('Collect blobfish before', width / 2, height / 9 + 85);
        text('the time runs out!', width / 2, height / 9 + 115);
        text('To collect blobfish:', width / 2, height / 9 + 180);
        text('Click or press', width / 2, height / 9 + 215);
        text('corresponding key', width / 2, height / 9 + 250);
    }
	
    startbutton.show();
}
//game over and restart
function gameOver() {
    fill(50, 123, 163);
    if(mobile){
        rect( 0 ,0, width, height);
        fill(255, 255, 255);
        textSize(75);
        text("GAME OVER", width / 2, height/3);
        textSize(75);
        textAlign(CENTER);
        text('Fish Collected: ' + score, width / 2, height/2);
    }
    else{
        rect( windowWidth/4-50, 0, windowWidth/2, windowHeight-100);
        fill(255, 255, 255);
        textSize(30)
        text("GAME OVER", width / 2, height/3);
        textSize(30);
        textAlign(CENTER);
        text('Fish Collected: ' + score, width / 2, height/2);
    }
    blobfish.hide();
    letter = '';
    resetbutton.show()
    noLoop();
}

//decrement timer every second
function decrementTimer() {
    if (timer > 0) {
        timer--;
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
    letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
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
    if (key === ',') {
        bubbles ++;
        createBubbles();
    }
    if (key.toLowerCase() === letter.toLowerCase()) {
        newFish();
        score++;
    }
    //spacebar option to start/play again instead of clicking button
    if (key === ' '){
        if(!start){
            reset();
        }
        if(resetKey){
            startScreen();
        }
    }

}

function windowResized() {
    resizeCanvas(windowWidth - 100, windowHeight - 100);
}
