const settings = {
  canvasWidth: null,
  canvasHeight: null,
  canvasGapRate: 0.001,
  canvasGap: null,
  lineHeightRate: 0.06,
  lineHeight: null,
  lineGapRate: 0.1,
  lineGap: null,
  lines: [],
};

function setup() {
  noLoop();
  settings.canvasWidth = getCanvasWidth();
  settings.canvasHeight = getCanvasWidth();

  const canvas = createCanvas(settings.canvasWidth, settings.canvasHeight);
  canvas.parent('canvasContainer');
  canvas.mouseClicked(redraw);
}

function draw() {
  noStroke();
  background('#f5f1e6');
  strokeWeight(1);

  settings.canvasGap = settings.canvasWidth * settings.canvasGapRate;
  settings.lineHeight = settings.canvasHeight * settings.lineHeightRate;
  settings.lineGap = settings.canvasHeight * settings.lineGapRate;

  let x, y, w, h;

  const maxNumOfLines = settings.canvasHeight / (settings.lineGap + settings.lineHeight);
  console.log(settings.lineGap)

  for (let i = 0; i < maxNumOfLines; i++) {
    w = settings.canvasWidth - settings.canvasGap * 2;
    h = settings.lineHeight;
    x = settings.canvasGap;
    y = (settings.lineGap * i) + (h * i) + settings.canvasGap;

    console.log(x, y, w, h)

    settings.lines.push(new Line(x, y, w, h))
  }

  settings.lines.forEach(line => {
    line.draw();
  });
}

class Line {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  bounding() {
    noFill();
    stroke('#000');
    strokeWeight(1);
    rect(this.x, this.y, this.width, this.height);
  }

  draw() {
    this.bounding();
  }
}


/* Tweakpane Things
* ----------------------------------------------- */
const pane = new Tweakpane.Pane({ title: 'Controls', container: document.querySelector('.project__tweak-settings .container') })
const saveButton = pane.addButton({ title: 'Save Image' });

saveButton.on('click', function () {
  saveCanvas('generated-image', 'png');
});

pane.on('change', function () {
  redraw();
});