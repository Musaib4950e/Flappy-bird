const bird = document.getElementById("bird");
const game = document.getElementById("gameContainer");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("gameOver");
const finalScore = document.getElementById("finalScore");

let birdTop = 250;
let velocity = 0;
let gravity = 0.5;
let gameOver = false;
let score = 0;

document.addEventListener("keydown", () => {
  if (!gameOver) velocity = -8;
});

function createPipe() {
  const pipeTop = document.createElement("div");
  const pipeBottom = document.createElement("div");

  const gap = 150;
  const topHeight = Math.floor(Math.random() * 300) + 50;
  const bottomHeight = 600 - topHeight - gap;

  pipeTop.classList.add("pipe");
  pipeBottom.classList.add("pipe");

  pipeTop.style.height = topHeight + "px";
  pipeBottom.style.height = bottomHeight + "px";

  pipeTop.style.top = "0px";
  pipeBottom.style.bottom = "0px";

  pipeTop.style.left = pipeBottom.style.left = "400px";

  game.appendChild(pipeTop);
  game.appendChild(pipeBottom);

  const move = setInterval(() => {
    if (gameOver) {
      clearInterval(move);
      pipeTop.remove();
      pipeBottom.remove();
      return;
    }
    let left = parseInt(pipeTop.style.left);
    if (left < -60) {
      pipeTop.remove();
      pipeBottom.remove();
      clearInterval(move);
    } else {
      pipeTop.style.left = pipeBottom.style.left = left - 2 + "px";

      if (
        left < 140 && left + 60 > 100 &&
        (birdTop < topHeight || birdTop + 40 > topHeight + gap)
      ) {
        endGame();
      }

      if (left === 100) {
        score++;
        scoreDisplay.textContent = "Score: " + score;
      }
    }
  }, 20);
}

function gameLoop() {
  if (gameOver) return;
  velocity += gravity;
  birdTop += velocity;
  if (birdTop < 0) birdTop = 0;
  if (birdTop > 560) {
    birdTop = 560;
    endGame();
  }
  bird.style.top = birdTop + "px";
  requestAnimationFrame(gameLoop);
}

function endGame() {
  gameOver = true;
  gameOverScreen.style.display = "block";
  finalScore.textContent = "Your Score: " + score;
}

setInterval(() => {
  if (!gameOver) createPipe();
}, 1500);

gameLoop();
