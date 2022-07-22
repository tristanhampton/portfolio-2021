const settings = {
	canvasWidth: null,
	canvasHeight: null,
	num: 20,
	angle: -30,
	rects: [],
	rectColors: [],
	numColors: 2,
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
	settings.rects = [];
	settings.rectColors = [];

	let x,y,w,h;
	let strokeColor, fillColor;
	
	// center context
	translate(settings.canvasWidth / 2, settings.canvasHeight / 2)
	
	// Set colours that will be used
	// Recommended to use Riso colours, but I didn't add it
	for(i=0; i < settings.numColors; i++) {
		settings.rectColors.push(`rgb(${getRandomInt(0, 255)}, ${getRandomInt(0, 255)}, ${getRandomInt(0, 255)})`)
	}

	for(i=0; i < settings.num; i++) {
		x = getRandomInt(0, settings.canvasWidth) - settings.canvasWidth/2;
		y = getRandomInt(0, settings.canvasHeight) - settings.canvasHeight/2;
		w = getRandomInt(200,1200);
		h = getRandomInt(40,600);

		settings.rects.push({x,y,w,h});
	}

	settings.rects.forEach(rect => {
		strokeColor = settings.rectColors[getRandomInt(0, settings.numColors - 1)];
		fillColor = settings.rectColors[getRandomInt(0, settings.numColors - 1)];
		angle = settings.angle;
		
		blendMode(getRandomInt(0, 1) < 1 ? OVERLAY : BURN);
		const {x,y,w,h} = rect;
		stroke(strokeColor);
		strokeWeight(6);
		fill(fillColor);

		push();
		translate(x,y);
		drawSkewedRect({w,h,angle, strokeColor, fillColor});
		pop();
		blendMode(BLEND);
	});
	
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