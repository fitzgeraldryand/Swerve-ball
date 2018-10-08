/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/game.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/ball.js":
/*!**************************!*\
  !*** ./frontend/ball.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const startRadius = 30;

class Ball {
  constructor(stage, game, totalDistance, difficulty) {
    this.stage = stage;
    this.game = game;
    this.totalDistance = totalDistance;
    this.difficulty = difficulty;

    this.ball = new createjs.Shape();
    this.ballRadius = startRadius;

    this.set();

    this.draw("#5df942", 400, 400);
  }

  set() {
    this.direction = 0;
    this.distance = 0;
    this.xVelocity = this.yVelocity = 0;
    this.xSpin = this.ySpin = 0;
    this.rawX = this.rawY = 400;
    this.farX = this.farY = 400;
  }

  //accepts arguments for use in Paddle.handleFarBallFinish
  draw(color, locationX = this.ball.x, locationY = this.ball.y) {
    this.ball.graphics
      .beginRadialGradientFill(["#fafafa",color], [0, 1], 8, -8, 3, 0, 0, this.ballRadius)
      .drawCircle(0, 0, this.ballRadius);
    this.ball.x = locationX;
    this.ball.y = locationY;
    this.stage.addChild(this.ball);
    this.stage.update();
  }

  passThroughTunnel() {
    if (this.direction === 1) {
      this.distance += 2.5;
    } else if (this.direction === -1) {
      this.distance -= 2.5;
    }
  }

  // this is the z direction
  // shrink ball based on its distance travelled compared to total distance
  // but dont shrink all the way because then it disappears
  scaleBall() {
    this.ball.scaleX = 1 - (this.distance * 3) / (4 * this.totalDistance);
    this.ball.scaleY = 1 - (this.distance * 3) / (4 * this.totalDistance);
    this.ballRadius = startRadius * this.ball.scaleX;
    this.stage.update();
  }

  applySpin() {
    if (this.direction === 1){
      this.xVelocity -= (this.xSpin * 4) / (3 * this.totalDistance);
      this.yVelocity -= (this.ySpin * 4) / (3 * this.totalDistance);
    } else {
      this.xVelocity += (this.xSpin * 4) / (3 * this.totalDistance);
      this.yVelocity += (this.ySpin * 4) / (3 * this.totalDistance);
    }
  }

  applyVelocity() {
    this.rawX += this.xVelocity;
    this.farX = (this.rawX - 400) * 81/322 + 400;

    this.rawY += this.yVelocity;
    this.farY = (this.rawY - 400) * 88/348 + 400;
  }

  applyPerspective() {
    const distanceRatio = this.distance / this.totalDistance;

    this.ball.x = this.rawX - (this.rawX - this.farX) * distanceRatio;
    this.ball.y = this.rawY - (this.rawY - this.farY) * distanceRatio;
  }

  adjustForRadius() {
    if (this.rawX > 400) {
      this.ball.x -= this.ballRadius * (this.rawX - 400)/322;
    } else if (this.rawX < 400) {
      this.ball.x += this.ballRadius * (400 - this.rawX)/322;
    }

    if (this.rawY > 400) {
      this.ball.y -= this.ballRadius * (this.rawY - 400)/348;
    } else if (this.rawY < 400) {
      this.ball.y += this.ballRadius * (400 - this.rawY)/348;
    }
  }

  move() {
    this.passThroughTunnel();
    this.scaleBall();
    this.applySpin();
    this.applyVelocity();
    this.applyPerspective();
    this.adjustForRadius();
    this.stage.update();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Ball);


/***/ }),

/***/ "./frontend/game.js":
/*!**************************!*\
  !*** ./frontend/game.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tunnel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tunnel.js */ "./frontend/tunnel.js");


class Game {
  constructor() {
    this.difficulty = 0;
    this.stage = new createjs.Stage("canvas");

    //use this object b/c need bracket method to dynamically create life variable names
    //using index in drawLives; this way can remove from stage explicitly
    this.lives = {};
    this.humanLives = 5;
    this.aiLives = 3;

    this.start = this.start.bind(this);

    this.land();
  }

  land() {
    this.tunnel = new _tunnel_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.stage, this, this.difficulty);
    this.writeBigText('Swerveball');
    this.drawButton();
    document.addEventListener('mousedown', this.start);
  }

  drawButton() {
    const text = new createjs.Text("CLICK TO START", "20px Courier New", "white");
    text.x = 330;
    text.y = 462;
    text.textBaseline = "alphabetic";
    this.stage.addChild(text);
    this.stage.update();
  }

  start(){
    document.removeEventListener('mousedown', this.start);
    this.stage.removeAllChildren();
    this.tunnel = new _tunnel_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.stage, this, this.difficulty);
    this.writeLevel();
    this.drawLives(this.humanLives, 'Human');
    this.drawLives(this.aiLives, 'Ai');
    this.tunnel.startTunnel();
  }

  startPoint() {
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
      this.writeBigText('Game Over');
    } else {
      this.continuePlay();
    }
  }

  continuePlay() {
    this.stage.removeAllChildren();
    this.tunnel = new _tunnel_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.stage, this, this.difficulty);
    this.tunnel.startTunnel();
    this.lives = {};
    this.writeLevel();
    this.drawLives(this.humanLives, 'Human');
    this.drawLives(this.aiLives, 'Ai');
  }

  updateLives() {
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

  writeBigText(text) {
    const gameOver = new createjs.Text(`${text}`, "60px Courier New", "white");
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


/***/ }),

/***/ "./frontend/paddle.js":
/*!****************************!*\
  !*** ./frontend/paddle.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const humanWidth = 124;
const humanHeight = 80;
const aiWidth = 38;
const aiHeight = 24;

class Paddle {
  constructor(stage, game, type, difficulty) {
    this.stage = stage;
    this.game = game;
    this.type = type;
    this.difficulty = difficulty;

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
      this.paddle.x += (xGap * (0.025 * (this.difficulty + 1)));
      this.paddle.y += (yGap * (0.025 * (this.difficulty + 1)));
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

/* harmony default export */ __webpack_exports__["default"] = (Paddle);


/***/ }),

/***/ "./frontend/tunnel.js":
/*!****************************!*\
  !*** ./frontend/tunnel.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _paddle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./paddle.js */ "./frontend/paddle.js");
/* harmony import */ var _ball_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ball.js */ "./frontend/ball.js");
const Ai = 'Ai';
const Human = 'Human';



class Tunnel {
  constructor(stage, game, difficulty) {
    this.stage = stage;
    this.game = game;
    this.difficulty = difficulty;
    this.totalDistance = 240;

    this.drawTunnel();
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

  startTunnel() {
    this.aiPaddle = new _paddle_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.stage, this.game, Ai, this.difficulty);
    this.tracker = new createjs.Shape();
    this.drawTracker();
    this.ball = new _ball_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.stage, this.game, this.totalDistance, this.difficulty);
    this.humanPaddle = new _paddle_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.stage, this.game, Human, this.difficulty);

    this.ticker = createjs.Ticker;
    this.ticker.framerate = 80 + (5 * this.difficulty);

    this.pointWinner = null;
    this.ticker.removeAllEventListeners('tick');
    this.eventListenerPaddles();
    this.eventListenerStart();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Tunnel);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map