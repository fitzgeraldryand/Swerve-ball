const humanWidth = 124;
const humanHeight = 80;
const aiWidth = 38;
const aiHeight = 24;

class Paddle {
  constructor(stage, game, type) {
    this.stage = stage;
    this.game = game;
    this.type = type;
    this.paddle = new createjs.Shape();
    this.color = (this.type === 'Human' ? "blue" : "red");
    this.drawPaddle(this.color);
    this.width = (this.type === 'Human' ? humanWidth : aiWidth);
    this.height = (this.type === 'Human' ? humanHeight : aiHeight);
    this.placeholderX = this.paddle.x;
    this.placeholderY = this.paddle.y;
    this.placeholder2X = this.paddle.x;
    this.placeholder2Y = this.paddle.y;
  }

  drawPaddle(color) {
    if (this.type === 'Human') {
      this.paddle.graphics.beginStroke(color).beginFill('gray').drawRoundRect(0, 0, humanWidth, humanHeight, 8);
      this.paddle.alpha = 0.5;
      // debugger
      this.paddle.x = 338;
      this.paddle.y = 360;
      this.stage.addChild(this.paddle);
      // const centerHumanPaddle = new createjs.Shape();
      // centerHumanPaddle.graphics.beginStroke("blue").beginFill('gray').drawRoundRect(338, 360, 124, 25, 16, 8);
      // centerHumanPaddle.alpha = 0.5;
      // this.stage.addChild(centerHumanPaddle);
    } else {
      this.paddle.graphics.beginStroke(color).beginFill('gray').drawRoundRect(0, 0, aiWidth, aiHeight, 4);
      this.paddle.alpha = 0.5;
      this.paddle.x = 380;
      this.paddle.y = 388;
      this.stage.addChild(this.paddle);
    }
    this.stage.update();
  }

  // center() {
  //  this.paddle.x -= this.width / 2;
  //  this.paddle.y -= this.height / 2;
  // }

  defineBounds() {
    if (this.type === 'Human') {
      if (this.paddle.x > 710 - this.width) {
        this.paddle.x = 710 - this.width;
      } else if (this.paddle.x < 90) {
        this.paddle.x = 90;
      }

      if (this.paddle.y < 190) {
        this.paddle.y = 190;
      } else if (this.paddle.y > 610 - this.height) {
        this.paddle.y = 610 - this.height;
      }
    } else {
      if (this.paddle.x > 478 - this.width) {
        this.paddle.x = 478 - this.width;
      } else if (this.paddle.x < 322) {
        this.paddle.x = 322;
      }

      if (this.paddle.y < 348) {
        this.paddle.y = 348;
      } else if (this.paddle.y > 452 - this.height) {
        this.paddle.y = 452 - this.height;
      }
    }
  }

  movePaddle(ball) {
    if (this.type === 'Human') {
      this.previousX = this.placeholder2X;
      this.previousY = this.placeholder2Y;

      this.placeholder2X = this.placeholderX;
      this.placeholder2Y = this.placeholderY;

      this.placeholderX = this.paddle.x;
      this.placeholderY = this.paddle.y;

      this.paddle.x = this.stage.mouseX - this.width / 2;
      this.paddle.y = this.stage.mouseY - this.height / 2;
    } else {
      this.defineBounds();
      const difX = ball.farX - (this.paddle.x + (this.width / 2));
      const difY = ball.farY - (this.paddle.y + (this.height / 2));
      debugger
      this.paddle.x += difX / 20;
      this.paddle.y += difY / 20;
    }

    this.defineBounds();
    this.stage.update();
  }

  spinVector() {
    const xSpin = this.paddle.x - this.previousX;
    const ySpin = this.paddle.y - this.previousY;

    return [xSpin, ySpin];
  }
}

export default Paddle;
