function Map() {
	
	this.map;
	this.mapContxt;
	
	this.mapColor;
	this.mapStrockColor;
	
	this.gameCanvas;
	this.gamemapContext;
	
	// 맵 init
	this.init = function() {
		this.mapColor = MAP_COLOR;
		this.mapStrockColor = MAP_STROKE_COLOR;
		this.map = document.getElementById("map");
		this.mapContxt = this.map.getContext("2d");
		this.map.width = MAP_SIZE * 10;
		this.map.height = MAP_SIZE * 10;
		
		this.gameCanvas = document.getElementById("game_canvas");
		this.gamemapContext = this.gameCanvas.getContext("2d");
		this.gameCanvas.width = MAP_SIZE * 10;
		this.gameCanvas.height = MAP_SIZE * 10;
		this.gamemapContext.fillStyle = SNAKE_TAIL_COLOR;
	}
	this.draw = function() {
		this.drawMap();
		this.drawFruit();
		this.drawSnake();
		this.drawPoop();
		this.drawItem();
	}
	this.drawMap = function() {
		this.mapContxt.fillStyle = this.mapColor;
		this.mapContxt.lineWidth = 5;
		this.mapContxt.strokeStyle = this.mapStrockColor;
		
		for(var height = 0; height < MAP_SIZE / TILE_SIZE; height++) {
			for(var width = 0; width <MAP_SIZE / TILE_SIZE; width++) {
				this.mapContxt.fillRect(((window.innerWidth - MAP_SIZE) / 2) + width * TILE_SIZE, ((window.innerHeight - MAP_SIZE) / 2) +  + height*TILE_SIZE, TILE_SIZE, TILE_SIZE);		
				this.mapContxt.strokeRect(((window.innerWidth - MAP_SIZE) / 2) + width * TILE_SIZE, ((window.innerHeight - MAP_SIZE) / 2) +  + height*TILE_SIZE, TILE_SIZE, TILE_SIZE);
			}
		}
	}
	this.drawSnake = function() {
				
		// 꼬리 그리기
		this.gamemapContext.fillStyle = SNAKE_TAIL_COLOR;
		for(let i = snake.tailOffset; i < snake.tail.length; i++) {
			this.gamemapContext.fillRect(((window.innerWidth - MAP_SIZE) / 2) + (snake.tail[i].x) + STROKE_SIZE, ((window.innerHeight - MAP_SIZE) / 2) + (snake.tail[i].y) + STROKE_SIZE, 
										TILE_SIZE - STROKE_SIZE*2, TILE_SIZE - STROKE_SIZE*2);
		}
		
		// 머리그리기
		this.gamemapContext.fillStyle = SNAKE_HEAD_COLOR;
		this.gamemapContext.fillRect(((window.innerWidth - MAP_SIZE) / 2) + snake.getXPos() + STROKE_SIZE, ((window.innerHeight - MAP_SIZE) / 2) + snake.getYPos() + STROKE_SIZE, TILE_SIZE - STROKE_SIZE*2, TILE_SIZE - STROKE_SIZE*2);
	}
	
	this.drawFruit = function() {
		this.gamemapContext.fillStyle = FRUIT_COLOR;
		this.gamemapContext.fillRect(((window.innerWidth - MAP_SIZE) / 2) + fruit.getXPos() + STROKE_SIZE, ((window.innerHeight - MAP_SIZE) / 2) + fruit.getYPos() + STROKE_SIZE, TILE_SIZE - STROKE_SIZE*2, TILE_SIZE - STROKE_SIZE*2);
	}
	
	this.drawItem = function() {
		//console.log(isItemOnTheMap);
		if(gm.isItemOnTheMap) {
			this.gamemapContext.fillStyle = ITEM_COLOR;
			this.gamemapContext.fillRect(((window.innerWidth - MAP_SIZE) / 2) + gm.itemXPos + STROKE_SIZE, ((window.innerHeight - MAP_SIZE) / 2) + gm.itemYPos + STROKE_SIZE, TILE_SIZE - STROKE_SIZE*2, TILE_SIZE - STROKE_SIZE*2);
		}		
	}
	
	this.drawPoop = function() {
		if(!gm.isHardModeOn) { return; }
		this.gamemapContext.fillStyle = "#852068";
		for(let i = 0; i < snake.poopCount; i++) {
			this.gamemapContext.fillRect(((window.innerWidth - MAP_SIZE) / 2) + (snake.poop[i].x) + STROKE_SIZE, ((window.innerHeight - MAP_SIZE) / 2) + (snake.poop[i].y) + STROKE_SIZE, 
										TILE_SIZE - STROKE_SIZE*2, TILE_SIZE - STROKE_SIZE*2);
		}
	}
	
	this.clearObject = function() {
		this.gamemapContext.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
		this.mapContxt.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
	}
}