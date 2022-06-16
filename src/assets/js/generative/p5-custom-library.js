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
 * @param {object} noiseSettings Optional. Handles all settings that will apply to noise.
 */
p5.prototype.noisyLine = function (x1, y1, x2, y2, noiseSettings) {
  // adapted from https://stackoverflow.com/questions/69389189/noisy-line-between-two-specific-points-p5-js
  let segments, noiseScale, noiseFrequency, noiseSpeed, debug, chaos;

  // defaults
  noiseScale = 50;
  noiseFrequency = 0.001;
  noiseSpeed = 0.1;
  segments = 3;
  debug = false;
  chaos = false;

  // If any settings are specified, change them
  // They're all scaled so that setting numbers from 1-100 will have the desired effect
  if (noiseSettings && noiseSettings.scale) {
    noiseScale = noiseSettings.scale * 10;
  }

  if (noiseSettings && noiseSettings.frequency) {
    noiseFrequency = noiseSettings.frequency / 1000;
  }

  if (noiseSettings && noiseSettings.speed) {
    noiseSpeed = noiseSettings.speed / 250;
  }

  if (noiseSettings && noiseSettings.segments) {
    segments = noiseSettings.segments;
  }

  if (noiseSettings && noiseSettings.chaos) {
    chaos = getRandomInt(settings.chaos * -1, settings.chaos);
  }

  if (noiseSettings && noiseSettings.debug) {
    debug = noiseSettings.debug;
  }

  let start = createVector(x1, y1);
  let end = createVector(x2, y2);

  noFill();

  let lineLength = start.dist(end);

  // if linelength is too small, don't do more than 2 segments
  if (lineLength < 30 && segments > 2) {
    segments = 2;
  }

  // Determine how long one segment is
  let segmentLength = lineLength / segments;

  // We need to know the angle of the line so that we can determine the x
  // and y position for each point along the line, and when we offset based
  // on noise we do so perpendicular to the line.
  let angle = atan2(end.y - start.y, end.x - start.x);

  let xInterval = segmentLength * cos(angle);
  let yInterval = segmentLength * sin(angle);

  beginShape();

  // Always start with the start point
  curveVertex(start.x, start.y);
  curveVertex(start.x, start.y);

  // for each point that is neither the start nor end point
  for (let i = 1; i < segments; i++) {
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
        i * segmentLength * noiseFrequency,
        // The bigger the value of noiseSpeed, the more quickly the curve
        // fluxuations will change over time.
        (millis() / 1000) * noiseSpeed
      ) - 0.5);

    if (chaos) {
      offset *= chaos;
    }

    // Translate offset into x and y components based on angle - 90°
    // (or in this case, PI / 2 radians, which is equivalent)
    let xOffset = offset * cos(angle - PI / 2);
    let yOffset = offset * sin(angle - PI / 2);

    curveVertex(x + xOffset, y + yOffset);

    if (debug) {
      circle(x + xOffset, y + yOffset, 20);
    }
  }

  curveVertex(end.x, end.y);
  curveVertex(end.x, end.y);
  if (debug) {
    circle(start.x, start.y, 20);
    circle(end.x, end.y, 20)
  }
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


p5.prototype.getPointsOnEllipse = function (xCenter, yCenter, points, radius) {
  let angle = 0;
  let coordinates = []

  step = TWO_PI / points; //in radians equivalent of 360/points in degrees

  for (let i = 0; i < points; i++) {
    // get x and y coordinates
    // Adding center coordinates simulates adding a center to the "ellipse"
    x = radius * sin(angle) + xCenter;
    y = radius * cos(angle) + yCenter;

    // save each coordinate as an object to reference later
    coordinates.push(createVector(x, y));

    // increase angle for next loop
    angle = angle + step;
  }

  return coordinates;
}