import Tunnel from './tunnel.js';

class Game {
  constructor() {
    this.difficulty = 0;
    this.stage = new createjs.Stage("canvas");

    //use this object b/c need bracket method to dynamically create life variable names
    //using index in drawLives; this way can remove from stage explicitly
    this.lives = {};
    this.humanLives = 5;
    this.aiLives = 3;

    this.stage.removeAllChildren();
    this.tunnel = new Tunnel(this.stage, this, this.difficulty);
    this.writeLevel();
    this.drawLives(this.humanLives, 'Human');
    this.drawLives(this.aiLives, 'Ai');
  }

  startPoint() {
    // debugger
    this.tunnel.ticker.removeAllEventListeners();
    this.removeLives();
    this.updateLives();
    if (this.isLevelWon()) {
      this.difficulty++;
      this.removePiecesExceptPaddle();
      // this.flashLevel();
      this.aiLives = 3;
      this.continuePlay();
    } else if (this.isGameOver()) {
      this.removePieces();
      this.writeGameOver();
    } else {
      this.continuePlay();
    }
  }

  continuePlay() {
    this.stage.removeAllChildren();
    this.tunnel = new Tunnel(this.stage, this, this.difficulty);
    this.lives = {};
    this.writeLevel();
    this.drawLives(this.humanLives, 'Human');
    this.drawLives(this.aiLives, 'Ai');
  }

  updateLives() {
    // debugger
    if (this.tunnel.pointWinner === 'Ai') {
      this.humanLives--;
    } else if (this.tunnel.pointWinner === 'Human') {
      this.aiLives--;
    }
    console.log(`Human lives: ${this.humanLives}`);
    console.log(`Ai lives: ${this.aiLives}`);
  }

  isLevelWon() {
    if (this.humanLives > 0 && this.aiLives === 0) {
      return true;
    } else {
      return false;
    }
  }

  isGameOver() {
    // debugger
    if (this.aiLives === 0 || this.humanLives === 0) {
      return true;
    } else {
      return false;
    }
  }

  removePieces() {
    this.stage.removeChild(this.level);
    this.stage.removeChild(this.tunnel.ball.ball);
    this.stage.removeChild(this.tunnel.aiPaddle.paddle);
    this.stage.removeChild(this.tunnel.humanPaddle.paddle);
    this.stage.removeChild(this.tunnel.deadBall);
    this.stage.removeChild(this.tunnel.tracker);
  }

  removePiecesExceptPaddle() {
    this.stage.removeChild(this.level);
    this.stage.removeChild(this.tunnel.ball.ball);
    this.stage.removeChild(this.tunnel.aiPaddle.paddle);
    this.stage.removeChild(this.tunnel.deadBall);
    this.stage.removeChild(this.tunnel.tracker);
  }

  writeGameOver() {
    const gameOver = new createjs.Text("Game Over", "60px Courier New", "white");
    gameOver.x = 240;
    gameOver.y = 400;
    gameOver.textBaseline = "alphabetic";
    this.stage.addChild(gameOver);
    this.stage.update();
  }

  writeLevel() {
    this.level = new createjs.Text(`Level: ${this.difficulty + 1}`, "18px Courier New", "white");
    this.level.x = 540;
    this.level.y = 220;
    this.level.textBaseline = "alphabetic";
    this.stage.addChild(this.level);
    this.stage.update();
  }

  // flashLevel() {
  //   const level = new createjs.Text(`Level: ${this.difficulty + 1}`, "60px Courier New", "white");
  //   level.x = 240;
  //   level.y = 400;
  //   level.textBaseline = "alphabetic";
  //   this.stage.addChild(level);
  //   this.stage.update();
  // }

  drawLives(lives, type) {
    let startX = type === 'Human' ? 620 : 178;
    const color = type === 'Human' ? 'blue' : 'red';
    for (var i = 0; i < lives; i++) {
      this.lives[type + i] = new createjs.Shape();
      this.lives[type + i].graphics
      .beginRadialGradientFill(["#fafafa",color], [0, 1], 2, -2, .25, 0, 0, 5)
      .drawCircle(0, 0, 5);

      if (type === 'Human') {
        this.lives[type + i].x = startX - (15 * i);
      } else {
        this.lives[type + i].x = startX + (15 * i);
      }
      this.lives[type + i].y = 238;
      this.stage.addChild(this.lives[type + i]);
    }
  }

  removeLives() {
    for (var i = 0; i < this.humanLives; i++) {
      this.stage.removeChild(this.lives['Human' + i]);
      delete this.lives['Human' + i];
    }

    for (var j = 0; j < this.aiLives; j++) {
      this.stage.removeChild(this.lives['Ai' + j]);
      delete this.lives['Ai' + j];
    }
    this.stage.update();
  }
}

const game = new Game();
