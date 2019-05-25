// tuning
var width = 400;
var height = 400;
var zoom = 0;
var fps = 60;

var cellSize = 2;
var gridHeight = height / cellSize;
var gridWidth = width / cellSize;
	
// globals
var canvas;
var context;
var imageData;

next = Array();
cells = Array();
rules_table = Array();
initial_cells_state_rule = Array();

// graphics initialization
const createDrawSurfaces = () => {
	canvas = document.createElement("canvas");
	canvas.width = width;
	canvas.height = height;
	context = canvas.getContext("2d");
	imageData = context.getImageData(0, 0, width, height);

	// add to document
	document.body.appendChild(canvas);
}

const redraw = () => {
	
	context.fillStyle = "black"; // <<-- customize clear/background color here
	context.fillRect(0, 0, width, height);

	for (i = 0; i < gridWidth; i++) {
		for (j = 0; j < gridHeight; j++) {

			let state = cells[i][j].state;

			if (state == 1) {
				
				let h = 0;
				let s = 100;
				let l = 50;

				// let h = get_average_h(cells, i, j);
				// let s = get_average_s(cells, i, j);
				// let l = get_average_l(cells, i, j);

				// let h = get_max_h(cells, i, j);
				// let s = get_max_s(cells, i, j);
				// let l = get_max_l(cells, i, j);

				// let h = get_random_h();
				// let s = get_random_s();
				// let l = get_random_l();

	   			cells[i][j].draw();

    			cells[i][j].h = h;
    			cells[i][j].s = s;
    			cells[i][j].l = l;

			} else if (state == 2){

				let h = 45;
				let s = 100;
				let l = 50;

				// let h = get_average_h(cells, i, j);
				// let s = get_average_s(cells, i, j);
				// let l = get_average_l(cells, i, j);

				// let h = get_max_h(cells, i, j);
				// let s = get_max_s(cells, i, j);
				// let l = get_max_l(cells, i, j);

				// let h = get_random_h();
				// let s = get_random_s();
				// let l = get_random_l();

	   			cells[i][j].draw();

    			cells[i][j].h = h;
    			cells[i][j].s = s;
    			cells[i][j].l = l;

			}
		}
	}

	for (let i = 0; i < gridWidth; i++) {
    	for (let j = 0; j < gridHeight; j++) {
      		
      		let cell_state = cells[i][j].state;
      		let neighbors = count_neighbors(cells, i, j);
      		      		
			if (cell_state == 0){

				next[i][j].state = rules_table[0][neighbors];

			} else if (cell_state == 1){

				next[i][j].state = rules_table[1][neighbors];

			} else if (cell_state == 2){

				next[i][j].state = rules_table[2][neighbors];

			}
		}
	}

	for (let i = 0; i < gridWidth; i++) {
    	for (let j = 0; j < gridHeight; j++) {

    		cells[i][j].state = next[i][j].state;
    		    		
    	}
    }
}

const loop = () => {
	
	redraw();
		
	// allow fps to be modified, using fps global var
	setTimeout(function() {
		requestAnimationFrame(loop);
	}, 1000 / fps);
}

/*
set canvas size to match window
this uses an off-screen canvas with your specified resolution to draw to
it then cleanly resizes and draws this to a second canvas in the browser window
this second canvas is set to the nearest clean multiple of your desired size
*/
const setSize = () => {
	console.log("setting size. base width = " + width + ", base height = " + height);
	console.log("window inner size is " + window.innerWidth + ", " + window.innerHeight);
	// how many times will this fit in horizontally?
	var zoomX = Math.floor(window.innerWidth / width);
	// vertically?
	var zoomY = Math.floor(window.innerHeight / height);
	// the window won't necessarily be a clean match to the shape of the offscreen canvas, so check to see whether width or height will be the limiting factor
	console.log("x / y zoom: " + zoomX + " / " + zoomY);
	// we pick the lower number here. that's how far we can scale up cleanly.
	zoom = Math.min(zoomX, zoomY);
	zoom = Math.max(1, zoom);
	
	// it would be neat to add borders to all canvasses
	canvas.style.borderWidth = zoom + "px";
	
	canvas.style.width = zoom * width + "px";
	canvas.style.height = zoom * height + "px";
	console.log("setting canvas width to " + canvas.style.width);
	console.log("setting canvas height to " + canvas.style.height);
		
	// resizing clears the canvas, so redraw contents
	// imageSmoothingEnabled doesn't work in firefox
	// use webkitImageSmoothingEnabled instead
	context.imageSmoothingEnabled = false; // don't interpolate
	context.mozImageSmoothingEnabled = false;
	context.webkitImageSmoothingEnabled = false;
	context.msImageSmoothingEnabled = false;

	redraw();

	console.log("--------------------------------");
}

const initializeGraphics = () => {
	createDrawSurfaces();
	setSize(); // run once at top, then on resize
	window.onresize = setSize;
}

// entry point
// when everything is loaded, set up and start running
window.onload = () => {
	initialize_arrays();

	// initialize_random_rules();
	initialize_set_rules();

	// initialize_set_cell_states(gridWidth/2, gridHeight/2, (gridWidth/2) + 3, (gridHeight/2) + 3, [0,1,2,2,0,0,0,1,0,2,1,2,1,0,2,2]);
	// initialize_random_cell_states(gridWidth/2, gridHeight/2, (gridWidth/2) + 50, (gridHeight/2) + 50);
	initialize_random_states_all_cells();

	initializeGraphics();	
	loop(); // calling the update loop once starts it running
}

