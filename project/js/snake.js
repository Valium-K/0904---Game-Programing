
/////////////////////////// 전역변수 ///////////////////////////////////////////////

// MAP 상수
const TILE_SIZE = 32; // Default: 32;
const STROKE_SIZE = TILE_SIZE / 10; // 테두리 사이즈
const TILE_NUM = 15; // 타일 수
const MAP_SIZE = TILE_SIZE * TILE_NUM; // 맵 사이즈
const MAP_COLOR = "#303840";
const MAP_STROKE_COLOR = "#202830";

// 지렁이 상수
const SNAKE_SPEED = 250 * 0.5; // 지렁이 스피드
const SNAKE_HEAD_COLOR = "#ff5900"; // 지렁이 머리 색상
const SNAKE_TAIL_COLOR = "#ff9900"; // 지렁이 꼬리 색상

// 아이템 상수
const ITEM_SPAWN_RANDOM_NUM = 75; // 아이템이 이 랜덤수와 같아야 스폰됨
const LENGTH_FOR_ITEM_SPAWN = 10; // SNAKE가 해당 길이 이상일때 아이템 스폰됨
const ITEM_VALUE = 3; // 아이템이 지울 꼬리 길이
const ITEM_COLOR = "#8c00ff";

// FRUIT 상수
const FRUIT_COLOR = "#99ff00";

// UI 상수

/////////////////////////////////////////////////////////////////////////////////

function Map() {
	
	this.map;
	this.mapContxt;
	
	this.gameCanvas;
	this.gamemapContext;
	
	// 맵 init
	this.init = function() {
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
		this.drawMap(); //타일이 30개 이상 일경우 급격히 느려짐
		this.drawFruit();
		this.drawSnake();
		this.drawItem();
	}
	this.drawMap = function() {
		this.mapContxt.fillStyle = MAP_COLOR;
		this.mapContxt.lineWidth = 5;
		this.mapContxt.strokeStyle = MAP_STROKE_COLOR;
		
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
	this.clearObject = function() {
		this.gamemapContext.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
		this.mapContxt.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
	}
}

function Queue() {
	// 키입력 버퍼 큐
	this.dir = [2];
	this.index = 0;
	this.top = 0;
	
	// Enqueue
	this.push = function(direction) {
		if(this.top >= 2) this.top = this.top - 1;
		this.dir[this.top] = direction;
		this.top = this.top + 1;
	}
	
	// Deqeue
	this.pop = function() {
		if(this.top == 0) {
			return;
		}
		if(this.top == 1) {
			var nowDir = this.dir[this.index];
			this.top--;
			return nowDir;
		}
		if(this.top >= 2) {
			var nowDir = this.dir[this.index];
			this.dir[this.index] = this.dir[this.top-1];
			this.top--;
			return nowDir;
		}
	}	
}


function Snake() {
	// 플레이어 위치 - 타일 오프셋에 기반함
	this.x;
	this.y;
	
	// 타일 오프셋
	this.xOffset;
	this.yOffset;
	
	// 플레이어 속성
	this.direction;
	this.totalEatenFruit;

	this.tail = [];
	this.tailOffset; // 아이템으로 지운 꼬리길이 오프셋
	
	// getter
	this.getXPos = function() { return this.x; }
	this.getYPos = function() { return this.y; }
	this.getXOffset = function() { return this.xOffset; }
	this.getYOffset = function() { return this.yOffset; }
	this.getTotalEatenFruit = function() { return this.totalEatenFruit; }
	this.getTail = function() { return this.tail; }
	this.getTailOffset = function() { return this.tailOffset; }
	// setter
	this.setXPos = function(x) {this.x = x;}
	this.setYPos = function(y) {this.y = y;}
	this.setXOffset = function(xo) {this.xOffset = xo;}
	this.setYOffset = function(yo) {this.yOffset = yo;}
	this.setTotalEatenFruit = function(fruitNum) { this.totalEatenFruit = fruitNum; }	
	this.setTailOffset = function(to) { this.tailOffset = to; }
	
	this.init = function() {
		this.x = TILE_SIZE * Math.floor(TILE_NUM / 2);
		this.y = TILE_SIZE * Math.floor(TILE_NUM / 2);
		
		this.xOffset = 0;
		this.yOffset = 0;
	
		this.direction = '';
		this.totalEatenFruit = 0;

		this.tail = [];
		this.tailOffset = 0;
	}
	this.setPos = function() {
		if(gm.isGameOver){ return; }
		// 꼬리 위치 한칸씩 이동 - 꼬리와 머리사이는 null 즉, tail[0]이 꼬리 끝, tail[length-1]이 머리바로 뒤 꼬리
		for(let i = this.tailOffset; i < this.tail.length - 1; i++) {
			this.tail[i] = this.tail[i + 1];
		}
		
		// 머리가 있던 자리에 가장 앞 꼬리 추가
		this.tail[this.totalEatenFruit - 1] = {
			x: this.x,
			y: this.y
		};
		
		// 머리위치 갱신
		this.x += this.xOffset;
		this.y += this.yOffset;
	}
	
	this.changeDirection = function() {		
		
		switch(queue.pop()) {
			case 'Up':
				if(this.direction == 'Down') break;
				this.xOffset = 0;
				this.yOffset = TILE_SIZE * -1;
				this.direction = 'Up';
				break;
				
			case 'Down':
				if(this.direction == 'Up') break;
				this.xOffset = 0;
				this.yOffset = TILE_SIZE * 1;
				this.direction = 'Down';
				break;
				
			case 'Left':
				if(this.direction == 'Right') break;
				this.xOffset = TILE_SIZE * -1;
				this.yOffset = 0;
				this.direction = 'Left';
				break;
				
			case 'Right':
				if(this.direction == 'Left') break;
				this.xOffset = TILE_SIZE * 1;
				this.yOffset = 0;
				this.direction = 'Right';
				break;
		}
	}
}


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
		}
	}
}

