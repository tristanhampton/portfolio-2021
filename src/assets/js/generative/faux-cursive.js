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
  maxCharacterWidth: 150,
  characterGap: 5,
  pixelsPerSegment: 5,
  frequency: 0.001,
  scale: 10,
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
  let i = 0;
  do {
    w = settings.canvasWidth - settings.canvasGap * 2;
    h = settings.lineHeight;
    x = settings.canvasGap;
    y = (settings.lineGap * i) + (h * i) + settings.canvasGap;

    if (y + settings.lineHeight < settings.canvasHeight - (settings.canvasGapRate * 2)) {
      settings.lines.push(new Line(x, y, w, h));
      i++;
    }
  } while (y + settings.lineHeight + settings.lineGap < settings.canvasHeight - (settings.canvasGapRate * 2));

  settings.lines.forEach(line => {
    line.draw();
  });
}

// function createAlphabet() {
//   for (let i = 0; i < 26; i++) {
//     alphabet.push({
//       numOfSegments: getRandomInt(1,4),
//       startCoordinate: 
//     });

//   }
// }

class Line {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.characterWidth = settings.characterWidth;
    this.characterGap = settings.characterGap;
    this.words = [];
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
    let totalWordWidth = 0;

    do {
      let x, y, width, height;
      x = this.x + totalWordWidth;
      y = this.y;

      // ideal max width is 150px, if there is less space than that then the max width is the remaining empty space
      let maxWidth = this.width + this.x - totalWordWidth > settings.maxCharacterWidth ? settings.maxCharacterWidth : this.width + this.x - totalWordWidth;
      width = getRandomInt(30, maxWidth);
      totalWordWidth += width + this.characterGap;
      height = this.height;

      // Random
      if (totalWordWidth < this.width) {
        this.words.push(new Word(x, y, width, height));
      }
    } while (totalWordWidth < this.width + settings.canvasGap);

    this.words.forEach(word => {
      word.draw();
    })
  }
}

class Word {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.characters = [];
  }

  bounding() {
    stroke('#000');
    strokeWeight(1);
    rect(this.x, this.y, this.width, this.height);
  }

  draw() {
    this.bounding();

    let totalCharacterWidth = 0;
    let width = 0;
    do {
      width = getRandomInt(5, 10);
      totalCharacterWidth += width;

      if (totalCharacterWidth < this.width) {
        this.characters.push(new Character(this.x + totalCharacterWidth, this.y, width, this.height));
      }
    } while (totalCharacterWidth < this.width);

    this.characters.forEach(character => {
      character.draw();
    })
  }
}

class Character {

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  draw() {
    for (let i = 0; i < 1; i++) {
      let lineStyle = getRandomInt(0, 1) == 0 ? 'line' : 'curve';
      // if (i == 0) {
      let x1 = this.x;
      let y1 = this.y + (this.height / 2);
      let x2 = getRandomInt(this.x, this.x + this.width);
      let y2 = getRandomInt(this.y, this.y + this.height);
      // }

      strokeWeight(1);
      stroke('red');

      if (lineStyle == 'curve') {

        beginShape();
        curveVertex(x1, y1);
        curveVertex(x1, y1);

        curveVertex(x2, y2);
        curveVertex(x2, y2);
        endShape();
      } else if (lineStyle == 'line') {
        line(x1, y1, x2, y2);
      }

    }
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
characterSettings.addInput(settings, 'maxCharacterWidth', { min: 10, max: 200, step: 1 });
characterSettings.addInput(settings, 'characterGap', { min: 1, max: 30, step: 1 });
characterSettings.addInput(settings, 'pixelsPerSegment', { min: 1, max: 30, step: 1 });
characterSettings.addInput(settings, 'scale', { min: 1, max: 120, step: 1 });
characterSettings.addInput(settings, 'frequency', { min: 0.0001, max: 0.1, step: 0.0001 });

const saveButton = pane.addButton({ title: 'Save Image' });

saveButton.on('click', function () {
  saveCanvas('generated-image', 'png');
});

pane.on('change', function () {
  redraw();
});