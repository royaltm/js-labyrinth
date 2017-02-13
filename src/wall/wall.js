import { Vec2D } from '../vector2d';
import { Direction } from '../direction';

const { Up, Down, Left, Right } = Direction;

const setPrototypeOf = Object.setPrototypeOf;

function exitAt(x, y, dir) {
  var dx, dy;
  switch(dir) {
    case Up:    dx = 1, dy = 0; break;
    case Right: dx = 2, dy = 0; break;
    case Down:  dx = 1, dy = 1; break;
    case Left:  dx = 0, dy = 0; break;
    default: 
      throw new Error("invalid direction")
  };
  return [x * 2 + dx, y + dy];
}

export class Wall {
  /**
   *  @member {number} cols - number of rooms in a row.
   *  @member {number} rows - number of rooms in a column.
  **/  

  /** Create a new labyrinth with all exits being closed.
   *
   *  @param {number} cols
   *  @param {number} rows
   *
   *  # Examples
   * 
   *  ```
   *  var labyrinth = new Wall(5, 2);
   *  assert.equal(5, labyrinth.cols);
   *  assert.equal(2, labyrinth.rows);
   *  ```
  **/
  constructor(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.exits = new Vec2D(cols * 2 + 1, rows + 1, false);
  }
  /** Close all of the labyrinth exits bringing it to the initial state.
   *  This is required to reuse the instance for another carving.
   * 
   *  # Examples
   * 
   *  ```
   *  var labyrinth = new Wall(10, 10);
   *  labyrinth.carve();
   *  labyrinth.closeAll().carve();
   *  ```
  **/
  closeAll() {
    this.exits.fill(false);
    return this;
  }
  /** Check existence of the specified exit.
   * 
   *  @param {number} x
   *  @param {number} y
   *  @param {Direction} dir
   *  @return {boolean}
   *
   *  # Examples
   * 
   *  ```
   *  var labyrinth = new Wall(10, 10);
   *  assert.equal(false, labyrinth.isOpen(0, 0, Direction.Right));
   *  ```
  **/
  isOpen(x, y, dir) {
    var [x, y] = exitAt(x, y, dir);
    return this.exits.get(x, y);
  }
  /** Set existence of the specified exit.
   * 
   *  @param {number} x
   *  @param {number} y
   *  @param {Direction} dir
   *  @param {boolean} val
   *  @return {this}
   *
   *  # Examples
   * 
   *  ```
   *  var labyrinth = new Wall(10, 10);
   *  assert.equal(false, labyrinth.isOpen(4, 5, Direction.Up));
   *  labyrinth.set(4, 5, Direction.Up, true);
   *  assert.equal(true, labyrinth.isOpen(4, 5, Direction.Up));
   *  ```
  **/
  set(x, y, dir, val) {
    var [x, y] = exitAt(x, y, dir);
    this.exits.set(x, y, val);
    return this;
  }
  /** Open specified exit.
   * 
   *  @param {number} x
   *  @param {number} y
   *  @param {Direction} dir
   *  @return {this}
   *
   *  # Examples
   * 
   *  ```
   *  var labyrinth = new Wall(10, 10);
   *  labyrinth.open(2, 3, Direction.Down);
   *  assert.equal(true, labyrinth.isOpen(2, 3, Direction.Down));
   *  labyrinth.close(2, 3, Direction.Down);
   *  assert.equal(false, labyrinth.isOpen(2, 3, Direction.Down));
   *  ```
  **/
  open(x, y, dir) {
    return this.set(x, y, dir, true);
  }
  /** Close specified exit.
   * 
   *  @param {number} x
   *  @param {number} y
   *  @param {Direction} dir
   *  @return {this}
  **/  
  close(x, y, dir) {
    return this.set(x, y, dir, false);
  }
  /** Check if x and y coordinates are valid in a labyrinth.
   * 
   *  @param {number} x
   *  @param {number} y
   *  @return {boolean}
   *
   *  # Examples
   * 
   *  ```
   *  var labyrinth = new Wall(3, 2);
   *  assert.equal(true, labyrinth.inBounds(2, 1));
   *  assert.equal(false, labyrinth.inBounds(4, 5));
   *  assert.equal(false, labyrinth.inBounds(-1, 0));
   *  assert.equal(false, labyrinth.inBounds(-4, -5));
   *  assert.equal(false, labyrinth.inBounds(1, -1));
   *  ```
  **/
  inBounds(x, y) {
    return x >= 0 && y >= 0 && x < this.cols && y < this.rows;
  }
  /** Randomize coordinates.
   *
   *  The `rng({number}) -> {number}` should return a random integer number between `0` and `n` excluding `n`.
   *
   *  @param {function({number}) -> {number}} rng
   *  @return {Array{number}} [x, y]
  **/
  randomStart(rng) {
    return [rng(this.cols), rng(this.rows)];
  }

  static setPrototype(object) {
    setPrototypeOf(object, Wall.prototype);
    setPrototypeOf(object.exits, Vec2D.prototype);
  };
}
