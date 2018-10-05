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
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.xSpin = 5 * (Math.random() - 0.5);
    this.ySpin = 5 * (Math.random() - 0.5);
    this.rawX = 400;
    this.rawY = 400;
    this.farX = 400;
    this.farY = 400;
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
    this.applySpin();
    this.applyVelocity();
    this.applyPerspective();
    this.adjustForRadius();
    // this.moveAroundTunnel();
    this.stage.update();
  }

  // moveAroundTunnel() {
  //   this.ball.x += this.xVelocity;
  //   this.ball.y += this.yVelocity;
  // }

  adjustForRadius() {
    if (this.rawX > 400) {
      this.ball.x -= this.ballRadius * (this.rawX - 400)/312;
    } else if (this.rawX < 400) {
      this.ball.x += this.ballRadius * (400 - this.rawX)/312;
    }

    if (this.rawY > 400) {
      this.ball.y -= this.ballRadius * (this.rawY - 400)/209;
    } else if (this.rawY < 400) {
      this.ball.y += this.ballRadius * (400 - this.rawY)/209;
    }
  }

  applyPerspective() {
    const distanceFactor = this.distance / this.totalDistance;

    this.ball.x = this.rawX - (this.rawX - this.farX) * distanceFactor;
    this.ball.y = this.rawY - (this.rawY - this.farY) * distanceFactor;
  }


  applySpin() {
    if (this.direction === 1){
     this.xVelocity -= this.xSpin / this.totalDistance;
     this.yVelocity -= this.ySpin / this.totalDistance;
    } else {
     this.xVelocity += this.xSpin / this.totalDistance;
     this.yVelocity += this.ySpin / this.totalDistance;
    }
  }

 applyVelocity() {
    this.rawX += this.xVelocity;
    this.farX = (this.rawX - 400) * 79/312 + 400;

    this.rawY += this.yVelocity;
    this.farY = (this.rawY - 400) * 53/209 + 400;
  }
}

export default Ball;
