function GameManager() {
	this.itemSpawnNum = 0;
	this.itemXPos;
	this.itemYPos;
	this.isItemOnTheMap;
	this.isItNewScore;
	this.isGameOver;
	this.highScore;
	this.itemCount; // 아이템을 먹은 수 - 실제 꼬리 길이를 구하기 위함
	this.isHardModeOn = false;
	
	this.timeCounterAddress;
	this.nowTime = 0;
	this.timeLeft;
	
	
	this.getItemXPos = function() { return this.itemXPos; }
	this.getItemYPos = function() { return this.itemYPos; }
	
	this.init = function() {
		this.itemSpawnNum = Math.floor(Math.random() * ITEM_SPAWN_RANDOM_NUM) + 1;
		this.itemXPos = null;
		this.itemYPos = null;
		this.isItemOnTheMap = false;
	
		this.isGameOver = false;
		this.highScore = 0;
		this.itemCount = 0;
		this.timeLeft = SNAKE_HUNGER_TIME;
	}
	
	this.gameManager = function() {
		if(this.isGameOver) {
			audio.bgm.pause();
			audio.playSFX(RESULT);
			
			window.setTimeout(() => {
				audio.resultBgm();
			}, 500);
			
			if(this.isHardModeOn) {
				if(localStorage.getItem("highScore-hard") < snake.totalEatenFruit) {
					this.isItNewScore = true;
					localStorage.setItem("highScore-hard", snake.totalEatenFruit);
				}
			}
			else {
				if(localStorage.getItem("highScore") < snake.totalEatenFruit) {
					this.isItNewScore = true;
					localStorage.setItem("highScore", snake.totalEatenFruit);
				}
			}
		ui.resultMenu();
		}
		
		// 몸에 닿으면
		for(let i = 0; i < (snake.getTail().length) - 1; i++) {
			if(snake.getXPos() == snake.getTail()[i].x && snake.getYPos() == snake.getTail()[i].y) {
				console.log("body hit");
				this.isGameOver = true;
			}
		}
		
		// 벽에 닿으면
		if(snake.getXPos() < 0 || snake.getXPos() >= MAP_SIZE || 
		   snake.getYPos() < 0 || snake.getYPos() >= MAP_SIZE) {
			
			console.log("wall hit");
			
			snake.setXPos(-1000);
			snake.setYPos(-1000);
			this.isGameOver = true;
		}
		
		// 아이템 스폰 조건 되면
		if(this.itemSpawnNum == Math.floor(Math.random() * ITEM_SPAWN_RANDOM_NUM) + 1 // 랜덤수가 같고
				&& snake.getTail().length - (this.itemCount * ITEM_VALUE) >= LENGTH_FOR_ITEM_SPAWN // 실제 길이가 상수길이보다 크고
				&& this.isItemOnTheMap == false) { // 맵에 아이템이 없으면
			this.generateItem();
			this.isItemOnTheMap = true;
		}

		// 아이템 먹으면 ITEM_VALUE 만큼 꼬리 길이 감소
		if(snake.getXPos() == this.itemXPos && snake.getYPos() == this.itemYPos) {
			this.isItemOnTheMap = false;
			
			var tailOffset = snake.getTailOffset() + ITEM_VALUE;
			
			for(var i = 0; i < tailOffset; i++) {
				snake.tail[i] = {
					x: -500,
					y: -500
				};
			}	
			
			// 아이템 맵 밖으로 빼고
			this.itemXPos = -700;
			this.itemYPos = -700;
			
			// 아이템 기능 처리
			snake.setTailOffset(snake.getTailOffset() + ITEM_VALUE);
			this.itemCount++;
		}
		
		// 똥 밟으면
		if(gm.isHardModeOn) {
			for(let i = 0; i < snake.poopCount; i++) {
				if(snake.getXPos() == snake.poop[i].x && snake.getYPos() == snake.poop[i].y) {
					console.log("poop hit");
					this.isGameOver = true;
				}
			}
		}
		
		if(this.timeLeft <= 0) {
			this.isGameOver = true;
			this.timeLeft = 0;
		}
	}
	
	this.restartGame = function() {
		snake.init();
		fruit.pickLocation();
		gm.init();
		gm.timeCounter();
	}
	
	this.generateItem = function() {
		if(this.isHardModeOn) {
			window.setTimeout(() => {
				if(this.isItemOnTheMap) {
					this.itemXPos = -700;
					this.itemYPos = -700;

					this.isItemOnTheMap = false;
					
				}
			}, ITEM_TIMEOUT);
		}
			this.setItemSpawnNum();
			this.setRandomPos();
	}
	
	this.setItemSpawnNum = function() {
		this.itemSpawnNum = Math.floor(Math.random() * ITEM_SPAWN_RANDOM_NUM) + 1;
	}
	
	this.setRandomPos = function() {
		this.itemXPos = (Math.floor(Math.random() * TILE_NUM - 1) + 1) * TILE_SIZE * 1;
		this.itemYPos = (Math.floor(Math.random() * TILE_NUM - 1) + 1) * TILE_SIZE * 1;	
		
		// 과일 위치와 다르게
		if(this.itemXPos == fruit.getXPos() && this.itemYPos == fruit.getYPos()) {
			console.log("called by poop side - same location");
			this.setRandomPos();
			return;
		}
		
		// 꼬리 위치와 다르게
		for(let i = 0; i < snake.getTail().length - 1; i++) {
			if(this.itemXPos == snake.getTail()[i].x && this.itemYPos == snake.getTail()[i].y) {
				console.log("called by tail side - same location");
				this.setRandomPos();
				return;
			}
		}
		
		// 똥 위치와 다르게
		for(let i = 0; i < snake.poopCount; i++) {
			if(this.itemXPos == snake.poop[i].x && this.itemYPos == snake.poop[i].y) {
				console.log("called by poop side - same location");
				this.setRandomPos();
				return;
			}
		}
	}
	
	this.modeChanger = function() {
		if(!this.isHardModeOn) {
			
			// change to hard mode
			document.getElementById("body").style.background = MAP_STROKE_COLOR_HARD;
			map.mapColor = MAP_COLOR_HARD;
			map.mapStrockColor = MAP_STROKE_COLOR_HARD;
			map.draw();
			this.isHardModeOn = true;
		}
		else {
			// change to normal mode
			document.getElementById("body").style.background = MAP_STROKE_COLOR;
			map.mapColor = MAP_COLOR;
			map.mapStrockColor = MAP_STROKE_COLOR;
			map.draw();
			this.isHardModeOn = false;
		}
	}
	

	
	this.startGame = function() {
		audio.inGameBgm();
		ui.isItTitle = false;
		
		if(this.isHardModeOn) { return; }
		this.timeCounter();
	}
	
	this.timeCounter = function() {
		// 일정시간 지나면 게임오버

		this.nowTime = new Date().getTime();
		this.timeCounterAddress = setInterval(() => {
			
			var now = new Date().getTime();
			this.timeLeft = (now - this.nowTime);
			this.timeLeft = SNAKE_HUNGER_TIME - this.timeLeft;
			
			
		}, 100);
	}
	
	this.resetCounter = function() {
		if(this.isHardModeOn) { return; }
		
		clearInterval(this.timeCounterAddress);
		
		this.timeCounter();
	}
}