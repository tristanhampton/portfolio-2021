function setup() {
    const size = min(windowWidth, windowHeight);
    const canvas = createCanvas(size, size);
    const parent = canvas.parent('canvasContainer');
    resizeCanvas(parent.width, parent.width)

    noStroke();
    draw();
}

function draw() {

}

function windowResized() {
    // Do resizing things here
}