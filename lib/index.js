'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Vec2D = function Vec2D(cols, rows, value) {
  this.cols = cols;
  this.rows = Array.from({length: rows}, function () { return Array.from({length: cols}, function () { return value; }); });
};
Vec2D.prototype.fill = function fill (value) {
  var rows = this.rows;
  for (var i = rows.length; i-- > 0;) {
    var row = rows[i];
    for (var n = row.length; n-- > 0;) {
      row[n] = value;
    }
  }
};
Vec2D.prototype.numRows = function numRows () { return this.rows.length; };
Vec2D.prototype.numCols = function numCols () { return this.cols; };
Vec2D.prototype.set = function set (col, row, value) {
  this.rows[row][col] = value;
};
Vec2D.prototype.get = function get (col, row) {
  return this.rows[row][col];
};

var Direction = {
  Up: 0,
  Right: 1,
  Down: 2,
  Left: 3
};

var Up$1 = Direction.Up;
var Down$1 = Direction.Down;
var Left$1 = Direction.Left;
var Right$1 = Direction.Right;

function up() { return new Move( 0, -1) }
function rt() { return new Move( 1,  0) }
function dn() { return new Move( 0,  1) }
function lt() { return new Move(-1,  0) }

var Move = function Move(dx, dy) {
  this.dx = dx;
  this.dy = dy;
};
/* 
 * @param {Dirtion} dir
 * @return {Mo}
**/
Move.fromDir = function fromDir (dir) {
  switch(dir) {
    case Up$1:  return up();
    case Right$1: return rt();
    case Down$1:return dn();
    case Left$1:return lt();
    default:
      throw new Error(("Invalid direction: " + dir));
  }
};
/**
 * @return {Direction}
**/
Move.prototype.toDir = function toDir () {
  var dx = this.dx, dy = this.dy;
  switch(dx) {
    case 0:
      switch(dy) {
        case 1:return Down$1;
        case -1: return Up$1
      }
      break;
    case -1: if (dy === 0) { return Left$1; }
    case 1:if (dy === 0) { return Right$1; }
  }
  throw new Error(("Invalid Move value: {" + dx + "," + dy + "}"));
};
Move.prototype.back = function back () { this.dx = -this.dx; this.dy = -this.dy; };
Move.prototype.turnRt = function turnRt () { 
  var dx = this.dx;
           this.dx = -this.dy; this.dy =dx;
};
Move.prototype.turnLt = function turnLt () {
  var dx = this.dx;
           this.dx =this.dy; this.dy = -dx; };

var Up = Direction.Up;
var Down = Direction.Down;
var Left = Direction.Left;
var Right = Direction.Right;

var setPrototypeOf = Object.setPrototypeOf;

function exitAt(x, y, dir) {
  var dx, dy;
  switch(dir) {
    case Up:    dx = 1, dy = 0; break;
    case Right: dx = 2, dy = 0; break;
    case Down:  dx = 1, dy = 1; break;
    case Left:  dx = 0, dy = 0; break;
    default: 
      throw new Error("invalid direction")
  }
  return [x * 2 + dx, y + dy];
}

