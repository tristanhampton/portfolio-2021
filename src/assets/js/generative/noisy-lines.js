
const settings = {
  canvasWidth: null,
  canvasHeight: null,
};

let points = [];

function setup() {
  settings.canvasWidth = getCanvasWidth();
  settings.canvasHeight = getCanvasWidth();
  const canvas = createCanvas(settings.canvasWidth, settings.canvasHeight);
  canvas.parent('canvasContainer');
  // canvas.mouseClicked(redraw);
  canvas.mouseClicked(pushPoint);
}

function draw() {
  noStroke();
  background('#f5f1e6');

  strokeWeight(1);
  stroke('#2b2b2b');

  points.forEach(coordinate => {

    strokeWeight(1);

    for (i = 0; i < points.length; i++) {
      // if (getRandomInt(-5, 1) > 0) {
      secondCoordinate = points[i];
      noisyLine(coordinate.x, coordinate.y, secondCoordinate.x, secondCoordinate.y, 0.01);
      // }
    }
  });
}

function pushPoint() {
  points.push(createVector(mouseX, mouseY));
}


/* Tweakpane Things
* ----------------------------------------------- */
const pane = new Tweakpane.Pane({ title: 'Controls', container: document.querySelector('.project__tweak-settings .container') })
const saveButton = pane.addButton({ title: 'Save Image' });

saveButton.on('click', function () {
  saveCanvas('generated-image', 'png');
});