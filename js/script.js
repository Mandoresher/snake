import Snake from './Snake.js'

let snake = new Snake()
let lastRenderTime = 0
const snakeBody = [
    {x: 10, y: 11},
    {x: 11, y: 11},
    {x: 12, y: 11}
]

const SNAKE_SPEED = 10

const gameBoard = document.getElementById('board')

function main(currentTime) {
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / snake.speed) return

    lastRenderTime = currentTime

    update()
    draw(gameBoard)
}

window.requestAnimationFrame(main)

function update() {
    // console.log('update snake')
}

function draw(gameBoard) {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.x
        snakeElement.style.gridColumnStart = segment.y
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })
}