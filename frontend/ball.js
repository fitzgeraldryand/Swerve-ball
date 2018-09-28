const startRadius = 30;

class Ball {
  constructor(stage, game, totalDistance, difficulty) {
    this.stage = stage;
    this.game = game;
    this.totalDistance = totalDistance;
    this.ball = new createjs.Shape();
    this.ballRadius = startRadius;
    this.direction = 1;
    this.distance = 0;
    this.draw("#5df942", 400, 400);
  }

  draw(color, locationX = this.ball.x, locationY = this.ball.y) {
    this.ball.graphics
      .beginRadialGradientFill(["#fafafa",color], [0, 1], 8, -8, 3, 0, 0, this.ballRadius)
      .drawCircle(0, 0, this.ballRadius);
    this.ball.x = locationX;
    this.ball.y = locationY;
    this.stage.addChild(this.ball);
    this.stage.update();
  }

  scaleBall() {
    this.ball.scaleX = 1 - (this.distance * 3) / (4 * this.totalDistance);
    this.ball.scaleY = 1 - (this.distance * 3) / (4 * this.totalDistance);
    this.ballRadius = startRadius * this.ball.scaleX;
    this.stage.update();
  }

  moveThroughTunnel() {
    if (this.direction === 1) {
      this.distance += 2;
    } else if (this.direction === -1) {
      this.distance -= 2;
    }
    this.scaleBall();
    this.stage.update();
  }
}

export default Ball;
