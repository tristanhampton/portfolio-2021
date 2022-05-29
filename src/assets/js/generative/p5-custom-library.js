/* Setup Functions
 * ----------------------------------------------- */

/**
 * Returns the ideal canvas width by getting the current width of the container and subtracting the padding.
 * 
 * @param {type} var Description.
 */
p5.prototype.getCanvasWidth = function () {
  let container = document.querySelector('#canvasContainer');
  let width = container.offsetWidth;
  let padding = getStyle(container, 'padding-left');

  return width - padding - padding;
}




/* Lines
 * ----------------------------------------------- */

/**
 * Creates a line in any direction and applies noise to it.
 * 
 * @param {int} x1 The first X coordinate.
 * @param {int} y1 The first Y coordinate.
 * @param {int} x2 The second X coordinate.
 * @param {int} y2 The second Y coordinate.
 * @param {int} intensity The rate at which noise is applied.
 */
p5.prototype.noisyLine = function (x1, y1, x2, y2, intensity) {
  // adapted from https://stackoverflow.com/questions/69389189/noisy-line-between-two-specific-points-p5-js
  const pixelsPerSegment = 10;
  const noiseScale = 120;
  const noiseFrequency = intensity ? intensity : 0.01;
  const noiseSpeed = 0.1;

  let start = createVector(x1, y1);
  let end = createVector(x2, y2);

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
  curveVertex(end.x, end.y);
  endShape();
}


/* Misc.
 * ----------------------------------------------- */

/**
 * Returns a whole integer value that is inclusive of both min and max
 * 
 * @param {int} min The minimum value.
 * @param {int} max The maximum value.
 */
p5.prototype.getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Returns the value of a css property.
 * 
 * @param {object} oElm The query selected element to search for the rule.
 * @param {string} strCssRule The CSS rule that we are searching for the value of.
 */
p5.prototype.getStyle = function (oElm, strCssRule) {
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