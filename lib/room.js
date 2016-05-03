const Vec2D = require('./vector2d').Vec2D;

class Room extends Vec2D {
  constructor(rows, cols) {
    super(cols, rows, false);
  }
  mark(x, y) {
    this.set(x, y, true);
  }
}

Room.prototype.wasMarked = Room.prototype.get;

module.exports.Room = Room;
