/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

eval("// Copyright Joyent, Inc. and other Node contributors.\n//\n// Permission is hereby granted, free of charge, to any person obtaining a\n// copy of this software and associated documentation files (the\n// \"Software\"), to deal in the Software without restriction, including\n// without limitation the rights to use, copy, modify, merge, publish,\n// distribute, sublicense, and/or sell copies of the Software, and to permit\n// persons to whom the Software is furnished to do so, subject to the\n// following conditions:\n//\n// The above copyright notice and this permission notice shall be included\n// in all copies or substantial portions of the Software.\n//\n// THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS\n// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF\n// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN\n// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,\n// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR\n// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE\n// USE OR OTHER DEALINGS IN THE SOFTWARE.\n\n\n\nvar R = typeof Reflect === 'object' ? Reflect : null\nvar ReflectApply = R && typeof R.apply === 'function'\n  ? R.apply\n  : function ReflectApply(target, receiver, args) {\n    return Function.prototype.apply.call(target, receiver, args);\n  }\n\nvar ReflectOwnKeys\nif (R && typeof R.ownKeys === 'function') {\n  ReflectOwnKeys = R.ownKeys\n} else if (Object.getOwnPropertySymbols) {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target)\n      .concat(Object.getOwnPropertySymbols(target));\n  };\n} else {\n  ReflectOwnKeys = function ReflectOwnKeys(target) {\n    return Object.getOwnPropertyNames(target);\n  };\n}\n\nfunction ProcessEmitWarning(warning) {\n  if (console && console.warn) console.warn(warning);\n}\n\nvar NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {\n  return value !== value;\n}\n\nfunction EventEmitter() {\n  EventEmitter.init.call(this);\n}\nmodule.exports = EventEmitter;\nmodule.exports.once = once;\n\n// Backwards-compat with node 0.10.x\nEventEmitter.EventEmitter = EventEmitter;\n\nEventEmitter.prototype._events = undefined;\nEventEmitter.prototype._eventsCount = 0;\nEventEmitter.prototype._maxListeners = undefined;\n\n// By default EventEmitters will print a warning if more than 10 listeners are\n// added to it. This is a useful default which helps finding memory leaks.\nvar defaultMaxListeners = 10;\n\nfunction checkListener(listener) {\n  if (typeof listener !== 'function') {\n    throw new TypeError('The \"listener\" argument must be of type Function. Received type ' + typeof listener);\n  }\n}\n\nObject.defineProperty(EventEmitter, 'defaultMaxListeners', {\n  enumerable: true,\n  get: function() {\n    return defaultMaxListeners;\n  },\n  set: function(arg) {\n    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {\n      throw new RangeError('The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received ' + arg + '.');\n    }\n    defaultMaxListeners = arg;\n  }\n});\n\nEventEmitter.init = function() {\n\n  if (this._events === undefined ||\n      this._events === Object.getPrototypeOf(this)._events) {\n    this._events = Object.create(null);\n    this._eventsCount = 0;\n  }\n\n  this._maxListeners = this._maxListeners || undefined;\n};\n\n// Obviously not all Emitters should be limited to 10. This function allows\n// that to be increased. Set to zero for unlimited.\nEventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {\n  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {\n    throw new RangeError('The value of \"n\" is out of range. It must be a non-negative number. Received ' + n + '.');\n  }\n  this._maxListeners = n;\n  return this;\n};\n\nfunction _getMaxListeners(that) {\n  if (that._maxListeners === undefined)\n    return EventEmitter.defaultMaxListeners;\n  return that._maxListeners;\n}\n\nEventEmitter.prototype.getMaxListeners = function getMaxListeners() {\n  return _getMaxListeners(this);\n};\n\nEventEmitter.prototype.emit = function emit(type) {\n  var args = [];\n  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);\n  var doError = (type === 'error');\n\n  var events = this._events;\n  if (events !== undefined)\n    doError = (doError && events.error === undefined);\n  else if (!doError)\n    return false;\n\n  // If there is no 'error' event listener then throw.\n  if (doError) {\n    var er;\n    if (args.length > 0)\n      er = args[0];\n    if (er instanceof Error) {\n      // Note: The comments on the `throw` lines are intentional, they show\n      // up in Node's output if this results in an unhandled exception.\n      throw er; // Unhandled 'error' event\n    }\n    // At least give some kind of context to the user\n    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));\n    err.context = er;\n    throw err; // Unhandled 'error' event\n  }\n\n  var handler = events[type];\n\n  if (handler === undefined)\n    return false;\n\n  if (typeof handler === 'function') {\n    ReflectApply(handler, this, args);\n  } else {\n    var len = handler.length;\n    var listeners = arrayClone(handler, len);\n    for (var i = 0; i < len; ++i)\n      ReflectApply(listeners[i], this, args);\n  }\n\n  return true;\n};\n\nfunction _addListener(target, type, listener, prepend) {\n  var m;\n  var events;\n  var existing;\n\n  checkListener(listener);\n\n  events = target._events;\n  if (events === undefined) {\n    events = target._events = Object.create(null);\n    target._eventsCount = 0;\n  } else {\n    // To avoid recursion in the case that type === \"newListener\"! Before\n    // adding it to the listeners, first emit \"newListener\".\n    if (events.newListener !== undefined) {\n      target.emit('newListener', type,\n                  listener.listener ? listener.listener : listener);\n\n      // Re-assign `events` because a newListener handler could have caused the\n      // this._events to be assigned to a new object\n      events = target._events;\n    }\n    existing = events[type];\n  }\n\n  if (existing === undefined) {\n    // Optimize the case of one listener. Don't need the extra array object.\n    existing = events[type] = listener;\n    ++target._eventsCount;\n  } else {\n    if (typeof existing === 'function') {\n      // Adding the second element, need to change to array.\n      existing = events[type] =\n        prepend ? [listener, existing] : [existing, listener];\n      // If we've already got an array, just append.\n    } else if (prepend) {\n      existing.unshift(listener);\n    } else {\n      existing.push(listener);\n    }\n\n    // Check for listener leak\n    m = _getMaxListeners(target);\n    if (m > 0 && existing.length > m && !existing.warned) {\n      existing.warned = true;\n      // No error code for this since it is a Warning\n      // eslint-disable-next-line no-restricted-syntax\n      var w = new Error('Possible EventEmitter memory leak detected. ' +\n                          existing.length + ' ' + String(type) + ' listeners ' +\n                          'added. Use emitter.setMaxListeners() to ' +\n                          'increase limit');\n      w.name = 'MaxListenersExceededWarning';\n      w.emitter = target;\n      w.type = type;\n      w.count = existing.length;\n      ProcessEmitWarning(w);\n    }\n  }\n\n  return target;\n}\n\nEventEmitter.prototype.addListener = function addListener(type, listener) {\n  return _addListener(this, type, listener, false);\n};\n\nEventEmitter.prototype.on = EventEmitter.prototype.addListener;\n\nEventEmitter.prototype.prependListener =\n    function prependListener(type, listener) {\n      return _addListener(this, type, listener, true);\n    };\n\nfunction onceWrapper() {\n  if (!this.fired) {\n    this.target.removeListener(this.type, this.wrapFn);\n    this.fired = true;\n    if (arguments.length === 0)\n      return this.listener.call(this.target);\n    return this.listener.apply(this.target, arguments);\n  }\n}\n\nfunction _onceWrap(target, type, listener) {\n  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };\n  var wrapped = onceWrapper.bind(state);\n  wrapped.listener = listener;\n  state.wrapFn = wrapped;\n  return wrapped;\n}\n\nEventEmitter.prototype.once = function once(type, listener) {\n  checkListener(listener);\n  this.on(type, _onceWrap(this, type, listener));\n  return this;\n};\n\nEventEmitter.prototype.prependOnceListener =\n    function prependOnceListener(type, listener) {\n      checkListener(listener);\n      this.prependListener(type, _onceWrap(this, type, listener));\n      return this;\n    };\n\n// Emits a 'removeListener' event if and only if the listener was removed.\nEventEmitter.prototype.removeListener =\n    function removeListener(type, listener) {\n      var list, events, position, i, originalListener;\n\n      checkListener(listener);\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      list = events[type];\n      if (list === undefined)\n        return this;\n\n      if (list === listener || list.listener === listener) {\n        if (--this._eventsCount === 0)\n          this._events = Object.create(null);\n        else {\n          delete events[type];\n          if (events.removeListener)\n            this.emit('removeListener', type, list.listener || listener);\n        }\n      } else if (typeof list !== 'function') {\n        position = -1;\n\n        for (i = list.length - 1; i >= 0; i--) {\n          if (list[i] === listener || list[i].listener === listener) {\n            originalListener = list[i].listener;\n            position = i;\n            break;\n          }\n        }\n\n        if (position < 0)\n          return this;\n\n        if (position === 0)\n          list.shift();\n        else {\n          spliceOne(list, position);\n        }\n\n        if (list.length === 1)\n          events[type] = list[0];\n\n        if (events.removeListener !== undefined)\n          this.emit('removeListener', type, originalListener || listener);\n      }\n\n      return this;\n    };\n\nEventEmitter.prototype.off = EventEmitter.prototype.removeListener;\n\nEventEmitter.prototype.removeAllListeners =\n    function removeAllListeners(type) {\n      var listeners, events, i;\n\n      events = this._events;\n      if (events === undefined)\n        return this;\n\n      // not listening for removeListener, no need to emit\n      if (events.removeListener === undefined) {\n        if (arguments.length === 0) {\n          this._events = Object.create(null);\n          this._eventsCount = 0;\n        } else if (events[type] !== undefined) {\n          if (--this._eventsCount === 0)\n            this._events = Object.create(null);\n          else\n            delete events[type];\n        }\n        return this;\n      }\n\n      // emit removeListener for all listeners on all events\n      if (arguments.length === 0) {\n        var keys = Object.keys(events);\n        var key;\n        for (i = 0; i < keys.length; ++i) {\n          key = keys[i];\n          if (key === 'removeListener') continue;\n          this.removeAllListeners(key);\n        }\n        this.removeAllListeners('removeListener');\n        this._events = Object.create(null);\n        this._eventsCount = 0;\n        return this;\n      }\n\n      listeners = events[type];\n\n      if (typeof listeners === 'function') {\n        this.removeListener(type, listeners);\n      } else if (listeners !== undefined) {\n        // LIFO order\n        for (i = listeners.length - 1; i >= 0; i--) {\n          this.removeListener(type, listeners[i]);\n        }\n      }\n\n      return this;\n    };\n\nfunction _listeners(target, type, unwrap) {\n  var events = target._events;\n\n  if (events === undefined)\n    return [];\n\n  var evlistener = events[type];\n  if (evlistener === undefined)\n    return [];\n\n  if (typeof evlistener === 'function')\n    return unwrap ? [evlistener.listener || evlistener] : [evlistener];\n\n  return unwrap ?\n    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);\n}\n\nEventEmitter.prototype.listeners = function listeners(type) {\n  return _listeners(this, type, true);\n};\n\nEventEmitter.prototype.rawListeners = function rawListeners(type) {\n  return _listeners(this, type, false);\n};\n\nEventEmitter.listenerCount = function(emitter, type) {\n  if (typeof emitter.listenerCount === 'function') {\n    return emitter.listenerCount(type);\n  } else {\n    return listenerCount.call(emitter, type);\n  }\n};\n\nEventEmitter.prototype.listenerCount = listenerCount;\nfunction listenerCount(type) {\n  var events = this._events;\n\n  if (events !== undefined) {\n    var evlistener = events[type];\n\n    if (typeof evlistener === 'function') {\n      return 1;\n    } else if (evlistener !== undefined) {\n      return evlistener.length;\n    }\n  }\n\n  return 0;\n}\n\nEventEmitter.prototype.eventNames = function eventNames() {\n  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];\n};\n\nfunction arrayClone(arr, n) {\n  var copy = new Array(n);\n  for (var i = 0; i < n; ++i)\n    copy[i] = arr[i];\n  return copy;\n}\n\nfunction spliceOne(list, index) {\n  for (; index + 1 < list.length; index++)\n    list[index] = list[index + 1];\n  list.pop();\n}\n\nfunction unwrapListeners(arr) {\n  var ret = new Array(arr.length);\n  for (var i = 0; i < ret.length; ++i) {\n    ret[i] = arr[i].listener || arr[i];\n  }\n  return ret;\n}\n\nfunction once(emitter, name) {\n  return new Promise(function (resolve, reject) {\n    function errorListener(err) {\n      emitter.removeListener(name, resolver);\n      reject(err);\n    }\n\n    function resolver() {\n      if (typeof emitter.removeListener === 'function') {\n        emitter.removeListener('error', errorListener);\n      }\n      resolve([].slice.call(arguments));\n    };\n\n    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });\n    if (name !== 'error') {\n      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });\n    }\n  });\n}\n\nfunction addErrorHandlerIfEventEmitter(emitter, handler, flags) {\n  if (typeof emitter.on === 'function') {\n    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);\n  }\n}\n\nfunction eventTargetAgnosticAddListener(emitter, name, listener, flags) {\n  if (typeof emitter.on === 'function') {\n    if (flags.once) {\n      emitter.once(name, listener);\n    } else {\n      emitter.on(name, listener);\n    }\n  } else if (typeof emitter.addEventListener === 'function') {\n    // EventTarget does not have `error` event semantics like Node\n    // EventEmitters, we do not listen for `error` events here.\n    emitter.addEventListener(name, function wrapListener(arg) {\n      // IE does not have builtin `{ once: true }` support so we\n      // have to do it manually.\n      if (flags.once) {\n        emitter.removeEventListener(name, wrapListener);\n      }\n      listener(arg);\n    });\n  } else {\n    throw new TypeError('The \"emitter\" argument must be of type EventEmitter. Received type ' + typeof emitter);\n  }\n}\n\n\n//# sourceURL=webpack://battleship/./node_modules/events/events.js?");

