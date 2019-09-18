var imgWarrior = new Image();
imgWarrior.src = "./Img/warrior.png";
imgWarrior.addEventListener("load", drawScreen, false);

function drawScreen() {
	var Context = document.getElementById("GameCanvas").getContext("2d");
	
	Context.fillStyle = "#000000";
	Context.fillRect(0, 0, 800, 600);
	
	Context.drawImage(imgWarrior, 0, 0);
}