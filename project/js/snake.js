/////////////////////////// 전역변수 ///////////////////////////////////////////////

const TILE_SIZE = 32; // Default: 32;
const STROKE_SIZE = TILE_SIZE / 10;
const TILE_NUM = 15;
const MAP_SIZE = TILE_SIZE * TILE_NUM;
var ITEM_SPAWN_RANDOM_NUM = 10;
var isGameOver = false;
var score = 0;


const ITEM_VALUE = 3; // 아이템이 지울 꼬리 길이
var tailOffset = 0; // 아이템으로 지운 꼬리길이 오프셋
var itemCount = 0; // 아이템을 먹은 수 - 실제 꼬리 길이를 구하기 위함
const LENGTH_FOR_ITEM_SPAWN = 10; // SNAKE가 해당 길이 이상일때 아이템 스폰됨

var gameCanvas = document.getElementById("game_canvas");
var gamemapContext = gameCanvas.getContext("2d");
gameCanvas.width = MAP_SIZE;
gameCanvas.height = MAP_SIZE;



const mapInit = function() {
	// 맵 정보 init 및 draw
	var map = document.getElementById("map");
	var mapContxt = map.getContext("2d");
	map.width = MAP_SIZE;
	map.height = MAP_SIZE;

	mapContxt.fillStyle = "#303840";
	mapContxt.lineWidth = 5;
	mapContxt.strokeStyle = "#202830";
		
	for(var height = 0; height < MAP_SIZE / TILE_SIZE; height++) {
		for(var width = 0; width < MAP_SIZE / TILE_SIZE; width++) {
			mapContxt.fillRect(width*TILE_SIZE, height*TILE_SIZE, TILE_SIZE, TILE_SIZE);		
			mapContxt.strokeRect(width*TILE_SIZE, height*TILE_SIZE, TILE_SIZE, TILE_SIZE);
		}
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
	this.x = 0;
	this.y = 0;
	// 타일 오프셋
	this.xOffset = 0;
	this.yOffset = 0;
	// 플레이어 속성
	this.snakeSpeed = 250;
	this.direction = '';
	this.totalEatenFruit = 0;
	gamemapContext.fillStyle = "#ff9900";

	this.tail = [];
	// getter
	this.getXPos = function() { return this.x; }
	this.getYPos = function() { return this.y; }
	this.getXOffset = function() { return this.xOffset; }
	this.getYOffset = function() { return this.yOffset; }
	this.getTotalEatenFruit = function() { return this.totalEatenFruit; }
	this.getTail = function() { return this.tail; }
	
	// setter
	this.setXPos = function(x) {this.x = x;}
	this.setYPos = function(y) {this.y = y;}
	this.setXOffset = function(xo) {this.xOffset = xo;}
	this.setYOffset = function(yo) {this.yOffset = yo;}
	this.setTotalEatenFruit = function(fruitNum) { this.totalEatenFruit = fruitNum;}	

	this.draw = function() {
		
		// 꼬리 그리기
		gamemapContext.fillStyle = "#ff9900";
		for(let i = tailOffset; i < this.tail.length; i++) {
			gamemapContext.fillRect((this.tail[i].x) + STROKE_SIZE, (this.tail[i].y) + STROKE_SIZE, 
										TILE_SIZE - STROKE_SIZE*2, TILE_SIZE - STROKE_SIZE*2);
		}
		
		// 머리그리기
		gamemapContext.fillStyle = "#ff5900";
		gamemapContext.fillRect(this.x + STROKE_SIZE, this.y + STROKE_SIZE, TILE_SIZE - STROKE_SIZE*2, TILE_SIZE - STROKE_SIZE*2);
	}
	
	this.setPos = function() {
		
		// 꼬리 위치 한칸씩 이동 - 꼬리와 머리사이는 null 즉, tail[0]이 꼬리 끝, tail[length-1]이 머리바로 뒤 꼬리
		for(let i = tailOffset; i < this.tail.length - 1; i++) {
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
				
			case 'e':
					
			fruit.pickLocation();
			snake.totalEatenFruit++;
			
				
			
		}
	}
}


function Fruit() {
	this.x;
	this.y;
	
	this.pickLocation = function() {
		this.x = (Math.floor(Math.random() * TILE_NUM - 1) + 1) * TILE_SIZE * 1;
		this.y = (Math.floor(Math.random() * TILE_NUM - 1) + 1) * TILE_SIZE * 1;
	}
	
	this.draw = function() {
		gamemapContext.fillStyle = "#99ff00";
		gamemapContext.fillRect(this.x + STROKE_SIZE, this.y + STROKE_SIZE, TILE_SIZE - STROKE_SIZE*2, TILE_SIZE - STROKE_SIZE*2);
	}
	
	this.fruitManager = function() {
		// 과일 먹으면
		if(snake.x == this.x && snake.y == this.y) {
			this.pickLocation();
			snake.totalEatenFruit++;
		}
	}
}

function GameManagerClass() {
	var itemSpawnNum = 0;
	var itemXPos = 0;
	var itemYPos = 0;
	var isItemOnTheMap = false;
	
	this.init = function() {
		this.itemSpawnNum = Math.floor(Math.random() * ITEM_SPAWN_RANDOM_NUM) + 1;
	}
	this.gameManagement = function() {
		if(isGameOver) {
			confirm("죽음");
		}
		
		// 몸에 닿으면
		for(let i = 0; i < (snake.getTail().length) - 1; i++) {
			if(snake.getXPos() == snake.getTail()[i].x && snake.getYPos() == snake.getTail()[i].y) {
				isGameOver = true;
			}
		}
		// 벽에 닿으면
		if(snake.getXPos() < 0 || snake.getXPos() >= MAP_SIZE || snake.getYPos() < 0 || snake.getYPos() >= MAP_SIZE) {
			isGameOver = true;
		}
		
		// 아이템 스폰 조건 되면
		if(this.itemSpawnNum == Math.floor(Math.random() * ITEM_SPAWN_RANDOM_NUM) + 1 // 랜덤수가 같고
				&& snake.tail.length - (itemCount * ITEM_VALUE) >= LENGTH_FOR_ITEM_SPAWN // 실제 길이가 상수길이보다 크고
				&& isItemOnTheMap == false) { // 맵에 아이템이 없으면
			this.generateItem();
			isItemOnTheMap = true;
		}
		
		// 아이템 먹으면 ITEM_VALUE 만큼 꼬리 길이 감소
		if(snake.getXPos() == this.itemXPos && snake.getYPos() == this.itemYPos) {
			isItemOnTheMap = false;
			var temp = tailOffset + ITEM_VALUE;
			
			for(var i = 0; i < temp; i++) {
				snake.tail[i] = {
					x: -100,
					y: -100
				};
			}	
			this.itemXPos = -200;
			this.itemYPos = -200;
			
			tailOffset = tailOffset + ITEM_VALUE;
			itemCount++;
		}
		
		
	}
	this.setItemSpawnNum = function() {
		this.itemSpawnNum = Math.floor(Math.random() * ITEM_SPAWN_RANDOM_NUM) + 1;
	}
	
	this.setRandomPos = function() {
		this.itemXPos = (Math.floor(Math.random() * TILE_NUM - 1) + 1) * TILE_SIZE * 1;
		this.itemYPos = (Math.floor(Math.random() * TILE_NUM - 1) + 1) * TILE_SIZE * 1;	
	}
	
	this.generateItem = function() {
		this.setItemSpawnNum();
		this.setRandomPos();

	}
	
	this.drawItem = function() {
		console.log(isItemOnTheMap);
		if(isItemOnTheMap) {
			gamemapContext.fillStyle = "#8c00ff";
			gamemapContext.fillRect(this.itemXPos + STROKE_SIZE, this.itemYPos + STROKE_SIZE, TILE_SIZE - STROKE_SIZE*2, TILE_SIZE - STROKE_SIZE*2);
		}		
	}
}

(function init(){
	mapInit();
	
	// 입력 버퍼생성
	queue = new Queue();
	// 플레이어 객체 생성
	snake = new Snake();
	snake.draw();
	
	fruit = new Fruit();
	fruit.pickLocation();
	fruit.draw();
	
	gameManager = new GameManagerClass();
	gameManager.init();
	gameManager.gameManagement();
	
	
	// 업데이트 함수
	window.setInterval(() => {
		
		snake.changeDirection();
		gamemapContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height); 
		fruit.draw();
		snake.setPos();
		snake.draw();
		fruit.fruitManager();
		gameManager.gameManagement();
		gameManager.drawItem();
		
	}, snake.snakeSpeed * 0.5);
}());


// 키입력 이벤트 발생
window.addEventListener("keydown", ((e) => {
	var direction = e.key.replace('Arrow', '');
	queue.push(direction);
}))