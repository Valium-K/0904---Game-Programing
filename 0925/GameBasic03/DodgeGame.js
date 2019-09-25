window.addEventListener("load", drawScreen, false);
window.addEventListener("keydown", onkeydown, true);

var GAME_STATE_READY = 0;
var GAME_STATE_GAME = 1;
var GAME_STATE_OVER = 2;

var gameState = GAME_STATE_READY;

var imgBackground = new Image();
imgBackground.src = "./img/background.png";
imgBackground.addEventListener("load", drawScreen, false);

var imgPlayer = new Image();
imgPlayer.src = "./img/player.png";
imgPlayer.addEventListener("load", drawScreen, false);

var intPlayerX = 350;
var intPlayerY = 250;

function drawScreen() {
	var theCanvas = document.getElementById("gameCanvas");
	var context = theCanvas.getContext("2d");
	
	context.fillStyle = "#000000";
	context.fillRect(0, 0, 800, 600);
	
	context.drawImage(imgBackground, 0, 0);
	
	context.drawImage(imgPlayer, intPlayerX, intPlayerY);
	
	context.fillStyle = "#ffffff";
	context.font = '50px Arial';
	context.textBaseline  = "top";
	
	if(gameState == GAME_STATE_READY) {  context.fillText("준비", 330, 180);  intPlayerX = 350; intPlayerY = 250;}
	else if(gameState == GAME_STATE_GAME) {  }
	else if(gameState == GAME_STATE_OVER) {  context.fillText("게임 오버!", 330, 180);  }
}

function onkeydown(e) {
	
	if(gameState == GAME_STATE_READY) {
		if(e.keyCode == 13) {  gameState = GAME_STATE_GAME;  }
	}
	else if(gameState == GAME_STATE_GAME) {
		switch(e.keyCode) {
		case 37: 
			intPlayerX -= 5;
			
			if(intPlayerX < 0) {  //intPlayerX = 0; 
			  gameState = GAME_STATE_OVER
			}
			break;
			
		case 39: 
			intPlayerX += 5;
			
			if(intPlayerX > 740) {  
			//intPlayerX = 740; 
			gameState = GAME_STATE_OVER
			}
			break;
			
		case 38: 
			intPlayerY -= 5;
			
			if(intPlayerY < 0) { // intPlayerY = 0;  
			gameState = GAME_STATE_OVER}
			break;
			
		case 40: 
			intPlayerY += 5;
			
			if(intPlayerY > 540) {  //intPlayerY = 540; 
gameState = GAME_STATE_OVER
			}
			break;
		}
	}
	else if(gameState == GAME_STATE_OVER) {
		if(e.keyCode == 13) {  gameState = GAME_STATE_READY;  }
	}
	drawScreen();
}