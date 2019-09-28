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
		
		// 아이템 위치와 같을때
		if(this.x == gm.getItemXPos() && this.y == gm.getItemYPos()) {
			console.log("fruit: item same location");
			this.pickLocation();
			return;
		}
		
		// 머리 위치와 같을때
		if(this.x == snake.getXPos() && this.y == snake.getYPos()) {
			console.log("fruit: head same location");
			this.pickLocation();
			return;
		}
		
		// 꼬리 위치와 같을때
		for(let i = snake.getTailOffset(); i <= snake.getTail().length - 1; i++) {
			if(this.x == snake.getTail()[i].x && this.y == snake.getTail()[i].y) {
				console.log("fruit: tail same location");
				this.pickLocation();
				return;
			}
		}
		
		// 똥위치와 같을때
		if(gm.isHardModeOn && snake.totalEatenFruit > 0) {
			for(let i = 0; i < snake.poopCount; i++) {
				if(this.x == snake.poop[i].x && this.y == snake.poop[i].y) {
					console.log("fruit: poop same location");
					this.pickLocation();
					return;
				}
		}
		}
		
	}
	
	this.fruitManager = function() {
		// 과일 먹으면
		if(snake.getXPos() == this.x && snake.getYPos() == this.y) {
			this.pickLocation();
			audio.playSFX(FRUIT_EAT);
			snake.totalEatenFruit++;
			snake.poopNow();
			gm.resetCounter();
		}
	}
}