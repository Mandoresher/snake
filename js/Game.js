import GameLoop from "./GameLoop.js";
import Snake from "./Snake.js";
import Score from "./Score.js";
import Berry from "./Food.js";

class Game {

    constructor( container ) {

        this.snake = new Snake();
        this.food = new Berry();
        this.score = new Score( ".game-score .score-count", 0 );
        new GameLoop( this.update.bind(this), this.draw.bind(this) );

    }

    update() {
        this.snake.update( this.food, this.score);
    }

    draw() {

        this.snake.draw();
        this.food.draw();

    }

}

new Game();