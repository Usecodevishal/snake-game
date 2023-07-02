console.log("Let the snake eat the food");

let snake = [
  { top: 200, left: 200 },
  { top: 200, left: 200 },
];
let food = null;

let s = 0;
let H = 0;

let direction = { key: "ArrowRight", dx: 20, dy: 0 };

window.addEventListener("keydown", (e) => {
  const newDirection = getDirection(e.key);
  const allowedChange = Math.abs(direction.dx) !== Math.abs(newDirection.dx);
  if (allowedChange) direction = newDirection;
});

function getDirection(key) {
  switch (key) {
    case "ArrowUp":
      return { key, dx: 0, dy: -20 };
    case "ArrowDown":
      return { key, dx: 0, dy: 20 };
    case "ArrowLeft":
      return { key, dx: -20, dy: 0 };
    case "ArrowRight":
      return { key, dx: 20, dy: 0 };
    default:
      return direction;
  }
}

function snakeMove() {
  const Head = Object.assign({}, snake[0]); // copy properties of snake to head snake

  Head.top += direction.dy;
  Head.left += direction.dx;
  snake.unshift(Head);

  if (snake[0].top < 0) snake[0].top = 380;
  if (snake[0].left < 0) snake[0].left = 380;
  if (snake[0].top > 380) snake[0].top = 0;
  if (snake[0].left > 380) snake[0].left = 0;

  if (!eatFood()) snake.pop(); // if the snake doesn't eat food, remove the tail
}

function drawSnake() {
  snake.forEach((part, index) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.top = `${part.top}px`;
    snakeElement.style.left = `${part.left}px`;
    snakeElement.classList.add("snake");
    if (index === 0) {
      snakeElement.classList.add("snake");
      snakeElement.classList.add("head");
    }
    // if (index === snake.length - 1) snakeElement.classList.add("head");

    document.getElementById("game-board").appendChild(snakeElement);
  });
}

// Now we build js logic food

 // Initialize the food as null;

function randomFood() {
  food = {
    top: Math.floor(Math.random() * 20) * 20,
    left: Math.floor(Math.random() * 20) * 20,
  };
}

function eatFood() {
  if (snake[0].top === food.top && snake[0].left === food.left) {
    food = null;

    return true;
  }
  return false;
}

function gameOver() {
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].top === snake[0].top && snake[i].left === snake[0].left)
      return true;
  }
  return false;
}

function updateScore() {
  // console.log("score "+ s , "high-score "+H);

  document.getElementById("score").innerText = "Score: " + s;
  document.getElementById("high-score").innerText = `High-score:   ${H}`;
}

function gameLoop() {
  if (gameOver()) {
    if (s > H) {
      H = s;
      alert("Game is Over");
    }
    
    s = 0;
    snake = [{ top: 20, left: 20 }];
    direction = { key: "ArrowRight", dx: 20, dy: 0 };
  }
  setTimeout(() => {
    document.getElementById("game-board").innerHTML = "";
    if (!food) {
      randomFood();
      s++;
    }
    if (eatFood()) {
      document.getElementById("score").innerText = `Score:   ${s}`;
      console.log(s);   
    }
    drawSnake();
    drawFood();
    snakeMove();
    gameLoop();
    updateScore();
  }, 150);
}

gameLoop();

drawSnake();
randomFood();

// let Draw the food in html

function drawFood() {
  let foodElement = document.createElement("div");
  foodElement.style.top = `${food.top}px`;
  foodElement.style.left = `${food.left}px`;
  foodElement.classList.add("food");
  document.getElementById("game-board").appendChild(foodElement);
}

// Logic for gameover
