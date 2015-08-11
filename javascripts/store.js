//javascript
var Store = function(){
	this.tracks = [];
}

Store.prototype.saveTrack = function(brickArray){
	var brickValues = brickArray.map(this.getDataForBrick);
	var trackJSON = JSON.stringify(brickArray);

	this.tracks.push(trackJSON);
	return this.tracks.length - 1;
}

Store.prototype.getDataForBrick = function(brick){
	var values = {};
	values.column = brick.column;
	values.row = brick.row;
	values.type = brick.type;
	values.rotation = brick.rotation;
	return values;
}

Store.prototype.getTrack = function(id){
	var trackJSON = this.tracks[id];
	var brickValues = JSON.parse(trackJSON);
	console.table(brickValues.map(this.getBrickForData))
	return brickValues.map(this.getBrickForData);
}

Store.prototype.getBrickForData = function(brickData){
	var brick = new window[brickData.type]();

	brick.column = brickData.column;
	brick.row = brickData.row;
	brick.rotation = brickData.rotation;

	return brick;
}