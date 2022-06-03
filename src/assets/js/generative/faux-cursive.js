const settings = {
  canvasWidth: null,
  canvasHeight: null,
  canvasGapRate: 0.01,
  canvasGap: null,
  lineHeightRate: 0.06,
  lineHeight: null,
  lineGapRate: 0.03,
  lineGap: null,
  lines: [],
  characterWidth: 50,
  characterGap: 5,
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
  settings.lines = [];
  noStroke();
  background('#f5f1e6');
  strokeWeight(1);

  settings.canvasGap = settings.canvasWidth * settings.canvasGapRate;
  settings.lineHeight = settings.canvasHeight * settings.lineHeightRate;
  settings.lineGap = settings.canvasHeight * settings.lineGapRate;

  let x, y, w, h;

  const maxNumOfLines = settings.canvasHeight / (settings.lineGap + settings.lineHeight) - 1;

  for (let i = 0; i < maxNumOfLines; i++) {
    w = settings.canvasWidth - settings.canvasGap * 2;
    h = settings.lineHeight;
    x = settings.canvasGap;
    y = (settings.lineGap * i) + (h * i) + settings.canvasGap;

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
    this.characterWidth = settings.characterWidth;
    this.characterGap = settings.characterGap;
    this.characters = [];
    this.maxNumCharacters = this.width / (this.characterWidth + this.characterGap) - 1;
  }

  bounding() {
    noFill();
    stroke('#000');
    strokeWeight(1);
    rect(this.x, this.y, this.width, this.height);
  }

  draw() {
    // this.bounding();

    noFill();
    stroke('#000');

    for (let i = 0; i < this.maxNumCharacters; i++) {
      let x, y, width, height;
      x = this.x + (this.characterWidth + this.characterGap) * i;
      y = this.y;
      width = this.characterWidth;
      height = this.height;

      this.characters.push(new Character(x, y, width, height, i, this.maxNumCharacters));
    }

    this.characters.forEach(character => {
      character.draw();
    })
  }
}

class Character {
  constructor(x, y, width, height, characterNum, maxNumCharacters) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.characterNum = characterNum;
    this.maxNumCharacters = maxNumCharacters;
  }

  bounding() {
    rect(this.x, this.y, this.width, this.height);
  }

  draw() {
    this.bounding();
  }
}


/* Tweakpane Things
* ----------------------------------------------- */
const pane = new Tweakpane.Pane({ title: 'Controls', container: document.querySelector('.project__tweak-settings .container') })
const lineSettings = pane.addFolder({ title: 'Line Settings' });
lineSettings.addInput(settings, 'canvasGapRate', { min: 0, max: 0.1, step: 0.001 });
lineSettings.addInput(settings, 'lineHeightRate', { min: 0, max: 0.1, step: 0.001 });
lineSettings.addInput(settings, 'lineGapRate', { min: 0, max: 0.3, step: 0.001 });
const characterSettings = pane.addFolder({ title: 'Character Settings' });
lineSettings.addInput(settings, 'characterWidth', { min: 10, max: 200, step: 1 });
lineSettings.addInput(settings, 'characterGap', { min: 1, max: 30, step: 1 });

const saveButton = pane.addButton({ title: 'Save Image' });

saveButton.on('click', function () {
  saveCanvas('generated-image', 'png');
});

pane.on('change', function () {
  redraw();
});