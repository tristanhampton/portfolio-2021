const settings = {
  canvasWidth: null,
  canvasHeight: null,
  gap: null,
  lineGap: 3,
  curvesPerLine: 10,
  cellsX: 3,
  cellsY: 3,
}

let boxes = [];

function setup() {
  noLoop();
  setCanvasWidth();
  
  const canvas = createCanvas(settings.canvasWidth, settings.canvasHeight);
  canvas.parent('canvasContainer');

  settings.gap = 0.05 * settings.canvasWidth;
}

function draw() {
  noStroke();
  background('#f5f1e6');
  buildGrid();

  boxes.forEach(box => {
    box.draw();
  });
}

function windowResized() {
    // Do resizing things here
}

class Box {
  constructor(x,y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.spacing = settings.lineGap;
    this.curvesPerLine = settings.curvesPerLine;
  }

  bounding() {
    noFill();
    stroke('#000');
    strokeWeight(1);
    rect(this.x, this.y, this.width, this.height);
  }

  noisyLine(x1,y1,x2,y2, points) {
    noFill();
    strokeWeight(1);
    let xDist = x2 - x1;
    let yDist = y2 - y1;
    let distance = Math.hypot(x2 - x1, y2 - y1);
    let steps = distance/points;

    //--- Determine what direction the line is moving. Assume diagonal.
    let diagonal = true;
    let vertical = false;
    let horizontal = false;
    if (x1 == x2) {
      diagonal = false;
      vertical = true;
    } else if (y1 == y2) {
      diagonal = false;
      horizontal = true;
    }


    // I need this to be able to handle lines in any direction
    beginShape();
    curveVertex(x1,y1);
    curveVertex(x1,y1);
    for (let i=1; i < points; i++) {
      let noiseAlteration = noise(i + getRandomInt(-5, 5)) * 5;

      if (vertical)
        curveVertex(x1+noiseAlteration, y1+steps*i);
      else if (horizontal)
        curveVertex(x1 + steps * i, y1+noiseAlteration);
      else if (diagonal) {

        if (x1 < x2 && y1 < y2) {
          // Top left to bottom right angle (\)
          curveVertex(x1 + steps * i + noiseAlteration, y1 + steps * i + noiseAlteration);
        }

        if (x1 > x2 && y1 < y2 && x1 - steps * i > x2) {
          // top right to bottom left angle (/)
          curveVertex(x1-steps*i+noiseAlteration, y1+steps*i+noiseAlteration);
        }
      }
    }
    curveVertex(x2,y2);
    curveVertex(x2,y2);
    endShape();
  }

  linesVertical() {
    let side = getRandomInt(0, 2);
    if (side == 0) return;

    // Two possible orientations, left and right
    if (side == 1) {
      for (let i = this.x; i < this.x + this.width/2; i+=this.spacing) {
        this.noisyLine(i, this.y, i, this.y + this.height, this.curvesPerLine)
      }
    } else if (side == 2) {
      for (let i = this.x + this.width/2; i < this.x + this.width; i += this.spacing) {
        this.noisyLine(i, this.y, i, this.y + this.height, this.curvesPerLine)
      }
    }
  }

  linesHorizontal() {
    let side = getRandomInt(0,2);
    if (side == 0) return;

    // Two possible orientations, top and bottom
    if(side == 1) {
      for (let i = this.y; i < this.y + this.height/2; i+=this.spacing) {
        this.noisyLine(this.x, i, this.x + this.width, i, this.curvesPerLine);
      }
    } else if (side == 2) {
      for (let i = this.y + this.width/2; i < this.y + this.height; i += this.spacing) {
        this.noisyLine(this.x, i, this.x + this.width, i, this.curvesPerLine);
      }
    }
  }

  linesDiagonal() {
    // Four possible orientations, topleft, bottomleft, topright, bottomright
    // let corner = getRandomInt(0,4);
    let corner = getRandomInt(-1,1);
    if (corner <= 0) return;

    for (let i = 0; i < this.width; i += this.spacing) {
      let x1,y1,x2,y2;

      if (corner == 1) {
        x1 = this.x + i;
        y1 = this.y;
        x2 = this.x;
        y2 = this.y + i;
      } else if (corner == 2) {
        x1 = this.x;
        y1 = this.y + this.height - i;
        x2 =  this.x + i;
        y2 =  this.y + this.height;
      } else if (corner == 3) {
        x1 = this.x + this.width - i;
        y1 = this.y;
        x2 = this.x + this.width;
        y2 = this.y + i;
      } else if (corner == 4) {
        x1 = this.x + this.width - i;
        y1 = this.y + this.height;
        x2 = this.x + this.width;
        y2 = this.y + this.height - i;
      }
      
      this.noisyLine(x1,y1,x2,y2,this.curvesPerLine);
    }
  }

  draw() {
    strokeWeight(1);
    // this.bounding();

    stroke('#db6d41');
    this.linesVertical();

    stroke('#7e6f6c');
    this.linesHorizontal();

    stroke('#c7646c');
    this.linesDiagonal();
  }
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

function setCanvasWidth() {
  const container = document.querySelector('#canvasContainer');
  const width = container.offsetWidth;
  const padding = getStyle(container, 'padding-left');

  // I want a perfect square, so set height the same
  settings.canvasWidth = width - padding - padding;
  settings.canvasHeight = width - padding - padding;
}

function buildGrid() {
  let x, y;

  // width/height are determined by num of cells, subtracting gaps to allow for space
  const w = settings.canvasWidth / settings.cellsX - settings.gap - (settings.gap / settings.cellsX);
  const h = settings.canvasHeight / settings.cellsY - settings.gap - (settings.gap / settings.cellsY);


  for (let i = 0; i < settings.cellsX; i++) {
    for (let j = 0; j < settings.cellsY; j++) {
      x = settings.gap + (w + settings.gap) * i;
      y = settings.gap + (h + settings.gap) * j;

      boxes.push(new Box(x, y, w, h))
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
