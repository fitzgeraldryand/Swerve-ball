const humanWidth = 124;
const humanHeight = 80;

class Paddle {
  constructor(stage, game, type) {
    this.stage = stage;
    this.game = game;
    this.type = type;
    this.paddle = new createjs.Shape();
    this.drawPaddle();
    // this.movePaddle();
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
      this.paddle.graphics.beginStroke("red").beginFill('gray').drawRoundRect(380, 388, 38, 24, 4);
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
      if (this.paddle.x > 710 - humanWidth) {
        this.paddle.x = 710 - humanWidth;
      } else if (this.paddle.x < 90) {
        this.paddle.x = 90;
      }

      if (this.paddle.y < 190) {
        this.paddle.y = 190;
      } else if (this.paddle.y > 610 - humanHeight) {
        this.paddle.y = 610 - humanHeight;
      }
    }
  }

  movePaddle() {

    if (this.type === 'Human') {
      this.paddle.x = this.stage.mouseX - humanWidth / 2;
      this.paddle.y = this.stage.mouseY - humanHeight / 2;
    }

    this.defineBounds();
    this.stage.update();
  }

}

export default Paddle;
