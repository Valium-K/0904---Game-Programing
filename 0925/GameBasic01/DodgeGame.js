window.addEventListener("load", drawScreen, false);

var imgBackground = new Image();
imgBackground.src = "./img/background.png";
imgBackground.addEventListener("load", drawScreen, false);

var imgPlayer = new Image();
imgPlayer.src = "./img/player.png";
imgPlayer.addEventListener("load", drawScreen, false);

function drawScreen() {
	var theCanvas = document.getElementById("gameCanvas");
	var context = theCanvas.getContext("2d");
	
	context.fillStyle = "#000000";
	context.fillRect(0, 0, 800, 600);
	
	context.drawImage(imgBackground, 0, 0);
	
	context.drawImage(imgPlayer, 350, 250);
}