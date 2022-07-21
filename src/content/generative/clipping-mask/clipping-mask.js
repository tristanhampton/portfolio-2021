const settings = {
	canvasWidth: null,
	canvasHeight: null,
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
	strokeWeight(1)

	let x,y,w,h;
	let radius, angle,rx,ry;

	x = settings.canvasWidth * 0.5;
	y = settings.canvasHeight * 0.5;
	w = settings.canvasWidth * 0.6;
	h = settings.canvasHeight * 0.1;

	translate(x,y);
	stroke('blue');
	noFill();

	drawSkewedRect({degrees:23});
	
}

/* Functions
 * ----------------------------------------------- */
const drawSkewedRect = ({w = 600,h = 200,degrees = -45}) => {
	const angle = radians(degrees);
	const rx = Math.cos(angle) * w;
	const ry = Math.sin(angle) * w;

	push();
	translate(rx * -0.5, (ry + h) * -0.5);

	beginShape();
	vertex(0, 0);
	vertex(rx, ry);
	vertex(rx, ry + h);
	vertex(0, h);
	vertex(0, 0)
	endShape();
	pop();
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