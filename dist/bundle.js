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
    this.ball = new createjs.Shape();
    this.ballRadius = startRadius;
    this.direction = 1;
    this.distance = 0;
    this.draw("#5df942", 400, 400);
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.xSpin = 0;
    this.ySpin = 0;
    this.rawX = 400;
    this.rawY = 400;
    this.farX = 400;
    this.farY = 400;
  }

  draw(color, locationX = this.ball.x, locationY = this.ball.y) {
    this.ball.graphics
      .beginRadialGradientFill(["#fafafa",color], [0, 1], 8, -8, 3, 0, 0, this.ballRadius)
      .drawCircle(0, 0, this.ballRadius);
    this.ball.x = locationX;
    this.ball.y = locationY;
    this.stage.addChild(this.ball);
    this.stage.update();
  }

  applySpin() {
    if (this.direction === 1){
      this.xVelocity -= this.xSpin / this.totalDistance;
      this.yVelocity -= this.ySpin / this.totalDistance;
    } else {
      this.xVelocity += this.xSpin / this.totalDistance;
      this.yVelocity += this.ySpin / this.totalDistance;
    }
  }

  scaleBall() {
    this.ball.scaleX = 1 - (this.distance * 3) / (4 * this.totalDistance);
    this.ball.scaleY = 1 - (this.distance * 3) / (4 * this.totalDistance);
    this.ballRadius = startRadius * this.ball.scaleX;
    this.stage.update();
  }

  moveThroughTunnel() {
    if (this.direction === 1) {
      this.distance += 2.5;
    } else if (this.direction === -1) {
      this.distance -= 2.5;
    }
    this.scaleBall();
    this.applySpin();
    this.applyVelocity();
    this.applyPerspective();
    this.adjustForRadius();
    this.stage.update();
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

  applyPerspective() {
    const distanceRatio= this.distance / this.totalDistance;

    this.ball.x = this.rawX - (this.rawX - this.farX) * distanceRatio;
    this.ball.y = this.rawY - (this.rawY - this.farY) * distanceRatio;
  }



 applyVelocity() {
    this.rawX += this.xVelocity;
    this.farX = (this.rawX - 400) * 79/312 + 400;

    this.rawY += this.yVelocity;
    this.farY = (this.rawY - 400) * 53/209 + 400;
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
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.stage = new createjs.Stage("canvas");
    this.tunnel = new _tunnel_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.stage, this, this.difficulty);
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
    this.ticker = createjs.Ticker;
    this.ticker.framerate = 80;
    this.totalDistance = 240;
    this.difficulty = difficulty;
    this.drawTunnel();
    this.aiPaddle = new _paddle_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.stage, this.game, Ai);
    this.ball = new _ball_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.stage, this.game, this.totalDistance, this.difficulty);
    this.humanPaddle = new _paddle_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.stage, this.game, Human);
    this.tracker = new createjs.Shape();
    this.drawTracker();
    this.controlPaddle();
    this.moveBall();
    this.checkHit();
  }

  drawBorders() {
    const border1 = new createjs.Shape();
    border1.graphics.beginStroke("#28d36b").drawRect(90, 190, 620, 420);
    const border2 = new createjs.Shape();
    border2.graphics.beginStroke("#28d36b").drawRect(322, 348, 156, 104);
    const border3 = new createjs.Shape();
    border3.graphics.beginStroke("#28d36b").drawRect(145, 230, 510, 340);
    const border4 = new createjs.Shape();
    border4.graphics.beginStroke("#28d36b").drawRect(195, 265, 410, 270);
    const border5 = new createjs.Shape();
    border5.graphics.beginStroke("#28d36b").drawRect(234, 289, 332, 222);
    const border6 = new createjs.Shape();
    border6.graphics.beginStroke("#28d36b").drawRect(262, 308, 276, 184);
    const border7 = new createjs.Shape();
    border7.graphics.beginStroke("#28d36b").drawRect(300, 334, 200, 132);
    const border8 = new createjs.Shape();
    border8.graphics.beginStroke("#28d36b").drawRect(312, 341, 176, 118);
    const border9 = new createjs.Shape();
    border9.graphics.beginStroke("#28d36b").drawRect(284, 325, 232, 154);

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

  controlPaddle() {
    this.ticker.addEventListener('tick', this.aiPaddle.movePaddle.bind(this.aiPaddle, this.ball));
    this.ticker.addEventListener('tick', this.humanPaddle.movePaddle.bind(this.humanPaddle, this.ball));
  }


  checkHit() {
    this.ticker.addEventListener('tick', this.hitOrNot.bind(this));
  }

  hitOrNot() {
    if (this.ball.direction === 1 && this.ball.distance === this.totalDistance) {
      if (this.hitX(this.aiPaddle) && this.hitY(this.aiPaddle)) {
        // this.ball.xVelocity = this.aiPaddle.paddleVelocityX();
        // debugger
        // this.ball.yVelocity = this.aiPaddle.paddleVelocityY();
        // this.aiPaddle.paddle.graphics.draw("yellow");
        this.ball.direction = -1;
      } else {
        this.ball.direction = 0;
        this.ticker.removeEventListener('tick', this.ball.moveThroughTunnel.bind(this.ball));
        this.ticker.removeEventListener('tick', this.scaleTracker.bind(this));
        this.ticker.removeEventListener('tick', this.aiPaddle.movePaddle.bind(this.aiPaddle, this.ball));
        this.handleFarBallFinish();
      }
    } else if (this.ball.direction === -1 && this.ball.distance === 0) {
      if (this.hitX(this.humanPaddle) && this.hitY(this.humanPaddle)) {
        // this.ball.xVelocity = this.humanPaddle.paddleVelocityX();
        // this.ball.yVelocity = this.humanPaddle.paddleVelocityY();
        this.getSpin();
        this.ball.direction = 1;
      } else {
        this.ball.direction = 0;
        this.ball.xVelocity = 0;
        this.ball.yVelocity = 0;
        this.ball.xSpin = 0;
        this.ball.ySpin = 0;
        this.ticker.removeEventListener('tick', this.ball.moveThroughTunnel.bind(this.ball));
        this.ticker.removeEventListener('tick', this.scaleTracker.bind(this));
        this.ball.draw("red");
      }
    }
  }

  handleFarBallFinish() {
    this.stage.removeChild(this.ball.ball);
    const deadBall = new createjs.Shape();
    deadBall.graphics
      .beginRadialGradientFill(["#fafafa","red"], [0, 1], 2, -2, .25, 0, 0, this.ball.ballRadius)
      .drawCircle(0, 0, this.ball.ballRadius);
    deadBall.x = this.ball.ball.x;
    deadBall.y = this.ball.ball.y;
    this.stage.addChild(deadBall);
    this.stage.update();
  }

  hitX(paddle) {
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

  hitY(paddle) {
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

  drawTracker() {
    this.tracker.graphics.beginStroke("white").drawRect(90, 190, 620, 420);
    // this.tracker.x = 90;
    // this.tracker.y = 190;
    this.stage.addChild(this.tracker);
    this.stage.update();
  }

  moveBall() {
    this.ticker.addEventListener('tick', this.ball.moveThroughTunnel.bind(this.ball));
    this.ticker.addEventListener('tick', this.scaleTracker.bind(this));
    this.ticker.addEventListener('tick', this.detectWallBounce.bind(this));
  }

  // bounceBallOffWalls() {
  //   debugger
  //   if
  //     (
  //       (this.ball.ball.x - this.ball.ballRadius <= this.prevTrackerX) ||
  //       (this.ball.ball.x + this.ball.ballRadius >= this.prevTrackerW + this.prevTrackerX)
  //     )
  //     {
  //       this.ball.xVelocity = this.ball.xVelocity * -1;
  //       this.stage.update();
  //     }
  //   else if
  //     (
  //       (this.ball.ball.y - this.ball.ballRadius <= this.prevTrackerY) ||
  //       (this.ball.ball.y + this.ball.ballRadius >= this.prevTrackerH + this.prevTrackerY)
  //     )
  //     {
  //       this.ball.yVelocity = this.ball.yVelocity * -1;
  //       this.stage.update();
  //     }
  // }

  detectWallBounce() {
    if(this.ball.rawX >= 710 || this.ball.rawX <= 90){
      this.ball.xVelocity = this.ball.xVelocity * -1;
      this.ball.xSpin = 0;
    }

    if(this.ball.rawY >= 610 || this.ball.rawY <= 190){
      this.ball.yVelocity = this.ball.yVelocity * -1;
      this.ball.ySpin = 0;
    }
  }

  getSpin() {
    let [xSpin, ySpin] = this.humanPaddle.spinVector();
    this.ball.xSpin += xSpin;
    this.ball.ySpin += ySpin;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Tunnel);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map