import Snake from "./Snake.js"

class Game {

    constructor(canvas) {
        this.speed = 200;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.snake = new Snake(canvas);
        this.apple = { x: 15, y: 15 };
        this.isGameOver = false;
        this.interval = null;
        this.scoreElement = document.getElementById('score');
        this.bestScoreElement = document.getElementById('bestScore');
        this.bestScore = Number(localStorage.getItem('bestScore')) || 0;
        this.updateBestScore();

        this.restartButton = document.getElementById('restartButton');
        this.setupControls();
    }

    setupControls() {
        document.addEventListener('keydown', (event) => {
            const key = event.key;
            let newDirection = '';

            switch (key) {
                case 'ArrowUp':
                    newDirection = 'up';
                    break;
                case 'ArrowDown':
                    newDirection = 'down';
                    break;
                case 'ArrowLeft':
                    newDirection = 'left';
                    break;
                case 'ArrowRight':
                    newDirection = 'right';
                    break;
            }

            this.snake.changeDirection(newDirection);
        });
    }

    update() {
        if (!this.isGameOver) {
            this.snake.move();

            if (this.snake.checkCollision()) {
                this.isGameOver = true;
                clearInterval(this.interval);
                this.showRestartButton();
                alert('Game Over! Your score: ' + this.snake.totalApples);
            }

            if (this.snake.body[0].x === this.apple.x && this.snake.body[0].y === this.apple.y) {
                if (this.speed > 0) {
                    this.speed -= 2;
                }

                // изменение скорости
                clearInterval(this.interval);
                this.interval = setInterval(() => this.update(), this.speed);
                this.snake.grow();
                this.spawnApple();
                this.updateScore();

                if (this.snake.totalApples > this.bestScore) {
                    this.bestScore = this.snake.totalApples;
                    this.updateBestScore();
                    localStorage.setItem('bestScore', this.bestScore);
                }
            }

            this.draw();
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.apple.x * 40, this.apple.y * 40, 40, 40);

        this.ctx.fillStyle = 'green';
        this.snake.body.forEach(segment => {
            this.ctx.fillRect(segment.x * 40, segment.y * 40, 40, 40);
        });
    }

    spawnApple() {
        let collision = true;
        while (collision) {
            collision = false;
            this.apple.x = Math.floor(Math.random() * this.canvas.width / 40);
            this.apple.y = Math.floor(Math.random() * this.canvas.height / 40);

            for (let segment of this.snake.body) {
                if (this.apple.x === segment.x && this.apple.y === segment.y) {
                    collision = true;
                    break;
                }
            }
        }
    }

    updateScore() {
        this.scoreElement.textContent = this.snake.totalApples;
    }

    updateBestScore() {
        this.bestScoreElement.textContent = this.bestScore;
    }

    start() {
        this.interval = setInterval(() => this.update(), this.speed);
    }

    showRestartButton() {
        this.restartButton.style.display = 'block';
    }
}

export default Game