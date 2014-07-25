// javascript document
var Square = function(){
	this.row = 0;
	this.column = 0;
	this.type = "Square";
	this.rotation = 0;
}

Square.prototype.draw = function(context){
	context.save();  //保存context的当前状况
	context.translate(this.column*BRICK_SIZE, this.row*BRICK_SIZE);
	context.fillColor = 0;
	context.fillRect(0, 0, BRICK_SIZE, BRICK_SIZE);
	context.restore();
}