function Fruit() {
	this.x;
	this.y;

	this.getXPos = function() { return this.x; }
	this.getYPos = function() { return this.y; }
	
	this.setXPos = function(x) {this.x = x;}
	this.setYPos = function(y) {this.y = y;}
	
	this.init = function() {
		this.pickLocation();
	}
	
	this.pickLocation = function() {
		this.x = (Math.floor(Math.random() * TILE_NUM - 1) + 1) * TILE_SIZE * 1;
		this.y = (Math.floor(Math.random() * TILE_NUM - 1) + 1) * TILE_SIZE * 1;

		if(this.x == gm.getItemXPos() && this.y == gm.getItemYPos()) {
			this.pickLocation();
			return;
		}
		for(let i = snake.getTailOffset(); i < snake.getTail().length - 1; i++) {
			if(this.x == snake.getTail()[i].x && this.y == snake.getTail()[i].y) {
				console.log("called by fruit side - same location");
				this.pickLocation();
				return;
			}
		}
	}
	
	this.fruitManager = function() {
		// 과일 먹으면
		if(snake.getXPos() == this.x && snake.getYPos() == this.y) {
			this.pickLocation();
			snake.totalEatenFruit++;
			snake.poopNow();
		}
	}
}