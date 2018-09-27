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
    this.stage = new createjs.Stage("canvas");
    this.tunnel = new _tunnel_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.stage, this);
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
  constructor(stage, game) {
    this.stage = stage;
    this.game = game;
    this.drawTunnel();
    this.aiPaddle = new _paddle_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.stage, this.game, Ai);
    this.ball = new _ball_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.stage, this.game);
    this.humanPaddle = new _paddle_js__WEBPACK_IMPORTED_MODULE_0__["default"](this.stage, this.game, Human);
    this.ticker = createjs.Ticker;
    this.controlPaddle();
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
    this.ticker.addEventListener('tick', this.humanPaddle.movePaddle.bind(this.humanPaddle));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Tunnel);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map