function Queue() {
	// 키입력 버퍼 큐
	this.dir = [2];
	this.index = 0;
	this.top = 0;
	
	// Enqueue
	this.push = function(direction) {
		if(this.top >= 2) this.top = this.top - 1;
		this.dir[this.top] = direction;
		this.top = this.top + 1;
	}
	
	// Deqeue
	this.pop = function() {
		if(this.top == 0) {
			return;
		}
		if(this.top == 1) {
			var nowDir = this.dir[this.index];
			this.top--;
			return nowDir;
		}
		if(this.top >= 2) {
			var nowDir = this.dir[this.index];
			this.dir[this.index] = this.dir[this.top-1];
			this.top--;
			return nowDir;
		}
	}	
}