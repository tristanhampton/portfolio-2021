const settings = {
	width: null,
	height: null,
};

let points = [];

function setup() {
	settings.width = getCanvasWidth();
	settings.height = getCanvasWidth();

	// Create and place the canvas
	const canvas = createCanvas(settings.width, settings.height);
	canvas.parent('canvasContainer');

	strokeWeight(1);
	points.push(new Point({x:200, y:540}));
	points.push(new Point({x:200, y:850, control:true}));
	points.push(new Point({x:800,y:540}));
}

function draw() {
	background('#f5f1e6');

	noFill();
	beginShape();
	vertex(points[0].x, points[0].y)
	quadraticVertex(points[1].x, points[1].y, points[2].x, points[2].y)
	endShape();

	points.forEach(point => {
		point.draw();
	});
}

function mousePressed(e) {
	const x = e.offsetX;
	const y = e.offsetY;
	console.log('mouse pressed')
	
	points.forEach(point => {
		point.isDragging = point.hitTest(x,y);
	});
}

function mouseDragged(e) {
	const x = e.offsetX;
	const y = e.offsetY;

	points.forEach(point => {
		if(point.isDragging) {
			point.x = x;
			point.y = y;
		}
	});
}

// const onMouseDown = (e) => {
// 	window.addEventListener('mousemove', onMouseDown);
// 	window.addEventListener('mouseup', onMouseUp);
// }

// const onMouseMove = (e) => {
	
// }

// const onMouseUp = () => {
// 	window.removeEventListener('mousemove', onMouseDown);
// 	window.removeEventListener('mouseup', onMouseUp);
// }

class Point {
	constructor({x,y,control = false}) {
		this.x = x;
		this.y = y;
		this.control = control;
	}

	hitTest(x,y) {
		const dx = this.x - x;
		const dy = this.y - y;
		const dd = Math.sqrt(dx*dx + dy*dy);

		return dd < 20;
	}

	draw() {
		let fillStyle = this.control ? 'red' : 'black';
		push();
		fill(fillStyle);
		noStroke();
		translate(this.x, this.y)
		beginShape();
		circle(0,0,10);
		endShape();
		pop();
	}
}


/* Tweakpane Things
* ----------------------------------------------- */
const pane = new Tweakpane.Pane({ title: 'Controls', container: document.querySelector('.project__tweak-settings .container') })
// const folder = pane.addFolder({ title: 'Folder' });
// folder.addInput(settings, 'variable', { min: 0, max: 100, step: 1, label: 'Variable' });
const saveButton = pane.addButton({ title: 'Save Image' });

saveButton.on('click', function () {
	saveCanvas('generated-image', 'png');
});

pane.on('change', function () {
	redraw();
});