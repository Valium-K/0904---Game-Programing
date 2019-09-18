//save highScore data
localStorage.setItem("highScore", "152400");

// data can later be retrieved, even on other pages
var highScore = localStorage.getItem("highScore");
alert(highScore);