const settings = {
  canvasWidth: null,
  canvasHeight: null,
  gap: null,
  cellsX: 3,
  cellsY: 3,
}

let boxes = [];

function setup() {
  noLoop();
  setCanvasWidth();
  
  const size = min(settings.canvasWidth, settings.canvasHeight);
  const canvas = createCanvas(size, size);
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
    this.spacing = 5;
  }

  bounding() {
    noFill();
    stroke('#000');
    strokeWeight(1);
    rect(this.x, this.y, this.width, this.height);
  }

  lineVertical() {
    stroke('#c7646c');
    strokeWeight(1);

    let side = getRandomInt(0, 2);
    if (side == 0) return;

    // Two possible orientations, left and right
    if (side == 1) {
      for (let i = this.x; i < this.x + this.width/2; i+=this.spacing) {
        line(i, this.y, i, this.y + this.height);
      }
    } else if (side == 2) {
      for (let i = this.x + this.width/2; i < this.x + this.width; i += this.spacing) {
        line(i, this.y, i, this.y + this.height);
      }
    }
  }

  lineHorizontal() {
    stroke('#7e6f6c');
    strokeWeight(1);

    let side = getRandomInt(0,2);
    if (side == 0) return;

    // Two possible orientations, top and bottom
    if(side == 1) {
      for (let i = this.y; i < this.y + this.height/2; i+=this.spacing) {
        line(this.x, i, this.x + this.width, i);
      }
    } else if (side == 2) {
      for (let i = this.y + this.width/2; i < this.y + this.height; i += this.spacing) {
        line(this.x, i, this.x + this.width, i);
      }
    }
  }

  lineDiagonal() {
    stroke('#db6d41');
    strokeWeight(1);

    // Four possible orientations, topleft, bottomleft, topright, bottomright
    let corner = getRandomInt(0,4);
    if (corner == 0) return;

    for (let i = 0; i < this.width; i += this.spacing) {
      if (corner == 1)
        line(this.x + i, this.y, this.x, this.y + i);
      else if (corner == 2)
        line(this.x + i, this.y + this.height, this.x, this.y + this.height - i);
      else if (corner == 3) 
        line(this.x + this.width - i, this.y, this.x + this.width, this.y + i);
      else if (corner == 4)
        line(this.x + this.width - i, this.y + this.height, this.x + this.width, this.y + this.height - i);
    }
  }

  draw() {
    // this.bounding();
    this.lineVertical();
    this.lineHorizontal();
    this.lineDiagonal();
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
