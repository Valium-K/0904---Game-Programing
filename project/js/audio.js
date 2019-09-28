function AudioManager() {
	
	this.bgm;
	this.sfx;
	this.isDeadSFXPlayed = false;
	
	this.init = function() {
		this.bgm = new Audio();
		this.bgm.src = TITLE;
		this.bgm.load();
		this.sfx = new Array();
		
		this.sfx[0] = new Audio(FRUIT_EAT);
		this.sfx[1] = new Audio(ITEM_EAT);
		this.sfx[2] = new Audio(ITEM_SPAWN);
		this.sfx[3] = new Audio(DEAD);
		this.sfx[4] = new Audio(START);
		this.sfx[5] = new Audio(DIR_UP);
		this.sfx[6] = new Audio(DIR_DOWN);
		this.sfx[7] = new Audio(DIR_LEFT);
		this.sfx[8] = new Audio(DIR_RIGHT);
	}
	this.playTitleBgm = function() {
		
		// 구글 자동재생 정책으로 사용자가 인터렉션을 할 시간을 줌
		window.setTimeout(() => {
			var promise = this.bgm.play();
			
			if(promise) {
				promise.catch(
					function(error) { 
						console.error(error + " " + promise); 
					}
				);
			}
		}, 500);
	}
	this.playInGameBgm = function() {
		this.bgm.pause();
		this.bgm.src = INGAME;
		this.bgm.load();
		window.setTimeout(() => {
			this.bgm.play();	
		}, 650);
	}
	
	this.playIngameHardBgm = function() {
		this.bgm.pause();
		this.bgm.src = INGAME_HARD;
		this.bgm.load();
		window.setTimeout(() => {
			this.bgm.play();	
		}, 500);
	}
	this.palyResultBgm = function() {
		this.bgm.pause();
		this.bgm.src = RESULT;
		this.bgm.load();
		window.setTimeout(() => {
			this.bgm.play();	
		}, 500);
	}
	
	this.playSFX = function(sfx) {
		switch(sfx) {
			case FRUIT_EAT: 
				this.sfx[0].play(); break;
			case ITEM_EAT: 
				this.sfx[1].play(); break;
			case ITEM_SPAWN: 
				this.sfx[2].play(); break;
			case DEAD: 
				this.sfx[3].play(); break;
			case START:
				this.sfx[4].play(); break;
			case DIR_UP:
				this.sfx[5].play(); break;
			case DIR_DOWN:
				this.sfx[6].play(); break;
			case DIR_LEFT:
				this.sfx[7].play(); break;
			case DIR_RIGHT:
				this.sfx[8].play(); break;
		}
	}
}