const canvas = document.getElementById('gameCanvas');
class Snake {
  constructor() {
      this.body = [{ x: 5, y: 5 }];
      this.direction = 'right';
      this.totalApples = 0;
  }

  move() {
      const head = this.body[0];
      let newX = head.x;
      let newY = head.y;

      switch (this.direction) {
          case 'up':
              newY--;
              break;
          case 'down':
              newY++;
              break;
          case 'left':
              newX--;
              break;
          case 'right':
              newX++;
              break;
      }

      newX = (newX + canvas.width / 40) % (canvas.width / 40);
      newY = (newY + canvas.height / 40) % (canvas.height / 40);

      this.body.unshift({ x: newX, y: newY });
      this.body.pop();
  }

  changeDirection(newDirection) {
      const allowedDirections = ['up', 'down', 'left', 'right'];
      if (allowedDirections.includes(newDirection)) {
          this.direction = newDirection;
      }
  }

  grow() {
      const tail = this.body[this.body.length - 1];
      this.body.push({ x: tail.x, y: tail.y });
      this.totalApples++;
  }

  checkCollision() {
      const head = this.body[0];
      const bodyWithoutHead = this.body.slice(1);
      return bodyWithoutHead.some(segment => segment.x === head.x && segment.y === head.y);
  }
}

export default Snake