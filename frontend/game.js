import Tunnel from './tunnel.js';

class Game {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.stage = new createjs.Stage("canvas");

    this.humanLives = 2;
    this.aiLives = 2;

    this.stage.removeAllChildren();
    this.tunnel = new Tunnel(this.stage, this, this.difficulty);
  }

  startPoint() {
    // debugger
    this.updateLives();
    if (this.isGameOver()) {
      this.removePieces();
      this.writeGameOver();
    } else {
      this.stage.removeAllChildren();
      this.tunnel = new Tunnel(this.stage, this, this.difficulty);
    }
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

  isGameOver() {
    // debugger
    if (this.aiLives === 0 || this.humanLives === 0) {
      return true;
    } else {
      return false;
    }
  }

  removePieces() {
    this.stage.removeChild(this.tunnel.ball.ball);
    this.stage.removeChild(this.tunnel.aiPaddle.paddle);
    this.stage.removeChild(this.tunnel.humanPaddle.paddle);
    this.stage.removeChild(this.tunnel.deadBall);
    this.stage.removeChild(this.tunnel.tracker);
  }

  writeGameOver() {
    const gameOver = new createjs.Text("Game Over", "60px DejaVu Sans Mono", "white");
    gameOver.x = 260;
    gameOver.y = 400;
    gameOver.textBaseline = "alphabetic";
    this.stage.addChild(gameOver);
    this.stage.update();
  }

  // playLevel() {
  //
  //   for (; this.humanLives > 0 && this.aiLives > 0;) {
  //     this.tunnel.newTunnel();
  //     if (this.tunnel.pointWinner === null) {
  //       continue;
  //     } else if (this.tunnel.pointWinner === 'Human') {
  //       humanLives--;
  //       console.log(humanLives);
  //     } else {
  //       aiLives--;
  //       console.log(aiLives);
  //     }
  //   }
  // }
}

const game = new Game();