/***/ }),

/***/ "./src/domManipulator.js":
/*!*******************************!*\
  !*** ./src/domManipulator.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emitter */ \"./src/emitter.js\");\n\n\nconst domManipulator = (() => {\n  let orientation = 'x';\n  const orientationButton = document.getElementById('orientation-button');\n  orientationButton.addEventListener('click', () => {\n    if (orientation === 'x') {\n      orientation = 'y';\n    } else {\n      orientation = 'x';\n    }\n  });\n\n  const playerAttackHandler = (data) => {\n    _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].emit('playerAttack', data.target);\n  };\n\n  const constructBoards = (data) => {\n    const playerSquares = document.getElementById('player-board');\n    const computerSquares = document.getElementById('computer-board');\n    while (playerSquares.firstChild) {\n      playerSquares.firstChild.remove();\n    }\n    while (computerSquares.firstChild) {\n      computerSquares.firstChild.removeEventListener(\n        'click',\n        playerAttackHandler\n      );\n      computerSquares.firstChild.remove();\n    }\n    for (let i = 0; i < 100; i += 1) {\n      const square = document.createElement('div');\n      square.classList = 'board-square';\n      square.dataset.xCoord = i % 10;\n      square.dataset.yCoord = Math.floor(i / 10);\n      playerSquares.append(square);\n      const computerSquare = square.cloneNode(true);\n      computerSquare.id = i;\n      computerSquare.addEventListener('click', playerAttackHandler);\n      computerSquares.append(computerSquare);\n    }\n  };\n\n  const createSetupGrid = () => {\n    const setupGrid = document.getElementById('setup-grid');\n    // while (setupGrid.firstChild) {\n    //   setupGrid.firstChild.removeEventListener('click');\n    //   setupGrid.firstChild.remove();\n    // }\n    const checkPlaceable = (square) => {\n      if (orientation === 'x') {\n        _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].emit('checkPlaceableX', square.dataset);\n      } else {\n        _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].emit('checkPlaceableY', square.dataset);\n      }\n    };\n    for (let i = 0; i < 100; i += 1) {\n      const square = document.createElement('div');\n      square.classList = 'setup-square';\n      square.dataset.xCoord = i % 10;\n      square.dataset.yCoord = Math.floor(i / 10);\n      square.addEventListener('click', () => checkPlaceable(square));\n      setupGrid.appendChild(square);\n    }\n  };\n\n  const toggleSetupBoard = () => {\n    const setupGridWrapper = document.getElementById('setup-grid-wrapper');\n    setupGridWrapper.classList.toggle('hidden');\n  };\n\n  const endGame = (winner) => {\n    _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].off('gameOver', endGame);\n    const endGameWrapper = document.getElementById('end-game-wrapper');\n    const endGameText = document.getElementById('end-game-text');\n    endGameText.textContent = winner;\n    endGameWrapper.classList.toggle('hidden');\n    const resetButton = document.getElementById('reset-game');\n    resetButton.addEventListener('click', () => {\n      _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].emit('resetGame');\n    });\n  };\n\n  const startGame = (data) => {\n    submitButton.disabled = true;\n    // do stuff\n    // toggleSetupBoard();\n    // unpack data object (data.player1 and data.player2)\n    _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].off('startGame', startGame);\n    // myEmitter.off('spaceTaken');\n    // myEmitter.off('shipPlaced');\n    // myEmitter.off('allShipsPlaced');\n    toggleSetupBoard();\n    constructBoards();\n    _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].on('gameOver', endGame);\n  };\n\n  const submitButton = document.getElementById('submit-board');\n  submitButton.addEventListener('click', () => {\n    console.log('submitted board');\n    _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].emit('submitBoard');\n  });\n\n  const submitButtonHandler = () => {\n    submitButton.disabled = false;\n    _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].off('allShipsPlaced', submitButtonHandler);\n  };\n\n  const setBoardHandler = () => {\n    _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].on('startGame', startGame);\n    _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].on('spaceTaken', () => {\n      // spaceTaken() message\n    });\n    _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].on('shipPlaced', () => {\n      // ShipPlaced() message\n    });\n    _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].on('allShipsPlaced', submitButtonHandler);\n    createSetupGrid();\n    toggleSetupBoard();\n  };\n\n  _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].on('setBoard', setBoardHandler);\n\n  _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].on('miss', (square) => {\n    // square background color = grey;\n  });\n  _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].on('hit', (square) => {\n    // square background color = red;\n  });\n  _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].on('unavailable', (square) => {\n    // display unavail message\n  });\n  _emitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"].on('sank', (square) => {\n    // display sank message\n  });\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (domManipulator);\n\n\n//# sourceURL=webpack://battleship/./src/domManipulator.js?");

/***/ }),

