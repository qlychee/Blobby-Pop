// number of elements
var n = 20

// your last four digit buffcard ID
// this number will be used as the random seed
// in theory, everyone's submission will look unique
var buffId = 1864

// set the inital properties of each element
// you DO NOT need to modify this method
function initElement(element, i) {

    element.id = i	// id
    element.x = random(width); // random x position
    element.y = random(height); // random y postion
    element.s = random(100);  // random size  	
    element.color1 = color(139, 224, 237); // random color
    element.color2 = color(211, 249, 255); // random color
    element.direction = 0.7;
}

// draw a given element
// you need to modify this method
function drawElement(element) {

    stroke(element.color2)
    strokeWeight(1)
    fill(element.color1)
    ellipse(element.x, element.y, element.s)
    fill(255)
}

// update a given element
// you DO NOT need to modify this method
function updateElement(element) {

    element.x = element.x + random(-1, 1);
    // Moving up at a constant speed
    element.y = element.y - 1;

    // Reset to the bottom
    if (element.y < 0) {
        element.y = height;
    }
}

//
// you do not need to modify the code below
//

// define an array to hold elements
var elements = [];

function setup() {

    // fix to the same random seed so that each time you run, you get 
    // the same random numbers, which is easy for debugging
    randomSeed(buffId)

    // adjust the framerate to make the animation seem slower
    // (or faster by setting it to a larger value)
    frameRate(60)

    createCanvas(windowWidth-100, windowHeight-100);

    for (var i = 0; i < n; i++) {

        // create a new element as a blank javascript object
        var newElement = {};

        // call to initial the element
        initElement(newElement, i);

        // add the element
        elements.push(newElement);
    }

}


// you do not need to chanege anything in draw()
function draw() {
    background(98, 203, 219);

    // iterate through each element in elements
    for (var i = 0; i < elements.length; i++) {

        // update the attributes of the i-th element
        updateElement(elements[i]);

        // call drawElement to draw the i-th element
        drawElement(elements[i]);

    }

}



