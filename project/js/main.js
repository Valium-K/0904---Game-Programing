var interval;
var speed = SNAKE_SPEED;

var update = function(speed, eatenFruitNum) {
	
	interval = window.setInterval(() => {
			//console.log(speed + " " + snake.totalEatenFruit);
			ui.clearUi();
			ui.sceneUi();
			map.clearObject();
			snake.changeDirection();
			snake.setPos();
			fruit.fruitManager();
			gm.gameManager();
			map.draw();
			//ui.inGameUi();
			ui.uiTime();
			if(snake.totalEatenFruit != eatenFruitNum && (snake.totalEatenFruit % 5) == 0) {
				speed = Math.floor(speed * 0.95);
				eatenFruitNum = snake.totalEatenFruit;
				clearInterval(interval);
				
				update(speed, eatenFruitNum);
			}
	}, speed);
	
};
(function main(){

	// high score init
	if(localStorage.getItem("highScore") == null) {
		localStorage.setItem("highScore", 0);	
	}	
	if(localStorage.getItem("highScore-hard") == null) {
		localStorage.setItem("highScore-hard", 0);	
	}
	
	audio = new AudioManager();
	audio.init();
	audio.loop = false;
	audio.playTitleBgm();
	
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
	
	audio.playTitleBgm();
	map.drawMap();
	

	
	// 업데이트 함수
	update(speed, 0);
	
}());