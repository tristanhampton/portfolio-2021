
const settings = {
  canvasWidth: null,
  canvasHeight: null,
};

let points = [];

function setup() {
  setCanvasWidth();
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

    for (i=0; i<points.length; i++) {
      if (getRandomInt(-5, 1) > 0) {
        secondCoordinate = points[i];
        noisyLine(coordinate.x, coordinate.y, secondCoordinate.x, secondCoordinate.y);
      }
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

function noisyLine(x1, y1, x2, y2) {
  // https://stackoverflow.com/questions/69389189/noisy-line-between-two-specific-points-p5-js
  const pixelsPerSegment = 10;
  const noiseScale = 120;
  const noiseFrequency = 0.01;
  const noiseSpeed = 0.1;

  let start = createVector(x1,y1);
  let end = createVector(x2,y2);

  noFill();

  let lineLength = start.dist(end);
  // Determine the number of segments, and make sure there is at least one.
  let segments = max(1, round(lineLength / pixelsPerSegment));
  // Determine the number of points, which is the number of segments + 1
  let points = 1 + segments;

  // We need to know the angle of the line so that we can determine the x
  // and y position for each point along the line, and when we offset based
  // on noise we do so perpendicular to the line.
  let angle = atan2(end.y - start.y, end.x - start.x);

  let xInterval = pixelsPerSegment * cos(angle);
  let yInterval = pixelsPerSegment * sin(angle);

  beginShape();
  // Always start with the start point
  curveVertex(start.x, start.y);

  // for each point that is neither the start nor end point
  for (let i = 1; i < points - 1; i++) {
    // determine the x and y positions along the straight line
    let x = start.x + xInterval * i;
    let y = start.y + yInterval * i;

    // calculate the offset distance using noice
    let offset =
      // The bigger this number is the greater the range of offsets will be
      noiseScale *
      (noise(
        // The bigger the value of noiseFrequency, the more erretically
        // the offset will change from point to point.
        i * pixelsPerSegment * noiseFrequency,
        // The bigger the value of noiseSpeed, the more quickly the curve
        // fluxuations will change over time.
        (millis() / 1000) * noiseSpeed
      ) - 0.5);

    // Translate offset into x and y components based on angle - 90°
    // (or in this case, PI / 2 radians, which is equivalent)
    let xOffset = offset * cos(angle - PI / 2);
    let yOffset = offset * sin(angle - PI / 2);

    curveVertex(x + xOffset, y + yOffset);
  }

  curveVertex(end.x, end.y);
  endShape();
}