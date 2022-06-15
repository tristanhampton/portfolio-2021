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