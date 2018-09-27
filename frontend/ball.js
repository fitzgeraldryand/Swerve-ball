
class Ball {
  constructor(stage, game) {
    this.stage = stage;
    this.game = game;
    this.ball = new createjs.Shape();
    this.draw();
  }


  draw() {
    const circle = new createjs.Shape();
    circle.graphics
      .beginRadialGradientFill(["#fafafa","#5df942"], [0, 1], 8, -8, 3, 0, 0, 30)
      .drawCircle(0, 0, 30);
    circle.x = circle.y = 400;
    this.stage.addChild(circle);
    this.stage.update();
  }
}

export default Ball;
