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

var tempMissile1 = { x:0, y:0, go_x:1, go_y:1 };
var tempMissile2 = { x:800,  y:0, go_x:-1, go_y:1 };
var tempMissile3 = { x:800,  y:600, go_x:-1, go_y:-1 };
var tempMissile4 = { x:0,  y:600, go_x:1, go_y:-1 };

var imgMissile = new Image();
imgMissile.src = "./img/missile.png"

var intervalID;

function onGameStart() {
	intervalID = setInterval(moveMissile, 100);
	intPlayerX = 350;
	intPlayerY = 250;
}

function isCollisionWithPlayer(x, y) {
	if((intPlayerX + 55) > (x + 5) && 
	  (intPlayerX + 5) < (x + 25) && 
	  (intPlayerY + 5) < (y + 25) && 
	  (intPlayerY + 55) > (y + 5)) {
		return true;
	}
	return false;
}
function moveMissile() {
	tempMissile1.x += tempMissile1.go_x * 3;
	tempMissile1.y += tempMissile1.go_y * 3;
	if(isCollisionWithPlayer(tempMissile1.x, tempMissile1.y)) {
		gameState = GAME_STATE_OVER;
		clearInterval(intervalID);
	}
	
	tempMissile2.x += tempMissile2.go_x * 3;
	tempMissile2.y += tempMissile2.go_y * 3;
	if(isCollisionWithPlayer(tempMissile2.x, tempMissile2.y)) {
		gameState = GAME_STATE_OVER;
		clearInterval(intervalID);
	}
	tempMissile3.x += tempMissile3.go_x * 3;
	tempMissile3.y += tempMissile3.go_y * 3;
	if(isCollisionWithPlayer(tempMissile3.x, tempMissile3.y)) {
		gameState = GAME_STATE_OVER;
		clearInterval(intervalID);
	}
	tempMissile4.x += tempMissile4.go_x * 3;
	tempMissile4.y += tempMissile4.go_y * 3;
	if(isCollisionWithPlayer(tempMissile4.x, tempMissile4.y)) {
		gameState = GAME_STATE_OVER;
		clearInterval(intervalID);
	}
	
	drawScreen();
}
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
	
	if(gameState == GAME_STATE_READY) {  
		context.fillText("준비", 330, 180);
	}
	else if(gameState == GAME_STATE_GAME) { 
		context.drawImage(imgMissile, tempMissile1.x, tempMissile1.y);
		context.drawImage(imgMissile, tempMissile2.x, tempMissile2.y);
		context.drawImage(imgMissile, tempMissile3.x, tempMissile3.y);
		context.drawImage(imgMissile, tempMissile4.x, tempMissile4.y);
	}
	else if(gameState == GAME_STATE_OVER) {  
		context.drawImage(imgMissile, tempMissile1.x, tempMissile1.y);
		context.drawImage(imgMissile, tempMissile2.x, tempMissile2.y);
		context.drawImage(imgMissile, tempMissile3.x, tempMissile3.y);
		context.drawImage(imgMissile, tempMissile4.x, tempMissile4.y);
		context.fillText("게임 오버!", 330, 180);  
	}
}

function onkeydown(e) {
	
	if(gameState == GAME_STATE_READY) {
		if(e.keyCode == 13) {  
			gameState = GAME_STATE_GAME;  
			onGameStart();
		}
	}
	else if(gameState == GAME_STATE_GAME) {
		switch(e.keyCode) {
		case 37: 
			intPlayerX -= 5;
			
			if(intPlayerX < 0) {  intPlayerX = 0; }
			break;
			
		case 39: 
			intPlayerX += 5;
			
			if(intPlayerX > 740) {  intPlayerX = 740; 	}
			break;
			
		case 38: 
			intPlayerY -= 5;
			
			if(intPlayerY < 0) { intPlayerY = 0; }
			break;
			
		case 40: 
			intPlayerY += 5;
			
			if(intPlayerY > 540) {  intPlayerY = 540; 	}
			break;
		};
	}
	else if(gameState == GAME_STATE_OVER) {
		if(e.keyCode == 13) {  
			gameState = GAME_STATE_READY;  
		}
	}
	drawScreen();
}