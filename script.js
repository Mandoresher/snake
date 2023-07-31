import Game from "./Game.js";
import Snake from "./Snake.js";

const scoreBox = document.getElementById("scoreBox")
const restartButton = document.getElementById("restartButton")
const canvas = document.getElementById('gameCanvas');
const game = new Game(canvas);
game.spawnApple();
game.start();

restartButton.addEventListener("click", restartGame);

function restartGame() {
  game.snake = new Snake();
  game.isGameOver = false;
  game.interval = null;
  game.scoreElement.textContent = '0';
  game.bestScore = Number(localStorage.getItem('bestScore')) || 0;
  game.updateBestScore();
  game.spawnApple();
  game.start();
  game.restartButton.style.display = 'none';
}