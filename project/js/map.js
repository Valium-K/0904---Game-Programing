function Map() {
	
	this.map;
	this.mapContxt;
	
	this.mapColor;
	this.mapStrokeColor;
	
	this.gameCanvas;
	this.gamemapContext;
	
	this.setMapColor = function(color) { this.mapColor = color; }
	this.setMapStrokeColor = function(stroke) { this.mapStrokeColor = stroke; }
	this.alpha;
	// 맵 init
	this.init = function() {
		this.mapColor = MAP_COLOR;
		this.mapStrokeColor = MAP_STROKE_COLOR;
		this.map = document.getElementById("map");
		this.mapContxt = this.map.getContext("2d");
		this.map.width = MAP_SIZE * 10;
		this.map.height = MAP_SIZE * 10;
		
		this.gameCanvas = document.getElementById("game_canvas");
		this.gamemapContext = this.gameCanvas.getContext("2d");
		this.gameCanvas.width = MAP_SIZE * 10;
		this.gameCanvas.height = MAP_SIZE * 10;
		this.gamemapContext.fillStyle = SNAKE_TAIL_COLOR;
		
		this.drawMap();
	}
	
	this.draw = function() {
		this.drawFruit();
		this.drawSnake();
		this.drawPoop();
		this.drawItem();
	}
	
	this.drawMap = function() {
		this.mapContxt.fillStyle = this.mapColor;
		this.mapContxt.lineWidth = 5;
		this.mapContxt.strokeStyle = this.mapStrokeColor;
		
		for(var height = 0; height < MAP_SIZE / TILE_SIZE; height++) {
			for(var width = 0; width <MAP_SIZE / TILE_SIZE; width++) {
				// map 화면중앙배치
				this.mapContxt.fillRect(((window.innerWidth - MAP_SIZE) / 2) + width * TILE_SIZE,
										((window.innerHeight - MAP_SIZE) / 2) +  + height*TILE_SIZE,
										  TILE_SIZE, TILE_SIZE);		
				this.mapContxt.strokeRect(((window.innerWidth - MAP_SIZE) / 2) + width * TILE_SIZE, 
										  ((window.innerHeight - MAP_SIZE) / 2) +  + height*TILE_SIZE,
 										    TILE_SIZE, TILE_SIZE);
			}
		}
	}

	this.drawSnake = function() {
		this.alpha = 0.4;
		// 꼬리 그리기
		this.gamemapContext.fillStyle = SNAKE_TAIL_COLOR;
		for(let i = snake.getTailOffset(); i < snake.getTail().length; i++) {
			
			// 꼬리 그라데이션
			if(this.alpha <= 1) { this.alpha = (this.alpha * 1.3 * 100) / 100;}
			
			this.gamemapContext.globalAlpha = this.alpha;
			this.gamemapContext.fillRect(((window.innerWidth - MAP_SIZE) / 2) + (snake.getTail()[i].x) + STROKE_SIZE, 
										 ((window.innerHeight - MAP_SIZE) / 2) + (snake.getTail()[i].y) + STROKE_SIZE, 
										   TILE_SIZE - STROKE_SIZE * 2, 
										   TILE_SIZE - STROKE_SIZE * 2);
		}
		this.gamemapContext.globalAlpha = 1.0;
		// 머리그리기
		this.gamemapContext.fillStyle = SNAKE_HEAD_COLOR;
		this.gamemapContext.fillRect(((window.innerWidth - MAP_SIZE) / 2) + snake.getXPos() + STROKE_SIZE, 
									 ((window.innerHeight - MAP_SIZE) / 2) + snake.getYPos() + STROKE_SIZE, 
									   TILE_SIZE - STROKE_SIZE * 2,
									   TILE_SIZE - STROKE_SIZE * 2);
	}
	
	this.drawFruit = function() {
		this.gamemapContext.fillStyle = FRUIT_COLOR;
		this.gamemapContext.fillRect(((window.innerWidth - MAP_SIZE) / 2) + fruit.getXPos() + STROKE_SIZE, 
									 ((window.innerHeight - MAP_SIZE) / 2) + fruit.getYPos() + STROKE_SIZE, 
									   TILE_SIZE - STROKE_SIZE * 2, 
									   TILE_SIZE - STROKE_SIZE * 2);
	}
	
	this.drawItem = function() {
		//console.log(isItemOnTheMap);
		if(gm.isItemOnTheMap) {
			this.gamemapContext.fillStyle = ITEM_COLOR;
			this.gamemapContext.fillRect(((window.innerWidth - MAP_SIZE) / 2) + gm.getItemXPos() + STROKE_SIZE, 
										 ((window.innerHeight - MAP_SIZE) / 2) + gm.getItemYPos() + STROKE_SIZE, 
										   TILE_SIZE - STROKE_SIZE * 2, 
										   TILE_SIZE - STROKE_SIZE * 2);
		}		
	}
	
	this.drawPoop = function() {
		if(!gm.isHardModeOn) { return; }
		this.gamemapContext.fillStyle = SNAKE_POOP_COLOR;
		for(let i = 0; i < snake.getPoopCount(); i++) {
			this.gamemapContext.fillRect(((window.innerWidth - MAP_SIZE) / 2) + (snake.getPoop()[i].x) + STROKE_SIZE, 
										 ((window.innerHeight - MAP_SIZE) / 2) + (snake.getPoop()[i].y) + STROKE_SIZE, 
										   TILE_SIZE - STROKE_SIZE * 2, 
										   TILE_SIZE - STROKE_SIZE * 2);
		}
	}
	
	this.clearObject = function() {
		this.gamemapContext.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
		//this.mapContxt.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
	}
}