/***/ "./src/emitter.js":
/*!************************!*\
  !*** ./src/emitter.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ \"./node_modules/events/events.js\");\n/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);\n\n\nclass MyEmitter extends (events__WEBPACK_IMPORTED_MODULE_0___default()) {}\n\nconst myEmitter = new MyEmitter();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myEmitter);\n\n\n//# sourceURL=webpack://battleship/./src/emitter.js?");

/***/ }),

/***/ "./src/factories/Gameboard.js":
/*!************************************!*\
  !*** ./src/factories/Gameboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Gameboard = () => {\n  const board = Array.from({ length: 10 }, () =>\n    Array.from({ length: 10 }, () => 0)\n  );\n  return board;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);\n\n\n//# sourceURL=webpack://battleship/./src/factories/Gameboard.js?");

/***/ }),

/***/ "./src/factories/Player.js":
/*!*********************************!*\
  !*** ./src/factories/Player.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ \"./src/factories/Gameboard.js\");\n/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Ship */ \"./src/factories/Ship.js\");\n\n\n\nconst Player = () => {\n  let board;\n  let ships;\n  let shipsSank;\n\n  const reset = () => {\n    board = (0,_Gameboard__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n    ships = Array.from([2, 3, 3, 4, 5], (length) => (0,_Ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(length));\n    shipsSank = 0;\n  };\n\n  const checkPlaceableX = (data) => {\n    const xCoord = parseInt(data.xCoord, 10);\n    const yCoord = parseInt(data.yCoord, 10);\n    const ship = ships.pop();\n    const coords = [];\n    if (ship !== undefined) {\n      for (let i = 0; i < ship.length; i += 1) {\n        coords.push([yCoord, xCoord + i]);\n        if (board[yCoord][xCoord + i]) {\n          console.log('space taken or out of bounds');\n          ships.push(ship);\n          return 'spaceTaken';\n        }\n      }\n      for (let i = 0; i < coords.length; i += 1) {\n        const [y, x] = coords[i];\n        board[y][x] = ship;\n      }\n      if (ships.length) {\n        return 'shipPlaced';\n      }\n      return 'allShipsPlaced';\n    }\n    console.log('all ships have been placed');\n    return 'allShipsPlaced';\n  };\n\n  const checkPlaceableY = (data) => {\n    const xCoord = parseInt(data.xCoord, 10);\n    const yCoord = parseInt(data.yCoord, 10);\n    const ship = ships.pop();\n    const coords = [];\n    if (ship !== undefined) {\n      for (let i = 0; i < ship.length; i += 1) {\n        coords.push([yCoord + i, xCoord]);\n        if (board[yCoord + i][xCoord]) {\n          console.log('space taken or out of bounds');\n          ships.push(ship);\n          return 'spaceTaken';\n        }\n      }\n      for (let i = 0; i < coords.length; i += 1) {\n        const [y, x] = coords[i];\n        board[y][x] = ship;\n      }\n      return 'shipPlaced';\n    }\n    console.log('all ships have been placed');\n    return 'allShipsPlaced';\n  };\n\n  const attack = (x, y) => {\n    // Empty spaces are 0.\n    // 1 = shelled area.\n    // 2 = ship hit here and obj has been removed from this space\n    // to prevent multiple hits.\n    if (board[y][x] === 0) {\n      board[y][x] = 1;\n      return 'miss';\n    }\n    if (board[y][x] === 1 || board[y][x] === 2) {\n      return 'unavailable';\n    }\n    // if (board[y][x] instanceof Object) {\n    const result = board[y][x].hit();\n    board[y][x] = 2;\n    if (result) {\n      shipsSank += 1;\n      if (shipsSank === 5) {\n        // emit gameOver message\n        return 'gameOver';\n      }\n      // emit sunk message\n      return 'sank';\n    }\n    // emit not sunk but hit message\n    return 'hit';\n  };\n\n  reset();\n\n  return {\n    board,\n    checkPlaceableX,\n    checkPlaceableY,\n    attack,\n    reset,\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n\n//# sourceURL=webpack://battleship/./src/factories/Player.js?");

