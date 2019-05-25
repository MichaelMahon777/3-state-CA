function initialize_set_rules(){

	// [0,0,0,0,0,0,0,0,0]

	rules_table = 

	[ [0,0,0,1,0,0,1,1,1], [0,0,0,1,1,0,1,1,1], [0,0,0,1,1,0,1,1,1] ];

	console.log('rules table: ' + '[' + rules_table[0] + '], ' + '[' + rules_table[1] + '], ' + '[' + rules_table[2] + ']');
}

function initialize_random_rules(){

	for (var i = 0; i < 3; i++) {		
		
			rules_table[i] = [];							

	  	for (var j = 0; j < 9; j++) {

	  		rules_table[i][j] = get_random_trinary();
	  	}
	}

	console.log('rules table: ' + '[' + rules_table[0] + '], ' + '[' + rules_table[1] + '], ' + '[' + rules_table[2] + ']');
}

function initialize_arrays(){

	// initialize the 'next' array
	for (var i = 0; i < gridWidth; i++) {	
		
			next[i] = [];							

	  	for (var j = 0; j < gridHeight; j++) {

	  		next[i][j] = new Cell(0, 0, 0, 0, i, j);
	  	}
	}

	// initialize the 'cells' array
	for (var i = 0; i < gridWidth; i++) {	
	
		cells[i] = [];							

  		for (var j = 0; j < gridHeight; j++) {

  			cells[i][j] = new Cell(0, 0, 0, 0, i, j);

  		}
  	}
}

// initialize a block of cells with random state rules
function initialize_random_cell_states(x1, y1, x2, y2){

for (var i = x1; i < (x2 + 1); i++) {	
	
  		for (var j = y1; j < (y2 + 1); j++) {

  			cells[i][j].state = get_random_trinary();

  			initial_cells_state_rule.push(cells[i][j].state);

  		}
  	}

  	console.log('Inital cells state. '+ 'Square Size: ' + initial_cells_state_rule.length + ' States: ' + '[' + initial_cells_state_rule + ']');
 }

// initialize a block of cells with known state rules
function initialize_set_cell_states(x1, y1, x2, y2, array){

	let count = 0;

	for (var i = x1; i < (x2 + 1); i++) {	
	
  		for (var j = y1; j < (y2 + 1); j++) {

  			cells[i][j].state = array[count];

  			count += 1;

  		}
  	}

  	console.log('Inital cells state. '+ 'Square Size: ' + array.length + ' States: ' + '[' + array + ']');
}

function initialize_random_states_all_cells(){

	for (var i = 0; i < gridWidth; i++) {	
	
  		for (var j = 0; j < gridHeight; j++) {

  			cells[i][j].state = get_random_trinary();

  		}
  	}
}