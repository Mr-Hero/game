//javscript document

//Constants
var NUMBER_OF_COLUMNS = 10,
	NUMBER_OF_ROWS = 15,
	BRICK_SIZE = 30;

//Grid variables
var gridwidth = NUMBER_OF_COLUMNS*BRICK_SIZE,
	gridheight = NUMBER_OF_ROWS*BRICK_SIZE;

//Canvas variables
var canvas,
	context,
	canvaswidth = gridwidth + 1,
	canvasheight = gridheight + 1;

//application variables
var store = null,
	grid = null,
	selectedbrickclass = null,
	currentbutton = null;

$(document).ready(function(){
	canvas = document.getElementById("grid");
	
	context = canvas.getContext("2d");

	grid = new Grid(gridwidth, gridheight, BRICK_SIZE);
	store = new Store();
	initUI();
	draw();  
});

function clearCanvas(){
	canvas.width = canvaswidth;
	canvas.height = canvasheight;
}

function draw(){
	clearCanvas();
	context.translate(0.5, 0.5);   //将绘制的内容向右下角移动
	grid.draw(context);
}

function initUI(){
	canvas.onclick = onGridClicked;  //ok
	$("#bricks-container button").click(function(event){
		event.preventDefault();

		var id = $(this).attr("id");
		setBrick(id);
	});

	$("#clear-track").click(function(event){
		event.preventDefault();
		grid.clear();
		draw();
	});

	$("#save-track").click(function(event){
		event.cancelable = true;
		event.preventDefault();
		var trackID = store.saveTrack(grid.bricks);
		var trackname = $("#track-name").val();

		addTrackToList(trackID, trackname);
	});
}

function onGridClicked(event){
	var mouseX = event.offsetX || event.layerX ;
	var mouseY = event.offsetY || event.layerY ;

	var column = Math.floor(mouseX/BRICK_SIZE);
	var row = Math.floor(mouseY/BRICK_SIZE);

	var selectbrick = grid.getBrick(column, row);
	if (selectbrick) {
		selectbrick.rotation += 90;
		draw();
	}else{
		createBrickAt(column, row);
	}
}

function createBrickAt(column, row){
	if (!selectedbrickclass) {return;}
	var brick = new selectedbrickclass();
	brick.column = column;
	brick.row = row;

	grid.addBrick(brick, context);
}

function setBrick(id){

	if (currentbutton) {
		$(currentbutton).removeAttr("disabled");
	}

	currentbutton = $("#" + id);
	currentbutton.attr("disabled","disabled");

	switch(id){
		case "square-brick":
			selectedbrickclass = Square;
			break;

		case "triangle-brick":
			selectedbrickclass = Triangle;
			break;

		case "circle-brick":
			selectedbrickclass = Circle;
			break;

		case "curve-brick":
			selectedbrickclass = Curve;
			break;
	}
}

function addTrackToList(id, name){
	var entry = $("<p>");
	var link = $("<a href=''>Load</a>");

	link.click(function(event){
		event.preventDefault();
		loadTrack(id);
	});

	entry.append(link).append("-" + name);
	$("#tracks-container").append(entry);
}

function loadTrack(id){
	grid.bricks = store.getTrack(id);

	draw();
}