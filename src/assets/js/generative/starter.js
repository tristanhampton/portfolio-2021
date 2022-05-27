const settings = {
    canvasWidth: null,
    canvasHeight: null,
};

function setup() {
    setCanvasWidth();
    const canvas = createCanvas(settings.canvasWidth, settings.canvasHeight);
    const parent = canvas.parent('canvasContainer');

}

function draw() {

}

function windowResized() {
    // Do resizing things here
}