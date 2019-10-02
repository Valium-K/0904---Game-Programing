window.addEventListener("load", drawScreen, false);
window.addEventListener("keydown", drawScreen, false);

var TimerID = setInterval(onLevelUp, 50);

var intLevel = 1;
var bShowLevelUpMessage = false;

var imgChar = new Image();
imgChar.src = "character.png";
imgChar.addEventListener("load", drawScreen, false);

function drawScreen() {
	var theCanvas = document.getElementById("GameCanvas");
	
	var Context = theCanvas.getContext("2d");
	
	Context.fillStyle = "#000";
	Context.fillRect(0, 0, 320, 480);
	
	Context.drawImage(imgChar, 100, 180);
	
	Context.fillStyle = "#fff";
	Context.font = '25px Arial';
	Context.textBaseline = "top";
	
	Context.fillText("Lv: " + intLevel, 130, 300);
	
	if(bShowLevelUpMessage) {
		Context.fillText("Level Up!!!", 100, 150);
	}
}

function onLevelUp() {
	intLevel++;
	
	bShowLevelUpMessage = true;
	
	setTimeout(closeLevelUpMessage, 300);
	
	if(intLevel >= 5) {
		clearInterval(TimerID);
	}
	drawScreen();
}

function closeLevelUpMessage() {
	bShowLevelUpMessage = false;
	drawScreen();
}