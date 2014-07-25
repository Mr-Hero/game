//javascript document
var Grid = function(width, height, cellsize){
	this.width = width;
	this.height = height;
	this.cellsize = cellsize;
	this.bricks = [];
}

Grid.prototype.draw = function(context){
	this.drawGrid(context);

	for (var i = 0; i < this.bricks.length; i++) {
		this.bricks[i].draw(context);
	};
}

Grid.prototype.drawGrid = function(context){
	context.strokeRect(0, 0, this.width, this.height);

	var numberOfColumns = this.width/this.cellsize;
	var numberOfRows = this.height/this.cellsize;

	context.beginPath();
	for (var column = 0; column < numberOfColumns; column++) {
		context.moveTo(column*this.cellsize, 0);
		context.lineTo(column*this.cellsize,this.height);
	};
	for (var row = 0; row < numberOfRows; row++) {
		context.moveTo(0,row*this.cellsize);
		context.lineTo(this.width,row*this.cellsize);
	};
	context.stroke();
}

Grid.prototype.addBrick = function(brick, context){
	this.bricks.push(brick);
	brick.draw(context);
}

Grid.prototype.getBrick = function(column, row){
	for(var i=0; i<this.bricks.length; i++){
		if (this.bricks[i].column === column && this.bricks[i].row === row) {
			return this.bricks[i];
		}
	}
	return null;
}

Grid.prototype.clear = function(){
	this.bricks = [];
}