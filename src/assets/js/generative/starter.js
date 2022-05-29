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
	noStroke();
	background('#f5f1e6');
	strokeWeight(1)
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

/* Tweakpane Things
 * ----------------------------------------------- */
const pane = new Tweakpane.Pane()

pane.on('change', function () {
	redraw();
});