/***/ }),

/***/ "./src/factories/Ship.js":
/*!*******************************!*\
  !*** ./src/factories/Ship.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst Ship = (inputLength) => {\n  const length = inputLength;\n  let hits = 0;\n  let sunk = false;\n\n  const getHits = () => hits;\n\n  const sink = () => {\n    if (getHits() >= length) {\n      sunk = true;\n    }\n    return sunk;\n  };\n\n  const hit = () => {\n    hits += 1;\n    return sink();\n  };\n\n  return {\n    length,\n    hit,\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n\n//# sourceURL=webpack://battleship/./src/factories/Ship.js?");

/***/ }),

/***/ "./src/gameFlow.js":
/*!*************************!*\
  !*** ./src/gameFlow.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _factories_Player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/Player */ \"./src/factories/Player.js\");\n/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emitter */ \"./src/emitter.js\");\n\n\n\nconst gameFlow = (() => {\n  const player1 = (0,_factories_Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n  const player2 = (0,_factories_Player__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n  const generateRandomCoord = () => {\n    // generate random coords for comp to attack\n    // return [x,y];\n    const coords = [];\n    for (let y = 0; y < player1.board.length; y += 1) {\n      const yArray = player1.board[y];\n      for (let x = 0; x < yArray.length; x += 1) {\n        const space = yArray[x];\n        if (space !== 1 && space !== 2) {\n          const coord = [x, y];\n          coords.push(coord);\n        }\n      }\n    }\n    const result = coords[Math.floor(Math.random() * coords.length)];\n    return result;\n  };\n\n  const checkPlaceableXHandler = (data) => {\n    const result = player1.checkPlaceableX(data);\n    console.log(result);\n    _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].emit(`${result}`);\n  };\n\n  const checkPlaceableYHandler = (data) => {\n    const result = player1.checkPlaceableY(data);\n    console.log(result);\n    _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].emit(`${result}`);\n  };\n\n  const startGame = () => {\n    _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].off('checkPlaceableX', checkPlaceableXHandler);\n    _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].off('checkPlaceableY', checkPlaceableYHandler);\n    _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].off('submitBoard', startGame);\n    _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].emit('startGame');\n\n    // while (player1.ships.length) {\n    //   console.log(`Ships remaining: ${player1.ships.length}`);\n    // }\n    // endGame();\n\n    //   myEmitter.on('computerAttack', () => {\n    //     const result = player1.attack(...generateRandomCoords());\n    //     myEmitter.emit(`${result}`);\n    //     // if (result === 'sank') {\n    //     //   // emit hit and sunk signal\n    //     // }\n    //     // if (result === 'hit') {\n    //     //   // emit hit signal only\n    //     // }\n    //     // if (result === 'unavailable') {\n    //     //   // emit retry/unavailable signal\n    //     // }\n    //     // if (result === 'miss') {\n    //     //   // emit miss signal\n    //     // }\n    //   });\n    // };\n\n    const computerAttack = () => {\n      const space = generateRandomCoord();\n      const divId = space[1] * 10 + space[0];\n      const result = player1.attack(...space);\n      _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].emit(\n        `${result}`,\n        divId,\n        `${result === 'gameOver' ? 'You lost!' : undefined}`\n      );\n    };\n\n    _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].on('playerAttack', (square) => {\n      square.removeEventListener();\n      const result = player2.attack(\n        parseInt(square.dataset.xCoord, 10),\n        parseInt(square.dataset.yCoord, 10)\n      );\n      _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].emit(\n        `${result}`,\n        square,\n        `${result === 'gameOver' ? 'You won!' : undefined}`\n      );\n      if (result === 'gameOver') {\n        endGame();\n        return;\n      }\n      const computerMove = computerAttack();\n      _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].emit(`${computerMove[0]}`, computerMove[1]);\n    });\n  };\n\n  const setBoard = () => {\n    _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].emit('setBoard');\n    _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].on('checkPlaceableX', checkPlaceableXHandler);\n    _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].on('checkPlaceableY', checkPlaceableYHandler);\n    _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].on(\n      'submitBoard',\n      // player2.generateRandomBoard();\n      // emit start game signal\n      // startGame();\n      startGame\n    );\n  };\n\n  const resetGame = () => {\n    _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].off('resetGame', resetGame);\n    player1.reset();\n    player2.reset();\n    setBoard();\n  };\n\n  const endGame = () => {\n    // myEmitter.off('playerAttack');\n    _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].emit('endGame');\n    _emitter__WEBPACK_IMPORTED_MODULE_1__[\"default\"].on('resetGame', resetGame);\n  };\n\n  document.addEventListener('DOMContentLoaded', setBoard);\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameFlow);\n\n\n//# sourceURL=webpack://battleship/./src/gameFlow.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _domManipulator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domManipulator */ \"./src/domManipulator.js\");\n/* harmony import */ var _gameFlow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameFlow */ \"./src/gameFlow.js\");\n\n\n\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;