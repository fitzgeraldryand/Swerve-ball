const Ai = 'Ai';
const Human = 'Human';
import Paddle from './paddle.js';
import Ball from './ball.js';

class Tunnel {
  constructor(stage, game, difficulty) {
    this.stage = stage;
    this.game = game;
    this.totalDistance = 60;
    this.difficulty = difficulty;
    this.drawTunnel();
    this.aiPaddle = new Paddle(this.stage, this.game, Ai);
    this.ball = new Ball(this.stage, this.game, this.totalDistance, this.difficulty);
    this.humanPaddle = new Paddle(this.stage, this.game, Human);
    this.ticker = createjs.Ticker;
    this.tracker = new createjs.Shape();
    this.drawTracker();
    this.controlPaddle();
    this.moveBall();
    this.checkHit();
  }

  drawBorders() {
    const border1 = new createjs.Shape();
    border1.graphics.beginStroke("#28d36b").drawRect(90, 190, 620, 420);
    const border2 = new createjs.Shape();
    border2.graphics.beginStroke("#28d36b").drawRect(322, 348, 156, 104);
    const border3 = new createjs.Shape();
    border3.graphics.beginStroke("#28d36b").drawRect(145, 230, 510, 340);
    const border4 = new createjs.Shape();
    border4.graphics.beginStroke("#28d36b").drawRect(195, 265, 410, 270);
    const border5 = new createjs.Shape();
    border5.graphics.beginStroke("#28d36b").drawRect(234, 289, 332, 222);
    const border6 = new createjs.Shape();
    border6.graphics.beginStroke("#28d36b").drawRect(262, 308, 276, 184);
    const border7 = new createjs.Shape();
    border7.graphics.beginStroke("#28d36b").drawRect(300, 334, 200, 132);
    const border8 = new createjs.Shape();
    border8.graphics.beginStroke("#28d36b").drawRect(312, 341, 176, 118);
    const border9 = new createjs.Shape();
    border9.graphics.beginStroke("#28d36b").drawRect(284, 325, 232, 154);

    this.stage.addChild(border1);
    this.stage.addChild(border2);
    this.stage.addChild(border3);
    this.stage.addChild(border4);
    this.stage.addChild(border5);
    this.stage.addChild(border6);
    this.stage.addChild(border7);
    this.stage.addChild(border8);
    this.stage.addChild(border9);
  }

  drawCorners() {
    const corner1 = new createjs.Shape();
    corner1.graphics.beginStroke("#28d36b").moveTo(90, 190).lineTo(322, 348);
    const corner2 = new createjs.Shape();
    corner2.graphics.beginStroke("#28d36b").moveTo(710, 610).lineTo(478, 452);
    const corner3 = new createjs.Shape();
    corner3.graphics.beginStroke("#28d36b").moveTo(710, 190).lineTo(478, 348);
    const corner4 = new createjs.Shape();
    corner4.graphics.beginStroke("#28d36b").moveTo(90, 610).lineTo(322, 452);

    this.stage.addChild(corner1);
    this.stage.addChild(corner2);
    this.stage.addChild(corner3);
    this.stage.addChild(corner4);
  }

  drawTunnel() {
    this.drawBorders();
    this.drawCorners();
    this.stage.update();
  }

  controlPaddle() {
    this.ticker.addEventListener('tick', this.humanPaddle.movePaddle.bind(this.humanPaddle));
  }


  checkHit() {
    this.ticker.addEventListener('tick', this.hitOrNot.bind(this));
  }

  hitOrNot() {
    if (this.ball.direction === 1 && this.ball.distance === this.totalDistance) {
      debugger
      if (this.hitX(this.aiPaddle) && this.hitY(this.aiPaddle)) {
        this.ball.direction = -1;
      } else {
        this.ball.direction = 0;
        this.ticker.removeEventListener('tick', this.ball.moveThroughTunnel.bind(this.ball));
        this.ticker.removeEventListener('tick', this.scaleTracker.bind(this));
        this.handleFarBallFinish();
      }
    } else if (this.ball.direction === -1 && this.ball.distance === 0) {
      debugger
      if (this.hitX(this.humanPaddle) && this.hitY(this.humanPaddle)) {
        this.ball.direction = 1;
      } else {
        this.ball.direction = 0;
        this.ticker.removeEventListener('tick', this.ball.moveThroughTunnel.bind(this.ball));
        this.ticker.removeEventListener('tick', this.scaleTracker.bind(this));
        this.ball.draw("red");
      }
    }
  }

  handleFarBallFinish() {
    this.stage.removeChild(this.ball.ball);
    const deadBall = new createjs.Shape();
    deadBall.graphics
      .beginRadialGradientFill(["#fafafa","red"], [0, 1], 2, -2, .25, 0, 0, this.ball.ballRadius)
      .drawCircle(0, 0, this.ball.ballRadius);
    deadBall.x = this.ball.ball.x;
    deadBall.y = this.ball.ball.y;
    this.stage.addChild(deadBall);
    this.stage.update();
  }

  hitX(paddle) {
    const locator = (paddle.type === 'Human' ? paddle.paddle.x : paddle.paddle.graphics.command.x);
    debugger
    if (
        (
          (this.ball.ball.x - this.ball.ballRadius) <= (locator + paddle.width) &&
          (this.ball.ball.x - this.ball.ballRadius) >= (locator)
        ) ||
      (
          (this.ball.ball.x + this.ball.ballRadius) <= (locator + paddle.width) &&
          (this.ball.ball.x + this.ball.ballRadius) >= (locator)
        )
    ) {
      return true;
    } else {
      return false;
    }
  }

  hitY(paddle) {
    const locator = (paddle.type === 'Human' ? paddle.paddle.y : paddle.paddle.graphics.command.y);
    debugger
    if (
        (
          (this.ball.ball.y - this.ball.ballRadius) <= (locator + paddle.height) &&
          (this.ball.ball.y - this.ball.ballRadius) >= locator
        ) ||
        (
          (this.ball.ball.y + this.ball.ballRadius) <= (locator + paddle.height) &&
          (this.ball.ball.y + this.ball.ballRadius) >= (locator)
        )
    ) {
      return true;
    } else {
      return false;
    }
  }

  scaleTracker() {
    // for x and y positions of tracker, add to starting point pixel value proportional to
    // the distance the ball itself has travelled
    const x = 90 + ( (322 - 90) * (this.ball.distance / this.totalDistance));
    const y = 190 + ( (348 - 190) * (this.ball.distance / this.totalDistance));
    // for width and height, shrink by pixel value proportional to same
    const w = 620 - ( (620 - 158) * (this.ball.distance / this.totalDistance));
    const h = 420 - ( (420 - 106) * (this.ball.distance / this.totalDistance));
    this.tracker.graphics.clear().beginStroke("white").drawRect(x, y, w, h);
    this.stage.update();
  }

  drawTracker() {
    this.tracker.graphics.beginStroke("white").drawRect(90, 190, 620, 420);
    // this.tracker.x = 90;
    // this.tracker.y = 190;
    this.stage.addChild(this.tracker);
    this.stage.update();
  }

  moveBall() {
    this.ticker.addEventListener('tick', this.ball.moveThroughTunnel.bind(this.ball));
    this.ticker.addEventListener('tick', this.scaleTracker.bind(this));
  }
}

export default Tunnel;
