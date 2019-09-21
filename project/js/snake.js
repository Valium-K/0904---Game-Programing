var snakeSize = 32;
var mapSize = snakeSize * 15;

var map = document.getElementById("map");
var context = map.getContext("2d");
map.width = mapSize;
map.height = mapSize;

var playerCanvas = document.getElementById("player_canvas");
var playerContext = playerCanvas.getContext("2d");
playerCanvas.width = mapSize;
playerCanvas.height = mapSize;

/*
context.width = mapSize;
context.height = mapSize;
*/

////////////////////////////////draw map/////////////////////////////////////////

context.fillStyle = "#303840";
context.lineWidth = 5;
context.strokeStyle = "#202830";
		
for(var height = 0; height < mapSize/snakeSize; height++) {
	for(var width = 0; width < mapSize/snakeSize; width++) {
		
		context.fillRect(width*snakeSize, height*snakeSize, snakeSize, snakeSize);		
		context.strokeRect(width*snakeSize, height*snakeSize, snakeSize, snakeSize);
	}
}

/////////////////////////////////////////////////////////////////////////

function Q() {
	// 키입력 버퍼 큐
	this.dir = [2];
	this.index = 0;
	this.top = 0;

	this.push = function(direction) {
		if(this.top >= 2) {this.top = this.top - 1;}
		this.dir[this.top] = direction;
		this.top = this.top + 1;
		//console.log(this.dir[this.index] + this.index + " " + this.top);
		//console.log(this.dir[this.index+1] + this.index + " " + this.top);
	}
	
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
	this.xOffset = snakeSize * 1;
	this.yOffset = 0;
	
	// 플레이어 속성
	this.snakeSpeed = 250;
	this.direction;
	playerContext.fillStyle = "#ff9900";
	
	//playerContext.lineWidth = 3;
	//playerContext.strokeStyle = "#202830";
	this.gameManager = function() {
		if(this.x < 0 || this.x >= mapSize || this.y < 0 || this.y >= mapSize) {
			confirm("패배");
		}
	}

	this.draw = function() {
		
		playerContext.fillRect(this.x + 3, this.y + 3, snakeSize - 6, snakeSize - 6);
		//playerContext.strokeRect(this.x + 1, this.y + 1, snakeSize, snakeSize);
	}
	
	this.update = function() {
		this.x += this.xOffset;
		this.y += this.yOffset;
	}
	
	this.changeDirection = function() {
		var nowDir = q.pop();
		
		switch(nowDir) {
			case 'ArrowUp':
				if(this.direction == 'ArrowDown') break;
				this.xOffset = 0;
				this.yOffset = snakeSize * -1;
				this.direction = 'ArrowUp';
				break;
				
			case 'ArrowDown':
				if(this.direction == 'ArrowUp') break;
				this.xOffset = 0;
				this.yOffset = snakeSize * 1;
				
				this.direction = 'ArrowDown';
				break;
				
			case 'ArrowLeft':
				if(this.direction == 'ArrowRight') break;
				this.xOffset = snakeSize * -1;
				this.yOffset = 0;

				this.direction = 'ArrowLeft';
				break;
				
			case 'ArrowRight':
				if(this.direction == 'ArrowLeft') break;
				this.xOffset = snakeSize * 1;
				this.yOffset = 0;

				this.direction = 'ArrowRight';
				break;
		}
	}
}

(function init(){
	// 플레이어 객체 생성
	snake = new Snake();
	snake.draw();
	
	// 입력 버퍼생성
	q = new Q();
	
	// 업데이트 함수
	window.setInterval(() => {
		snake.gameManager();
		snake.changeDirection();
		playerContext.clearRect(0, 0, playerCanvas.width, playerCanvas.height); 
		
		snake.update();
		
		snake.draw();
		//console.log("dir[0]: " + snake.dir[snake.index] + " index: " + snake.index + " top: " + snake.top + "dir[1]: " + snake.dir[snake.index+1] + " index: " + snake.index + " top: " + snake.top);
		console.log("x: " + snake.x + "y: " + snake.y);
		
	}, snake.snakeSpeed * 0.5);
}());


// 키입력 이벤트 발생
window.addEventListener("keyup", ((e) => {
	var direction = e.key.replace('arrow', '');
	
	q.push(direction);
	//console.log(direction);
	//snake.changeDirection(direction);
}))