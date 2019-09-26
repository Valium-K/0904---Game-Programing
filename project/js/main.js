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
			ui.uiManager();
			ui.titleMenu();
			snake.changeDirection();
			map.clearObject();
			snake.setPos();
			fruit.fruitManager();
			gm.gameManager();
			map.draw();
	}, SNAKE_SPEED);
	
}());