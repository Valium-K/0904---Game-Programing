function Snake() {
  this.x = 0;
  this.y = 0;
  
  // 플레이어 방향 변수
  this.xSpeed = scale * 1;
  this.ySpeed = 0;
  
  // 먹은 과일 합계
  this.total = 0;
  
  // key value를 가질예정
  this.tail = [];
  
  this.draw = function() {
    ctx.fillStyle = "#FFFFFF";
	// 꼬리 그리기
    for (let i=0; i<this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x,this.tail[i].y, scale, scale);
    }
	
	// 머리 그리기
    ctx.fillRect(this.x, this.y, scale, scale);
  }
  this.update = function() {
	// this.tail[0]은 제일 뒤쪽,
	// this.tail[length - 1]은 머리 바로뒤.
    for (let i=0; i<this.tail.length - 1; i++) {
	  // 
      this.tail[i] = this.tail[i+1];
    }
	
	// 머리 바로 뒤 꼬리를 현재 머리위치로
	this.tail[this.total - 1] = { x: this.x, y: this.y };
    
	// 머리위치 갱신
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.x > canvas.width) {
      this.x = 0;
    }
    if (this.y > canvas.height) {
      this.y = 0;
    }
    if (this.x < 0) {
      this.x = canvas.width;
    }
    if (this.y < 0) {
      this.y = canvas.height;
    }
  }
   this.changeDirection = function(direction) {
    switch(direction) {
      case 'Up':
        this.xSpeed = 0;     this.ySpeed = -scale * 1;     break;
      case 'Down':
        this.xSpeed = 0;     this.ySpeed = scale * 1;     break;
      case 'Left': 
        this.xSpeed = -scale * 1;     this.ySpeed = 0;     break;
      case 'Right':
        this.xSpeed = scale * 1;      this.ySpeed = 0;     break;
    }
  }
this.eat = function(fruit) {
    if (this.x === fruit.x && this.y === fruit.y) {
      this.total++;
      return true;
    }

    return false;
  }
  this.checkCollision = function() {
    for (var i=0; i<this.tail.length; i++) {
	  // 플레이어 몸에 닿으면
      if (this.x === this.tail[i].x &&
        this.y === this.tail[i].y) {
			
		// 초기화
        this.total = 0;
        this.tail = [];
      }
    }
  }
}