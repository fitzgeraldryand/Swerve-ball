const humanWidth = 124;
const humanHeight = 80;
const aiWidth = 38;
const aiHeight = 24;

class Paddle {
  constructor(stage, game, type, difficulty) {
    this.stage = stage;
    this.game = game;
    this.type = type;

    this.paddle = new createjs.Shape();
    this.width = (this.type === 'Human' ? humanWidth : aiWidth);
    this.height = (this.type === 'Human' ? humanHeight : aiHeight);
    this.drawPaddle();

    //below values used for applying spin
    this.placeholderX = this.paddle.x;
    this.placeholderY = this.paddle.y;
    this.placeholder2X = this.paddle.x;
    this.placeholder2Y = this.paddle.y;
  }

  drawPaddle() {
    const color = (this.type === 'Human' ? "blue" : "red");
    const width = this.width;
    const height = this.height;
    const radius = (this.type === 'Human' ? 8 : 4);
    const x = (this.type === 'Human' ? 338 : 380);
    const y = (this.type === 'Human' ? 360 : 388);

    this.paddle.graphics.beginStroke(color).beginFill('gray').drawRoundRect(0, 0, width, height, radius);
    this.paddle.alpha = 0.5;
    this.paddle.x = x;
    this.paddle.y = y;

    this.stage.addChild(this.paddle);
    this.stage.update();
  }

  defineBounds() {
    if (this.type === 'Human') {
      //define right bound
      if (this.paddle.x > 710 - this.width) {
        this.paddle.x = 710 - this.width;
      //define left bound
      } else if (this.paddle.x < 90) {
        this.paddle.x = 90;
      }

      //define bottom bound
      if (this.paddle.y < 190) {
        this.paddle.y = 190;
      //define top bound
      } else if (this.paddle.y > 610 - this.height) {
        this.paddle.y = 610 - this.height;
      }
    } else {
      //define right bound
      if (this.paddle.x > 478 - this.width) {
        this.paddle.x = 478 - this.width;
      //define left bound
      } else if (this.paddle.x < 322) {
        this.paddle.x = 322;
      }

      //define bottom bound
      if (this.paddle.y < 348) {
        this.paddle.y = 348;
      //define top bound
      } else if (this.paddle.y > 452 - this.height) {
        this.paddle.y = 452 - this.height;
      }
    }
  }

  //keep placeholder values to keep use a further back position
  //to increase the spin applied in spinVector and improve
  //gameplay feel of spinning ball
  movePaddle(ball) {
    if (this.type === 'Human') {
      //"previous" values keep track of 4 positions ago, and are the values
      //actually used in spinVector
      this.previousX = this.placeholder2X;
      this.previousY = this.placeholder2Y;

      this.placeholder2X = this.placeholderX;
      this.placeholder2Y = this.placeholderY;

      this.placeholderX = this.paddle.x;
      this.placeholderY = this.paddle.y;

      this.paddle.x = this.stage.mouseX - this.width / 2;
      this.paddle.y = this.stage.mouseY - this.height / 2;
    } else {
      const xGap = ball.farX - (this.paddle.x + (this.width / 2));
      const yGap = ball.farY - (this.paddle.y + (this.height / 2));
      //below divisor determines how quickly aiPaddle reacts
      this.paddle.x += xGap / 20;
      this.paddle.y += yGap / 20;
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
