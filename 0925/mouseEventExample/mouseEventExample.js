window.addEventListener("load", drawScreen, false);
window.addEventListener("mousemove", onMouseMove, false);
window.addEventListener("mousedown", onMouseDown, false);
window.addEventListener("mouseup", onMouseUp, false);

var imgIcon = new Image();
imgIcon.src = "icon.png";
imgIcon.addEventListener("load", drawScreen, false);

var bMouseClicked = false;
var intMouseX = 60;
var intMouseY = 60;
var strMouseSatus = "None";

function drawScreen() {
	var theCanvas = document.getElementById("gameEvent");
	var context = theCanvas.getContext("2d");
	
	context.fillStyle = "#000000";
	context.fillRect(0, 0, 800, 600);
	
	context.drawImage(imgIcon, intMouseX, intMouseY);
	
	context.fillStyle = "#ffffff";
	context.font = '25px, Arial';
	context.textBaseline = "top";
	context.fillText("발생한 마우스 포인터: " + strMouseSatus, 5, 5);
	context.fillText("마우스 좌표 X: " + intMouseX + "마우스 좌표 Y: " + intMouseY, 5, 30);
}

function onMouseMove(e) {
		strMouseSatus = "Move!!!";
		
		if(!bMouseClicked) {
			var theCanvas = document.getElementById("gameEvent");
			intMouseX = e.clientX - theCanvas.offsetLeft;
			intMouseY = e.clientY - theCanvas.offsetTop;
			
			drawScreen();
		}
	}
	
	function onMouseDown(e) {
		strMouseSatus = "Down!!!";
		
		if(!bMouseClicked) {
			var theCanvas = document.getElementById("gameEvent");
			intMouseX = e.clientX - theCanvas.offsetLeft;
			intMouseY = e.clientY - theCanvas.offsetTop;
			
			bMouseClicked = true;
			
			drawScreen();
		}
	}
	
	function onMouseUp(e) {
		strMouseSatus = "Up!!!";
		
		bMouseClicked = false;
		intMouseX = 0;
		intMouseY = 0;
		
		drawScreen();
	}