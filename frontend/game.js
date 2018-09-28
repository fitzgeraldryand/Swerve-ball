import Tunnel from './tunnel.js';

class Game {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.stage = new createjs.Stage("canvas");
    this.tunnel = new Tunnel(this.stage, this, this.difficulty);
  }
}

const game = new Game();
