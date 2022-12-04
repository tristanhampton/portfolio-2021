const settings = {
	width: null,
	height: null,
};

let song;

function preload() {
	song = loadSound('../mp3/just-like-a-rainbow.mp3');
}

function setup() {
	noLoop();
	settings.width = getCanvasWidth();
	settings.height = getCanvasWidth();

	// Create and place the canvas
	const canvas = createCanvas(settings.width, settings.height);
	canvas.parent('canvasContainer');
	canvas.mouseClicked(redraw);
}

function draw() {
	noStroke();
	background('#f5f1e6');
	strokeWeight(1);
}


/* Tweakpane Things
* ----------------------------------------------- */
const pane = new Tweakpane.Pane({ title: 'Controls', container: document.querySelector('.project__tweak-settings .container') })
// const folder = pane.addFolder({ title: 'Folder' });
// folder.addInput(settings, 'variable', { min: 0, max: 100, step: 1, label: 'Variable' });
const playPauseButton = pane.addButton({title: 'Play/Pause' })
const saveButton = pane.addButton({ title: 'Save Image' });

saveButton.on('click', function () {
	saveCanvas('generated-image', 'png');
});

playPauseButton.on('click', function() {
	if(song.isPlaying()) {
		song.pause();
	} else {
		song.play();
	}
});

pane.on('change', function () {
	redraw();
});