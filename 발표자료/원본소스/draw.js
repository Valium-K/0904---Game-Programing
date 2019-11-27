const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scale = 10; // 한 칸의 단위
const rows = canvas.height / scale;
const columns = canvas.width / scale;
var snake;

(function setup() { // 즉시실행 함수
  snake = new Snake();
  fruit = new Fruit();
  fruit.pickLocation();
                                 // 익명함수 정의
  window.setInterval( () => { 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw();
    snake.update();
    snake.draw();

    if (snake.eat(fruit)) {    fruit.pickLocation();    }
    snake.checkCollision();
    document.querySelector('.score')
      .innerText = snake.total;
    }, 250);
  }());
  
  window.addEventListener('keydown', ((evt) => {
  // 입력된 키에서 "Arror"를 제거 후 changeDirection의 인수로 넘김
  const direction = evt.key.replace('Arrow', '');
  snake.changeDirection(direction);
}));