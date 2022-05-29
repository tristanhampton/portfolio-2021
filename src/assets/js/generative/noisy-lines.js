
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


// /* Tweakpane Things
// * ----------------------------------------------- */
// const pane = new Tweakpane.Pane()

// pane.on('change', function () {
//   redraw();
// });



/* Helper Functions
* ----------------------------------------------- */
function setCanvasWidth() {
  const container = document.querySelector('#canvasContainer');
  const width = container.offsetWidth;
  const padding = getStyle(container, 'padding-left');

  // I want a perfect square, so set height the same
  settings.canvasWidth = width - padding - padding;
  settings.canvasHeight = width - padding - padding;
}

function getStyle(oElm, strCssRule) {
  var strValue = "";
  if (document.defaultView && document.defaultView.getComputedStyle) {
    strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
  }
  else if (oElm.currentStyle) {
    strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
      return p1.toUpperCase();
    });
    strValue = oElm.currentStyle[strCssRule];
  }

  strValue = strValue.replace('px', '');
  return strValue;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}