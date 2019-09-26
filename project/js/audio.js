function AudioManager() {
	
	this.bgm;
	this.sfx;

	this.init = function() {
		this.bgm = new Audio('./assets/title.mp3');
		this.sfx = new Array();
		
		this.sfx[0] = new Audio(FRUIT_EAT);
		this.sfx[1] = new Audio(ITEM_EAT);
		this.sfx[2] = new Audio(SPAWN);
		this.sfx[3] = new Audio(DEAD);
		
		window.setTimeout(() => {
			this.bgm.play();
		}, 500);
	}
	
	this.inGameBgm = function() {
		this.bgm.src = "./assets/ingame.mp3";
		this.bgm.play();
	}
	
	this.resultBgm = function() {
		this.bgm.src = "./assets/result.mp3";
		this.bgm.play();
	}
	
	this.playSFX = function(sfx) {
		switch(sfx) {
			case FRUIT_EAT: 
				this.sfx[0].play();
			case ITEM_EAT: 
				this.sfx[1].play();
			case SPAWN: 
				this.sfx[2].play();
			case DEAD: 
				this.sfx[3].play();
		}
	}
}