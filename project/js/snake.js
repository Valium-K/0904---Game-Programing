function Snake() {
	// 플레이어 위치 - 타일 오프셋에 기반함
	this.x;
	this.y;
	
	// 타일 오프셋
	this.xOffset;
	this.yOffset;
	
	// 플레이어 속성
	this.direction;
	this.totalEatenFruit;

	this.tail = [];
	this.tailOffset; // 아이템으로 지운 꼬리길이 오프셋
	
	this.poop = [];
	this.poopCount = 0;
	
	// getter
	this.getXPos = function() { return this.x; }
	this.getYPos = function() { return this.y; }
	this.getXOffset = function() { return this.xOffset; }
	this.getYOffset = function() { return this.yOffset; }
	this.getTotalEatenFruit = function() { return this.totalEatenFruit; }
	this.getTail = function() { return this.tail; }
	this.getTailOffset = function() { return this.tailOffset; }
	this.getPoopCount = function() {  return this.poopCount;  }
	this.getPoop = function() { return this.poop; }
	// setter
	this.setXPos = function(x) {this.x = x;}
	this.setYPos = function(y) {this.y = y;}
	this.setXOffset = function(xo) {this.xOffset = xo;}
	this.setYOffset = function(yo) {this.yOffset = yo;}
	this.setTotalEatenFruit = function(fruitNum) { this.totalEatenFruit = fruitNum; }	
	this.setTailOffset = function(to) { this.tailOffset = to; }
	
	this.init = function() {
		this.x = TILE_SIZE * Math.floor(TILE_NUM / 2);
		this.y = TILE_SIZE * Math.floor(TILE_NUM / 2);
		
		this.xOffset = 0;
		this.yOffset = 0;
	
		this.direction = '';
		this.totalEatenFruit = 0;

		this.tail = [];
		this.tailOffset = 0;
		
		for(let i = 0; i < this.poopCount; i++) {
			this.poop[i] = null;
		}
		this.poopCount = 0;
	}
	this.setPos = function() {
		if(gm.isGameOver){ return; }
		// 꼬리 위치 한칸씩 이동 - 꼬리와 머리사이는 null 즉, tail[0]이 꼬리 끝, tail[length-1]이 머리바로 뒤 꼬리
		for(let i = this.tailOffset; i < this.tail.length - 1; i++) {
			this.tail[i] = this.tail[i + 1];
		}
		
		// 머리가 있던 자리에 가장 앞 꼬리 추가
		if(this.totalEatenFruit >= 0) {
			this.tail[this.totalEatenFruit - 1] = {
				x: this.x,
				y: this.y
			};
		}
		
		
		// 머리위치 갱신
		this.x += this.xOffset;
		this.y += this.yOffset;
	}
	
	this.changeDirection = function() {		
		
		switch(queue.pop()) {
			case 'Up':
				if(this.direction == 'Down') break;
				this.xOffset = 0;
				this.yOffset = TILE_SIZE * -1;
				this.direction = 'Up';
				audio.playSFX(DIR_UP);
				break;
				
			case 'Down':
				if(this.direction == 'Up') break;
				this.xOffset = 0;
				this.yOffset = TILE_SIZE * 1;
				this.direction = 'Down';
				audio.playSFX(DIR_DOWN);
				break;
				
			case 'Left':
				if(this.direction == 'Right') break;
				this.xOffset = TILE_SIZE * -1;
				this.yOffset = 0;
				this.direction = 'Left';
				audio.playSFX(DIR_LEFT);
				break;
				
			case 'Right':
				if(this.direction == 'Left') break;
				this.xOffset = TILE_SIZE * 1;
				this.yOffset = 0;
				this.direction = 'Right';
				audio.playSFX(DIR_RIGHT);
				break;
		}
	}
	this.poopNow = function() {
		if(!gm.isHardModeOn) { return; }
		if(this.tail[this.tailOffset] == null) { return; }
		this.poop[this.poopCount] = {
			x: this.tail[this.tailOffset].x,
			y: this.tail[this.tailOffset].y
		}

		this.poopCount++;
	}
}