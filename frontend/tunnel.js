const Ai = 'Ai';
const Human = 'Human';
import Paddle from './paddle.js';
import Ball from './ball.js';

class Tunnel {
  constructor(stage, game, difficulty) {
    this.stage = stage;
    this.game = game;
    this.difficulty = difficulty;
    this.totalDistance = 240;

    this.drawTunnel();

    this.aiPaddle = new Paddle(this.stage, this.game, Ai);
    this.tracker = new createjs.Shape();
    this.drawTracker();
    this.ball = new Ball(this.stage, this.game, this.totalDistance, this.difficulty);
    this.humanPaddle = new Paddle(this.stage, this.game, Human);

    this.ticker = createjs.Ticker;
    this.ticker.framerate = 80;

    this.pointWinner = null;
    this.ticker.removeAllEventListeners('tick');
    this.eventListenerPaddles();
    this.eventListenerStart();
  }

  //initial draw

  drawBorders() {
    //the 9 rectangles
    const border1 = new createjs.Shape();
    border1.graphics.beginStroke("#28d36b").drawRect(90, 190, 620, 420);
    const border2 = new createjs.Shape();
    border2.graphics.beginStroke("#28d36b").drawRect(145, 230, 510, 340);
    const border3 = new createjs.Shape();
    border3.graphics.beginStroke("#28d36b").drawRect(195, 265, 410, 270);
    const border4 = new createjs.Shape();
    border4.graphics.beginStroke("#28d36b").drawRect(234, 289, 332, 222);
    const border5 = new createjs.Shape();
    border5.graphics.beginStroke("#28d36b").drawRect(262, 308, 276, 184);
    const border6 = new createjs.Shape();
    border6.graphics.beginStroke("#28d36b").drawRect(300, 334, 200, 132);
    const border7 = new createjs.Shape();
    border7.graphics.beginStroke("#28d36b").drawRect(312, 341, 176, 118);
    const border8 = new createjs.Shape();
    border8.graphics.beginStroke("#28d36b").drawRect(284, 325, 232, 154);
    const border9 = new createjs.Shape();
    border9.graphics.beginStroke("#28d36b").drawRect(322, 348, 156, 104);

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
    //four corners created by intersection of vertical & horizontal parts of rectangles
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

  drawTracker() {
    this.tracker.graphics.beginStroke("white").drawRect(90, 190, 620, 420);
    this.stage.addChild(this.tracker);
    this.stage.update();
  }

  //paddles

  eventListenerPaddles() {
    this.ticker.addEventListener('tick', this.aiPaddle.movePaddle.bind(this.aiPaddle, this.ball));
    this.ticker.addEventListener('tick', this.humanPaddle.movePaddle.bind(this.humanPaddle, this.ball));
  }

  //ball

  isWallHit() {
    if(this.ball.rawX >= 710 || this.ball.rawX <= 90){
      this.ball.xVelocity = this.ball.xVelocity * -1;
      this.ball.xSpin = 0;
    }

    if(this.ball.rawY >= 610 || this.ball.rawY <= 190){
      this.ball.yVelocity = this.ball.yVelocity * -1;
      this.ball.ySpin = 0;
    }
  }

  eventListenerBall() {
    this.ticker.addEventListener('tick', this.ball.move.bind(this.ball));
    this.ticker.addEventListener('tick', this.isWallHit.bind(this));
  }

  //tracker

  scaleTracker() {
    // for x and y positions of tracker, add to starting point pixel value proportional to
    // the distance the ball itself has travelled
    this.prevTrackerX = this.trackerX;
    this.prevTrackerY = this.trackerY;
    this.prevTrackerW = this.trackerW;
    this.prevTrackerH = this.trackerH;
    this.trackerX = 90 + ( (322 - 90) * (this.ball.distance / this.totalDistance));
    this.trackerY = 190 + ( (348 - 190) * (this.ball.distance / this.totalDistance));
    // for width and height, shrink by pixel value proportional to same
    this.trackerW = 620 - ( (620 - 156) * (this.ball.distance / this.totalDistance));
    this.trackerH = 420 - ( (420 - 104) * (this.ball.distance / this.totalDistance));
    this.tracker.graphics.clear().beginStroke("white").drawRect(this.trackerX, this.trackerY, this.trackerW, this.trackerH);
    this.stage.update();
  }

  eventListenerTracker() {
    this.ticker.addEventListener('tick', this.scaleTracker.bind(this));
  }

  //paddles and ball

  getSpinFromPaddles() {
    let [xSpin, ySpin] = this.humanPaddle.spinVector();
    this.ball.xSpin += xSpin;
    this.ball.ySpin += ySpin;
  }

  handleFarBallFinish() {
    this.deadBall = new createjs.Shape();
    this.stage.removeChild(this.ball.ball);

    this.deadBall.graphics
    .beginRadialGradientFill(["#fafafa","red"], [0, 1], 2, -2, .25, 0, 0, this.ball.ballRadius)
    .drawCircle(0, 0, this.ball.ballRadius);
    this.deadBall.x = this.ball.ball.x;
    this.deadBall.y = this.ball.ball.y;
    this.stage.addChild(this.deadBall);
    this.stage.update();
  }

  isPaddleHitX(paddle) {
    //if the ball is where the paddle is, or was just a moment ago
    //^ to increase playability
    const locator = paddle.paddle.x;
    const locator2 = paddle.placeholderX;
    if (
        (
          (this.ball.ball.x - this.ball.ballRadius) <= (locator + paddle.width) &&
          (this.ball.ball.x - this.ball.ballRadius) >= (locator)
        ) ||
        (
          (this.ball.ball.x + this.ball.ballRadius) <= (locator + paddle.width) &&
          (this.ball.ball.x + this.ball.ballRadius) >= (locator)
        ) ||
        (
          (this.ball.ball.x - this.ball.ballRadius) <= (locator2 + paddle.width) &&
          (this.ball.ball.x - this.ball.ballRadius) >= (locator2)
        ) ||
        (
          (this.ball.ball.x + this.ball.ballRadius) <= (locator2 + paddle.width) &&
          (this.ball.ball.x + this.ball.ballRadius) >= (locator2)
        )
    ) {
      return true;
    } else {
      return false;
    }
  }

  isPaddleHitY(paddle) {
    //if the ball is where the paddle is, or was just a moment ago
    //^ to increase playability
    const locator = paddle.paddle.y;
    const locator2 = paddle.placeholderY;
    if (
        (
          (this.ball.ball.y - this.ball.ballRadius) <= (locator + paddle.height) &&
          (this.ball.ball.y - this.ball.ballRadius) >= locator
        ) ||
        (
          (this.ball.ball.y + this.ball.ballRadius) <= (locator + paddle.height) &&
          (this.ball.ball.y + this.ball.ballRadius) >= (locator)
        ) ||
        (
          (this.ball.ball.y - this.ball.ballRadius) <= (locator2 + paddle.height) &&
          (this.ball.ball.y - this.ball.ballRadius) >= locator2
        ) ||
        (
          (this.ball.ball.y + this.ball.ballRadius) <= (locator2 + paddle.height) &&
          (this.ball.ball.y + this.ball.ballRadius) >= (locator2)
        )
    ) {
      return true;
    } else {
      return false;
    }
  }

  removeEventListenersFar() {
    this.ball.direction = 0;
    this.ticker.removeEventListener('tick', this.ball.move.bind(this.ball));
    this.ticker.removeEventListener('tick', this.scaleTracker.bind(this));
    this.ticker.removeEventListener('tick', this.aiPaddle.movePaddle.bind(this.aiPaddle, this.ball));
    this.handleFarBallFinish();
  }

  removeEventListenersNear() {
    this.ball.direction = 0;
    this.ball.xVelocity = 0;
    this.ball.yVelocity = 0;
    this.ball.xSpin = 0;
    this.ball.ySpin = 0;
    this.ticker.removeEventListener('tick', this.ball.move.bind(this.ball));
    this.ticker.removeEventListener('tick', this.scaleTracker.bind(this));
    this.ball.draw("red");
  }

  paddleHit() {
    //far hit
    if (this.ball.direction === 1 && this.ball.distance === this.totalDistance) {
      if (this.isPaddleHitX(this.aiPaddle) && this.isPaddleHitY(this.aiPaddle)) {
        this.ball.direction = -1;
      } else {
        this.pointWinner = Human;
        this.removeEventListenersFar();
        this.restart();
      }
    //near hit
    } else if (this.ball.direction === -1 && this.ball.distance === 0) {
      if (this.isPaddleHitX(this.humanPaddle) && this.isPaddleHitY(this.humanPaddle)) {
        this.getSpinFromPaddles();
        this.ball.direction = 1;
      } else {
        this.pointWinner = Ai;
        this.removeEventListenersNear();
        this.restart();
      }
    }
  }

  eventListenerPaddlesAndBall() {
    this.ticker.addEventListener('tick', this.paddleHit.bind(this));
  }

  //everything

  eventListenerEverythingButPaddles() {
    this.eventListenerTracker();
    this.eventListenerBall();
    this.eventListenerPaddlesAndBall();
  }

  //start

  restart() {
    setTimeout(this.game.startPoint.bind(this.game), 1000);
  }


  isStartHit() {
    if (this.ball.direction === 0 &&
        this.ball.distance === 0 &&
        this.isPaddleHitX(this.humanPaddle) &&
        this.isPaddleHitY(this.humanPaddle)){
        return true;
    }
  }

  handleStartClick() {
    if (this.isStartHit()) {
      this.getSpinFromPaddles();
      this.ball.direction = 1;
      this.eventListenerEverythingButPaddles();
    }
  }

  eventListenerStart() {
    document.addEventListener('mousedown', this.handleStartClick.bind(this));
  }
}

export default Tunnel;
