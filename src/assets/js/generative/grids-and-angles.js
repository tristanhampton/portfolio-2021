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
  const size = min(windowWidth, windowHeight);
  const canvas = createCanvas(size, size);
  canvas.parent('canvasContainer');

  settings.canvasWidth = width;
  settings.canvasHeight = height;
  settings.gap = 0.05 * settings.canvasWidth;

  draw();
}

function draw() {
  noStroke();
  background('#f5f1e6');
  let x, y;
  
  // width/height are determined by num of cells, subtracting gaps to allow for space
  const w = settings.canvasWidth / settings.cellsX - settings.gap - (settings.gap/settings.cellsX);
  const h = settings.canvasHeight / settings.cellsY - settings.gap - (settings.gap/settings.cellsY);


  for (let i = 0; i < settings.cellsX; i++) {
    for (let j = 0; j < settings.cellsY; j++) {
      x = settings.gap + (w + settings.gap) * i;
      y = settings.gap + (h + settings.gap) * j;

      boxes.push(new Box(x,y,w,h))
    }
  }

  boxes.forEach(box => {
    box.draw();
  });

  console.log(boxes)
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
  }

  draw() {
    noFill();
    stroke('#000');
    strokeWeight(1);
    rect(this.x, this.y, this.width, this.height);
  }
}