const settings = {
	canvasWidth: null,
	canvasHeight: null,
};

function setup() {
	noLoop();
	setCanvasWidth();
	const canvas = createCanvas(settings.canvasWidth, settings.canvasHeight);
	canvas.parent('canvasContainer');
	canvas.mouseClicked(redraw);
}

function draw() {

}

function windowResized() {
	// Do resizing things here
}

function setCanvasWidth() {
	const container = document.querySelector('#canvasContainer');
	const width = container.offsetWidth;
	const padding = getStyle(container, 'padding-left');

	// I want a perfect square, so set height the same
	settings.canvasWidth = width - padding - padding;
	settings.canvasHeight = width - padding - padding;
}

/* Tweakpane Things
 * ----------------------------------------------- */
const pane = new Tweakpane.Pane()

pane.on('change', function () {
	redraw();
});