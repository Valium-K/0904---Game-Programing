// 키입력 이벤트 발생
window.addEventListener("keydown", ((e) => {
	var direction = e.key.replace('Arrow', '');

	// 타이틀 화면이라면 게임모드 설정 후 게임시작
	if(ui.isItTitle == true && direction == "h") {
		gm.modeChanger();
	}
	
	// 방향키 움직이면 시작
	else if(ui.isItTitle == true) {
		gm.startGame();
	}
	
	// 게임오버시 방향키는 무시 - 이 코드를 빼면 사용자가 가끔 자기 스코어 못 봄
	if(gm.isGameOver == true && (direction == "Down" || 
								 direction == "Up"   ||
								 direction == "Left" || 
								 direction == "Right")) {
		return;
	}
	
	// 게임오버시 방향키 제외한 키입력시 재시작
	if(gm.isGameOver == true && (direction != "Down" || 
								 direction != "Up"   ||
								 direction != "Left" || 
								 direction != "Right")){
								
								
		clearInterval(gm.hungerTimer);
		clearInterval(gm.nowHungerTime);
		gm.isGameOver = false;
		gm.isItNewScore = false;
		gm.restartGame();
	}
	
	queue.push(direction);
}))