const Wall = require("./index").Wall;
const Room = require("../room").Room;
const Mov = require("../direction").Move;
const { Up, Down, Left, Right } = require("../direction").Direction;

const random = Math.random;

/** Carve a fresh labyrinth using hunt and seek algorithm.
 *
 *  The labyrinth must be in an initial state otherwise this method will never return.
**/
Wall.prototype.carve = function() {
  const rooms = new Room(this.rows, this.cols);
  const rnd = (x) => (random() * x)|0;
  var mov = Mov.fromDir(Up);
  var [x, y] = this.randomStart(rnd);
  const outbound_or_marked = (x, y, mov) => {
    var xx = x + mov.dx, yy = y + mov.dy;
    return !this.inBounds(xx, yy) || rooms.wasMarked(xx, yy);
  };

  rooms.mark(x, y);

  /* hunt */
  for(let n = this.rows * this.cols; n-- > 1;) {
    switch(rnd(3)) {
      case 1: mov.turnRt(); break;
      case 2: mov.turnLt(); break;
    }
    check: while (outbound_or_marked(x, y, mov)) {
      for(let n = 0; n++ < 3;) {
        mov.turnRt();
        if (!outbound_or_marked(x, y, mov)) break check;
      }
      /* seek */
      do {
        x += 1;
        y += 1;
        if (!this.inBounds(x, y)) {
          [x, y] = this.randomStart(rnd);
        }
      } while (!rooms.wasMarked(x, y))
    }
    this.open(x, y, mov.toDir());
    x += mov.dx;
    y += mov.dy;
    rooms.mark(x, y);
  }
}