var Wall$1 = function Wall(cols, rows) {
  this.cols = cols;
  this.rows = rows;
  this.exits = new Vec2D(cols * 2 + 1, rows + 1, false);
};
/** Close all of the labyrinth exits bringing it to the initial state.
 *This is required to reuse the instance for another carving.
 * 
 *# Examples
 * 
 *```
 *var labyrinth = new Wall(10, 10);
 *labyrinth.carve();
 *labyrinth.closeAll().carve();
 *```
**/
Wall$1.prototype.closeAll = function closeAll () {
  this.exits.fill(false);
  return this;
};
/** Check existence of the specified exit.
 * 
 *@param {number} x
 *@param {number} y
 *@param {Direction} dir
 *@return {boolean}
 *
 *# Examples
 * 
 *```
 *var labyrinth = new Wall(10, 10);
 *assert.equal(false, labyrinth.isOpen(0, 0, Direction.Right));
 *```
**/
Wall$1.prototype.isOpen = function isOpen (x, y, dir) {
  var ref = exitAt(x, y, dir);
    var x = ref[0];
    var y = ref[1];
  return this.exits.get(x, y);
};
/** Set existence of the specified exit.
 * 
 *@param {number} x
 *@param {number} y
 *@param {Direction} dir
 *@param {boolean} val
 *@return {this}
 *
 *# Examples
 * 
 *```
 *var labyrinth = new Wall(10, 10);
 *assert.equal(false, labyrinth.isOpen(4, 5, Direction.Up));
 *labyrinth.set(4, 5, Direction.Up, true);
 *assert.equal(true, labyrinth.isOpen(4, 5, Direction.Up));
 *```
**/
Wall$1.prototype.set = function set (x, y, dir, val) {
  var ref = exitAt(x, y, dir);
    var x = ref[0];
    var y = ref[1];
  this.exits.set(x, y, val);
  return this;
};
/** Open specified exit.
 * 
 *@param {number} x
 *@param {number} y
 *@param {Direction} dir
 *@return {this}
 *
 *# Examples
 * 
 *```
 *var labyrinth = new Wall(10, 10);
 *labyrinth.open(2, 3, Direction.Down);
 *assert.equal(true, labyrinth.isOpen(2, 3, Direction.Down));
 *labyrinth.close(2, 3, Direction.Down);
 *assert.equal(false, labyrinth.isOpen(2, 3, Direction.Down));
 *```
**/
Wall$1.prototype.open = function open (x, y, dir) {
  return this.set(x, y, dir, true);
};
/** Close specified exit.
 * 
 *@param {number} x
 *@param {number} y
 *@param {Direction} dir
 *@return {this}
**/  
Wall$1.prototype.close = function close (x, y, dir) {
  return this.set(x, y, dir, false);
};
/** Check if x and y coordinates are valid in a labyrinth.
 * 
 *@param {number} x
 *@param {number} y
 *@return {boolean}
 *
 *# Examples
 * 
 *```
 *var labyrinth = new Wall(3, 2);
 *assert.equal(true, labyrinth.inBounds(2, 1));
 *assert.equal(false, labyrinth.inBounds(4, 5));
 *assert.equal(false, labyrinth.inBounds(-1, 0));
 *assert.equal(false, labyrinth.inBounds(-4, -5));
 *assert.equal(false, labyrinth.inBounds(1, -1));
 *```
**/
Wall$1.prototype.inBounds = function inBounds (x, y) {
  return x >= 0 && y >= 0 && x < this.cols && y < this.rows;
};
/** Randomize coordinates.
 *
 *The `rng({number}) -> {number}` should return a random integer number between `0` and `n` excluding `n`.
 *
 *@param {function({number}) -> {number}} rng
 *@return {Array{number}} [x, y]
**/
Wall$1.prototype.randomStart = function randomStart (rng) {
  return [rng(this.cols), rng(this.rows)];
};

Wall$1.setPrototype = function setPrototype (object) {
  setPrototypeOf(object, Wall$1.prototype);
  setPrototypeOf(object.exits, Vec2D.prototype);
};

var Room = (function (Vec2D$$1) {
  function Room(rows, cols) {
    Vec2D$$1.call(this, cols, rows, false);
  }

  if ( Vec2D$$1 ) Room.__proto__ = Vec2D$$1;
  Room.prototype = Object.create( Vec2D$$1 && Vec2D$$1.prototype );
  Room.prototype.constructor = Room;
  Room.prototype.mark = function mark (x, y) {
    this.set(x, y, true);
  };

  return Room;
}(Vec2D));

Room.prototype.wasMarked = Room.prototype.get;

var random = Math.random;

/** Carve a fresh labyrinth using hunt and seek algorithm.
 *
 *  The labyrinth must be in an initial state otherwise this method will never return.
 *
 *  If the `rng` argument is provided, it should return a random integer number between `0` and `n` excluding `n`.
 *
 *  @param {function({number}) -> {number}} [rng]
**/
function carve(rng) {
  var this$1 = this;

  if (rng == null) { rng = function (x) { return (random() * x)|0; }; }
  var rooms = new Room(this.rows, this.cols);
  var mov = Move.fromDir( Direction.Up );
  var ref = this.randomStart(rng);
  var x = ref[0];
  var y = ref[1];
  var outbound_or_marked = function (x, y, mov) {
    var xx = x + mov.dx, yy = y + mov.dy;
    return !this$1.inBounds(xx, yy) || rooms.wasMarked(xx, yy);
  };

  rooms.mark(x, y);

  /* hunt */
  for(var n = this.rows * this.cols; n-- > 1;) {
    switch(rng(3)) {
      case 1: mov.turnRt(); break;
      case 2: mov.turnLt(); break;
    }
    check: while (outbound_or_marked(x, y, mov)) {
      for(var n$1 = 0; n$1++ < 3;) {
        mov.turnRt();
        if (!outbound_or_marked(x, y, mov)) { break check; }
      }
      /* seek */
      do {
        x += 1;
        y += 1;
        if (!this$1.inBounds(x, y)) {
          var assign;
          (assign = this$1.randomStart(rng), x = assign[0], y = assign[1]);
        }
      } while (!rooms.wasMarked(x, y))
    }
    this$1.open(x, y, mov.toDir());
    x += mov.dx;
    y += mov.dy;
    rooms.mark(x, y);
  }
}

var Up$2 = Direction.Up;
var Left$2 = Direction.Left;
/**
 *  Print a labyrinth to stdout using UNICODE BOX characters.
**/
function print() {
  var stdout = process.stdout;
  var writer = function (s) { stdout.write(s); };
  this.draw(writer);
}

