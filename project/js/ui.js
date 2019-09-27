function Ui() {
	this.isItTitle;
	this.isItResult;
	
	this.init = function() {
		this.isItTitle = true;
		
		this.ui = document.getElementById("ui");
		this.uiContext = this.ui.getContext("2d");
		this.uiContext.textBaseline  = "top";
		
		this.ui.width = window.innerWidth;
		this.ui.height = window.innerHeight;	
	}

	
	this.titleMenu = function() {
		if(this.isItTitle) {
			this.uiContext.font = '120% Arial';
			this.uiContext.fillText("Player", ((window.innerWidth - MAP_SIZE) / 2) + snake.getXPos() + STROKE_SIZE - 14,
											  ((window.innerHeight - MAP_SIZE) / 2) + snake.getYPos() + STROKE_SIZE - 10);
			
			this.uiContext.fillText("Fruit", ((window.innerWidth - MAP_SIZE) / 2) + fruit.getXPos() + STROKE_SIZE - 6,
											  ((window.innerHeight - MAP_SIZE) / 2) + fruit.getYPos() + STROKE_SIZE - 10);
											  
			this.uiContext.fillStyle = "#e0e0e0";
			this.uiContext.font = '500% Arial';
			
			this.uiContext.fillText("S N A K E", 
									 window.innerWidth / 2 - 180, 
									 window.innerHeight / 2 * 0.28);
			
			if(gm.isHardModeOn) {
				this.uiContext.font = '400% Arial';
				this.uiContext.fillText("H A R D", 
										 window.innerWidth / 2 - 115, 
										 window.innerHeight / 2 * 1.82);
			}
			else {
				this.uiContext.font = '400% Arial';
				this.uiContext.fillText("N O R M A L", 
										 window.innerWidth / 2 - 180, 
										 window.innerHeight / 2 * 1.82);
			}
			
			this.uiContext.font = '150% Arial';
			//this.uiContext.fillText("Press any key to start", 
									   //window.innerWidth / 2 - 115, 
									   //window.innerHeight / 2 * 1.93);	
			this.uiContext.fillText("Press 'H' to select mode", 
									 window.innerWidth / 2 - 125, 
									 window.innerHeight / 2 * 1.93);	
		}
	}
	
	this.resultMenu = function() {
			clearInterval(gm.timeCounterAddress);
			this.uiContext.fillStyle = "#e0e0e0";
			this.uiContext.font = '320% Arial';
			if(gm.isHardModeOn) {
				this.uiContext.fillText("H I G H S C O R E : " + localStorage.getItem("highScore-hard"), 
										 window.innerWidth / 2 - 250, 
										 window.innerHeight / 2 * 0.2);
			}
			else {
				this.uiContext.fillText("H I G H S C O R E : " + localStorage.getItem("highScore"), 
										 window.innerWidth / 2 - 250, 
										 window.innerHeight / 2 * 0.2);
			}
			
			if(gm.isItNewScore) {
				this.uiContext.font = '400% Arial';
				this.uiContext.fillText("!! N E W  S C O R E !!", 
										 window.innerWidth / 2 - 310, 
										 window.innerHeight / 2 * 0.65);
			}
			else {
				this.uiContext.font = '400% Arial';
				this.uiContext.fillText("R E S U L T", 
										 window.innerWidth / 2 - 170, 
										 window.innerHeight / 2 * 0.65);
			}
			
			this.uiContext.fillStyle = "#870029";
			this.uiContext.font = '1000% Arial';
			
			if(snake.totalEatenFruit < 10) { 
				this.uiContext.fillText("0" + snake.totalEatenFruit, 
										 window.innerWidth / 2 - 90, 
										 window.innerHeight / 2 * 1.1);
			}
			else { 
				this.uiContext.fillText(snake.totalEatenFruit, 
										window.innerWidth / 2 - 90, 
										window.innerHeight / 2 * 1.1);
			}
			
			
			this.uiContext.fillStyle = "#e0e0e0";
			this.uiContext.font = '150% Arial';
			this.uiContext.fillText("Press any key to restart", 
									 window.innerWidth / 2 - 115, 
									 window.innerHeight / 2 * 1.9);	
	}
	
	this.uiManager = function() {
			this.uiContext.clearRect(0, 0, this.ui.width, this.ui.height);
			this.uiContext.fillText("", 0, 0);
	}
	
	this.uiTime = function() {
		this.uiContext.font = '120% Arial';
			this.uiContext.fillText(Math.floor(gm.timeLeft / 100),
								    ((window.innerWidth - MAP_SIZE) / 2) + fruit.getXPos() + STROKE_SIZE + 2.3,
									((window.innerHeight - MAP_SIZE) / 2) + fruit.getYPos() + STROKE_SIZE + 19);
			
		
	}
}