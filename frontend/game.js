import Tunnel from './tunnel.js';

class Game {
  constructor() {
    this.stage = new createjs.Stage("canvas");
    this.tunnel = new Tunnel(this.stage, this);
  }
}

const game = new Game();
