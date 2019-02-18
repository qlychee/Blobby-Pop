// your last four digit buffcard ID
// this number will be used as the random seed
// in theory, everyone's submission will look unique
var buffId = 1864
var pause = false;
var n = 0; //flag keyboard
var win = 0; //wins
var lost= 0; //losses

function setup() {
  // fix to the same random seed so that each time you run, you get 
	// the same random numbers, which is easy for debugging
	randomSeed(buffId)
  
  createCanvas(400, 400);
}

new p5();
// location of the ball
var x = 200;
var y = 200;

// goal
var x1 = random(100);	// Modify me
var y1 = random(200);	// Modify me
var r1 = random(5,20);	// Modify me

//obstacles
var x2 = random(100);
var y2 = random(200);
var r2 = random(20,35);

var x3 = random(300);
var y3 = random(200);
var r3 = random(40,70);

var x4 = random(200);
var y4 = random(300);
var r4 = random(30,65);

var x5 = random(350);
var y5 = random(350);
var r5 = random(10,20);

//flag hitting obstacle
var hitObstacle = false;

//moving goal variables
var dx1 = 0;
var dy1 = 0;
var x_goal = 0;
var y_goal = 0;

// changes in x, y
var dx = 0;
var dy = 0;

// boolean flag to indicate that whether the goal is reached
var isGoalReached = false;

// draw the ball
function drawBall() {
  fill(color(0, 255, 0));
  ellipse(x, y, 20, 20);
}

function drawGoal() {
 
  if(isGoalReached == true)
  	{
      	fill(255);
        ellipse(x1, y1, r1 * 2, r1 * 2);
      
    }
  // add an if logic to change the color of the goal circle
  // depending on whether the goal has been reached
  textSize(20);
  text('Goal', x1, y1-15);
  ellipse(x1, y1, r1 * 2, r1 * 2);
}

// draw the mouse cursor location
function drawMouseCursor() {
  fill(color(255, 0, 0))
  ellipse(mouseX, mouseY, 20, 20);
}

function draw() {
  background(220);

  line(200, 0, 200, 400);
  line(0, 200, 400, 200);

  drawGoal();
  
  drawObstacle();

  drawBall();

  drawMouseCursor();

  checkGoal();
  
  fill(0, 132, 66);
  text('Wins:', 30, 20);
  
  fill(170, 22, 42);
  text('Losses: ', 130, 20);
   
 
  if (!isGoalReached) {
    update();
  }
  
  if(!isGoalReached)
  {
		updateGoal();
  }
 
  
  fill(150);
  textSize(30);
  textAlign(CENTER);
  text("Vivian Tran", 200, 380);
}
function drawObstacle(){
	
  fill(200, 255, 180);
	rect(x2, y2, r2, r2);
  
  fill(100, 50, 200);
  ellipse(x3, y3, r3, r3);
  
  fill(150, 230, 200);
  ellipse(x4, y4, r4+30, r4);
  
  fill(240, 200, 50);
  rect(x5, y5, r5, r5+10);
}

function update() {
  if(pause == true){

	dx = 0;
  dy = 0;  
  }
  else{
  x = x + dx
  y = y + dy
  }  
}

function updateGoal(){
	if(pause == true){
	dx1 = 0;
  dy1 = 0;
  }
  else{
	x_goal = x_goal + dx1;
  y_goal = y_goal + dy1;
	
  }

}

function checkGoal() {
  if (dist(x, y, x1, y1) < r1) {
    isGoalReached = true
    fill(0, 132, 66);
    text(win+1 ,60, 20); 
  }
}

function checkObstacle(){

 if ((dist(x, y, x2, y2) < r2) || (dist(x, y, x3, y3) < r3)) {
    hitObstacle = true
    fill(0, 132, 66);
    text(lost+1 ,150, 20); 
  }
}

// When the user clicks the mouse
function mouseMoved() {

  if (mouseX >= 200) {
    // Modify this line such that dx depends on the distance from
    // the center; the further away from the center, the higher dx is.
    // 0 < dx < 2
    
    
    dx = 1 
    
  } else {
    // Modify this line such that dx depends on the distance from
    // the center; the further away from the center, the lower dx is.
    // -2 < dx < 0
    
    dx = -1
  }

  //y dimension
 if (mouseY >= 200) {
    
    dy = 1 
    
  } else {
    
    dy = -1
  }
  
}

function keyTyped(){
  //restart
  if(key === 'r'){
    setup();
    draw();
  }
	if(keyCode == 32){
    if(n == 0){
		pause = true;
    n = 1;
	
  }
  	else if(n == 1){
			pause = false;
      n = 0;
  }
    
  } 
  
}