function GameManager() {
	this.itemSpawnNum = 0;
	this.itemXPos;
	this.itemYPos;
	this.isItemOnTheMap;
	this.isItNewScore;
	this.isGameOver;
	this.highScore;
	this.itemCount; // 아이템을 먹은 수 - 실제 꼬리 길이를 구하기 위함
	
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
		
	}
	this.gameManager = function() {
		if(this.isGameOver) {
			if(localStorage.getItem("highScore") < snake.totalEatenFruit) {
				this.highScore = snake.totalEatenFruit;
				this.isItNewScore = true;
				localStorage.setItem("highScore", snake.totalEatenFruit);
			}
			ui.resultMenu();
		}
		
		// 몸에 닿으면
		for(let i = 0; i < (snake.getTail().length) - 1; i++) {
			if(snake.getXPos() == snake.getTail()[i].x && snake.getYPos() == snake.getTail()[i].y) {
				this.isGameOver = true;
				console.log("body Hit");
			}
		}
		// 벽에 닿으면
		if(snake.getXPos() < 0 || snake.getXPos() >= MAP_SIZE || snake.getYPos() < 0 || snake.getYPos() >= MAP_SIZE) {
			snake.setXPos(-1000);
			snake.setYPos(-1000);
			this.isGameOver = true;
			console.log("wall Hit");
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
					x: -100,
					y: -100
				};
			}	
			this.itemXPos = -200;
			this.itemYPos = -200;
			
			snake.setTailOffset(snake.getTailOffset() + ITEM_VALUE);
			this.itemCount++;
		}		
	}
	this.restartGame = function() {
		snake.init();
		
		fruit.pickLocation();
		
		gm.init();
		
	}
	this.setItemSpawnNum = function() {
		this.itemSpawnNum = Math.floor(Math.random() * ITEM_SPAWN_RANDOM_NUM) + 1;
	}
	
	this.setRandomPos = function() {
		this.itemXPos = (Math.floor(Math.random() * TILE_NUM - 1) + 1) * TILE_SIZE * 1;
		this.itemYPos = (Math.floor(Math.random() * TILE_NUM - 1) + 1) * TILE_SIZE * 1;	

		if(this.itemXPos == fruit.getXPos() && this.itemYPos == fruit.getYPos()) {
			this.setRandomPos();
			return;
		}
		
		for(let i = snake.getTailOffset(); i < snake.getTail().length - 1; i++) {
			if(this.itemXPos == snake.getTail()[i].x && this.itemYPos == snake.getTail()[i].y) {
				console.log("called by item side - same location");
				this.setRandomPos();
				return;
			}
		}
	}
	
	this.generateItem = function() {
		this.setItemSpawnNum();
		this.setRandomPos();
	}

}
function Ui() {
	this.isItTitle;
	this.isItResult;
	
	this.init = function() {
		this.isItTitle = true;
		
		this.ui = document.getElementById("ui");
		this.uiContext = this.ui.getContext("2d");
		this.uiContext.textBaseline  = "top";
		
		this.ui.width = window.innerWidth;
		this.ui.height = window.innerHeight;	
	}

	
	this.titleMenu = function() {
		if(this.isItTitle) {
			this.uiContext.fillStyle = "#e0e0e0";
			this.uiContext.font = '500% Arial';
			
			this.uiContext.fillText("S N A K E", window.innerWidth / 2 - 180, window.innerHeight / 2 * 0.25);

			this.uiContext.font = '150% Arial';
			this.uiContext.fillText("Press any key to start", window.innerWidth / 2 - 115, window.innerHeight / 2 * 1.9);	
		}
	}
	this.resultMenu = function() {
			this.uiContext.fillStyle = "#e0e0e0";
			this.uiContext.font = '320% Arial';
			this.uiContext.fillText("H I G H S C O R E : " + localStorage.getItem("highScore"), window.innerWidth / 2 - 250, window.innerHeight / 2 * 0.2);
			
			if(gm.isItNewScore) {
				this.uiContext.font = '400% Arial';
				this.uiContext.fillText("!! N E W  S C O R E !!", window.innerWidth / 2 - 310, window.innerHeight / 2 * 0.65);
			}
			else {
				this.uiContext.font = '400% Arial';
				this.uiContext.fillText("R E S U L T", window.innerWidth / 2 - 170, window.innerHeight / 2 * 0.65);
			}

			
			this.uiContext.fillStyle = "#870029";
			this.uiContext.font = '1000% Arial';
			this.uiContext.fillText(snake.totalEatenFruit, window.innerWidth / 2 - 40, window.innerHeight / 2 * 1.1);	
			
			this.uiContext.fillStyle = "#e0e0e0";
			this.uiContext.font = '150% Arial';
			this.uiContext.fillText("Press any key to restart", window.innerWidth / 2 - 115, window.innerHeight / 2 * 1.9);	
		
	}
	this.uiManager = function() {
			this.uiContext.clearRect(0, 0, this.ui.width, this.ui.height);
			this.uiContext.fillText("", 0, 0);
	}
}
(function init(){
	// high score init
	if(localStorage.getItem("highScore") == null) {
		localStorage.setItem("highScore", 0);	
	}	
	
	// gameManager 객체 생성
	gm = new GameManager();
	gm.init();
	
	ui = new Ui();
	ui.init();	
	
	// 맵 객체 생성
	map = new Map();
	map.init();
	
	// 입력 버퍼생성
	queue = new Queue();
	
	// 플레이어 객체 생성
	snake = new Snake();
	snake.init();
	
	// fruit 객체 생성
	fruit = new Fruit();
	fruit.init();

	// 업데이트 함수
	window.setInterval(() => {
		ui.uiManager();ui.titleMenu();
		snake.changeDirection();
		map.clearObject();
		snake.setPos();
		fruit.fruitManager();
		gm.gameManager();
		map.draw();
		console.log(gm.isItNewScore);
	}, SNAKE_SPEED);
}());


// 키입력 이벤트 발생
window.addEventListener("keydown", ((e) => {
	var direction = e.key.replace('Arrow', '');
	
	// 타이틀 화면이라면 게임시작
	if(ui.isItTitle == true) {
		ui.isItTitle = false;
	}
	
	// 게임오버시 방향키는 무시 - 이 코드를 빼면 사용자가 가끔 자기 스코어 못 봄
	if(gm.isGameOver == true && (direction == "Down" || 
										direction == "Up" ||
										direction == "Left" || 
										direction == "Right")) {
		return;
	}
	
	// 게임오버시 방향키 제외한 키입력시 재시작
	if(gm.isGameOver == true && (direction != "Down" || 
										direction != "Up" ||
										direction != "Left" || 
										direction != "Right")){
		gm.isGameOver = false;
		gm.isItNewScore = false;
		gm.restartGame();
	}
	
	queue.push(direction);

}))