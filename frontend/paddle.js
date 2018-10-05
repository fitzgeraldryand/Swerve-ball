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
    this.drawPaddle();
    this.width = (this.type === 'Human' ? humanWidth : aiWidth);
    this.height = (this.type === 'Human' ? humanHeight : aiHeight);
    this.placeholderX = 400;
    this.placeholderY = 400;
  }

  drawPaddle() {
    if (this.type === 'Human') {
      this.paddle.graphics.beginStroke("blue").beginFill('gray').drawRoundRect(0, 0, humanWidth, humanHeight, 8);
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
      this.paddle.graphics.beginStroke("red").beginFill('gray').drawRoundRect(380, 388, aiWidth, aiHeight, 4);
      this.paddle.alpha = 0.5;
      // this.paddle.x = 380;
      // this.paddle.y = 388;
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

  movePaddle() {
    this.previousX = this.placeholderX;
    this.previousY = this.placeholderY;

    this.placeholderX = this.paddle.x;
    this.placeholderY = this.paddle.y;

    this.paddle.x = this.stage.mouseX - this.width / 2;
    this.paddle.y = this.stage.mouseY - this.height / 2;

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