/**
 *  Draw a labyrinth as a String using UNICODE BOX characters.
 *
 *  @return {string}
**/
function toString() {
  var out = '';
  this.draw(function (s) { out += s; });
  return out;
}
/**
 *  Draw a labyrinth using UNICODE BOX characters to a `writer`.
 *
 *  @param {function({string})} writer
**/
function draw(writer) {
  var this$1 = this;

  for(var y$1 = 0, len = this.rows; y$1 < len; ++y$1) {
    for(var x$1 = 0, len$1 = this.cols; x$1 < len$1; ++x$1) {
      if (x$1 == 0 || this$1.isOpen(x$1 - 1, y$1, Up$2)) {
        if (y$1 == 0 || this$1.isOpen(x$1, y$1 - 1, Left$2)) {
          if (this$1.isOpen(x$1, y$1, Up$2)) {
            writer(this$1.isOpen(x$1, y$1, Left$2) ? "  " : "╻ ");
          } else {
            writer(this$1.isOpen(x$1, y$1, Left$2) ? "╺━" : "┏━");
          }
        } else {
          if (this$1.isOpen(x$1, y$1, Up$2)) {
            writer(this$1.isOpen(x$1, y$1, Left$2) ? "╹ " : "┃ ");
          } else {
            writer(this$1.isOpen(x$1, y$1, Left$2) ? "┗━" : "┣━");
          }
        }
      } else {
        if (y$1 == 0 || this$1.isOpen(x$1, y$1 - 1, Left$2)) {
          if (this$1.isOpen(x$1, y$1, Up$2)) {
            writer(this$1.isOpen(x$1, y$1, Left$2) ? "╸ " : "┓ ");
          } else {
            writer(this$1.isOpen(x$1, y$1, Left$2) ? "━━" : "┳━");
          }
        } else {
          if (this$1.isOpen(x$1, y$1, Up$2)) {
            writer(this$1.isOpen(x$1, y$1, Left$2) ? "┛ " : "┫ ");
          } else {
            writer(this$1.isOpen(x$1, y$1, Left$2) ? "┻━" : "╋━");
          }
        }
      }
    }
    var x$2 = this$1.cols;
    if (this$1.isOpen(x$2 - 1, y$1, Up$2)) {
      if (y$1 == 0 || this$1.isOpen(x$2, y$1 - 1, Left$2)) {
        writer(this$1.isOpen(x$2, y$1, Left$2) ? " " : "╻");
      } else {
        writer(this$1.isOpen(x$2, y$1, Left$2) ? "╹" : "┃");
      }
    } else {
      if (y$1 == 0 || this$1.isOpen(x$2, y$1 - 1, Left$2)) {
        writer(this$1.isOpen(x$2, y$1, Left$2) ? "╸" : "┓");
      } else {
        writer(this$1.isOpen(x$2, y$1, Left$2) ? "┛" : "┫");
      }
    }
    writer("\n");
  }
  var y = this.rows;
  for(var x$3 = 0, len$2 = this.cols; x$3 < len$2; ++x$3) {
    if (x$3 == 0 || this$1.isOpen(x$3 - 1, y, Up$2)) {
      if (this$1.isOpen(x$3, y - 1, Left$2)) {
        writer(this$1.isOpen(x$3, y, Up$2) ? "  " : "╺━");
      } else {
        writer(this$1.isOpen(x$3, y, Up$2) ? "╹ " : "┗━");
      }
    } else {
      if (y == 0 || this$1.isOpen(x$3, y - 1, Left$2)) {
        writer(this$1.isOpen(x$3, y, Up$2) ? "╸ " : "━━");
      } else {
        writer(this$1.isOpen(x$3, y, Up$2) ? "┛ " : "┻━");
      }
    }
  }
  var x = this.cols;
  if (this.isOpen(x - 1, y, Up$2)) {
    writer(this.isOpen(x, y - 1, Left$2) ? " " : "╹");
  } else {
    writer(this.isOpen(x, y - 1, Left$2) ? "╸" : "┛");
  }
  writer("\n");
}

var Wall$$1 = Wall$1;

Wall$$1.prototype.carve    = carve;
Wall$$1.prototype.print    = print;
Wall$$1.prototype.toString = toString;
Wall$$1.prototype.draw     = draw;

/** # The labyrinth library
 * 
 *  The labyrinth library provides tools for building and managing labyrinths.
 * 
 *  # Example
 * 
 *  ```
 *  labyrinth = require('labyrinth');
 *  
 *  const {Wall, Direction} = labyrinth;
 *
 *  var wall = new Wall(20, 20);
 *  wall.carve();
 *  wall.print();
 *  wall.open(0, 10, Direction.Up);
 *  assert.equal(true, wall.is_open(0, 10, Direction.Up));
 *  wall.close(0, 10, Direction.Up);
 *  assert.equal(false, wall.is_open(0, 10, Direction.Up));
 *  ```
**/

exports.Vec2D = Vec2D;
exports.Wall = Wall$$1;
exports.Direction = Direction;
exports.Move = Move;
exports.Room = Room;
