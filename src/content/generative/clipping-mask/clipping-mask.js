const settings = {
	canvasWidth: null,
	canvasHeight: null,
	num: 20,
	recs: [],
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
	settings.recs = [];
	
	let x,y,w,h;
	let radius, angle,rx,ry;

	// center context
	translate(settings.canvasWidth / 2, settings.canvasHeight / 2)


	for(i=0; i < settings.num; i++) {
		x = getRandomInt(0, settings.canvasWidth) - settings.canvasWidth/2;
		y = getRandomInt(0, settings.canvasHeight) - settings.canvasHeight/2;
		w = getRandomInt(200,600);
		h = getRandomInt(40,200);
	
		settings.recs.push({x,y,w,h});
	}

	angle = -30;
	
	
	settings.recs.forEach(rect => {
		const {x,y,w,h} = rect;
		stroke('blue');
		strokeWeight(1);
		noFill();

		push();
		translate(x,y);
		drawSkewedRect({w,h,angle});
		pop();
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